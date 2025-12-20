import crypto from "crypto";
import { NextRequest } from "next/server";
import { ingestTextIntoChroma } from "@/lib/chunkAndIngest";

export const runtime = "nodejs";

const GH_SECRET = process.env.GITHUB_WEBHOOK_SECRET!;
const OWNER = process.env.GITHUB_REPO_OWNER!;
const REPO = process.env.GITHUB_REPO_NAME!;
const GITHUB_TOKEN = process.env.GITHUB_ACCESS_TOKEN!;

function verifySignature(payload: string, signature: string | null) {
    if (!signature) return false;
    const hmac = crypto.createHmac("sha256", GH_SECRET);
    const digest = `sha256=${hmac.update(payload).digest("hex")}`;
    return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature));
}

// async function fetchFileContent(path: string, ref: string): Promise<string | null> {
//     const res = await fetch(
//         `https://api.github.com/repos/${OWNER}/${REPO}/contents/${encodeURIComponent(
//             path,
//         )}?ref=${ref}`,
//         {
//             headers: {
//                 Authorization: `Bearer ${GITHUB_TOKEN}`,
//                 Accept: "application/vnd.github.v3.raw",
//             },
//         },
//     );

//     if (res.status === 404) return null;
//     if (!res.ok) {
//         console.error("GitHub fetch error:", res.status, await res.text());
//         return null;
//     }

//     return await res.text();
// }

async function fetchFileContent(path: string, ref: string): Promise<string | null> {
  const encodedPath = path
    .split("/")
    .map(encodeURIComponent)
    .join("/");

  const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${encodedPath}?ref=${ref}`;

  console.log("Fetching from:", url);

  const res = await fetch(url, {
    headers: {
      // 🔴 REMOVE AUTH for public repos
      Accept: "application/vnd.github.v3.raw",
    },
  });

  if (res.status === 404) {
    console.error("File not found:", path);
    return null;
  }

  if (!res.ok) {
    console.error("GitHub fetch error:", res.status, await res.text());
    return null;
  }

  return await res.text();
}


export async function POST(req: NextRequest) {
    const rawBody = await req.text();
    const signature = req.headers.get("x-hub-signature-256");

    if (!verifySignature(rawBody, signature)) {
        return new Response("Invalid signature", { status: 401 });
    }

    const event = req.headers.get("x-github-event");
    if (event !== "push") {
        return new Response("Ignored", { status: 204 });
    }

    const payload = JSON.parse(rawBody);

    const afterSha = payload.after as string;
    const commits = payload.commits ?? [];
    const touchedFiles: string[] = [];

    for (const c of commits) {
        for (const f of [...c.added, ...c.modified]) {
            if (typeof f === "string" && f.includes("knowledge/")) {
                touchedFiles.push(f);
            }
        }
    }

    if (touchedFiles.length === 0) {
        return new Response("No knowledge files changed", { status: 200 });
    }

    for (const path of touchedFiles) {
        const content = await fetchFileContent(path, afterSha);
        if (!content) continue;

        await ingestTextIntoChroma(
            "secondbrain",
            path,
            content,
            { ref: afterSha }
        );
    }

    return new Response("OK", { status: 200 });
}