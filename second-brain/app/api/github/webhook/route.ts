// import { getOrCreateCollection } from "@/lib/chromaClient";
// import { ingestTextIntoChroma } from "@/lib/chunkAndIngest";
// import crypto from "crypto";

// export const runtime = "nodejs";

// const GH_SECRET = process.env.GITHUB_WEBHOOK_SECRET!;
// const OWNER = process.env.GITHUB_REPO_OWNER!;
// const REPO = process.env.GITHUB_REPO_NAME!;
// const GITHUB_TOKEN = process.env.GITHUB_ACCESS_TOKEN!;

// function verifySignature(payload: string, signature: string | null) {
//     if (!signature) return false;
//     const hmac = crypto.createHmac("sha256", GH_SECRET);
//     const digest = `sha256=${hmac.update(payload).digest('hex')}`;
//     return crypto?.timingSafeEqual(Buffer?.from(digest), Buffer?.from(signature));
// };

// async function fetchFileContent(path: string, ref: string): Promise<string | null> {
//     const encodedPath = path.split('/').map(s => encodeURIComponent(s)).join('/');
//     const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${encodedPath}?ref=${ref}`;
//     console.log(`Fetching from: ${url}`);

//     const res = await fetch(url, {
//         headers: {
//             // Authorization: `Bearer ${GITHUB_TOKEN}`,
//             Accept: "application/vnd.github.v3.raw",
//         }
//     });

//     if (res.status === 404) {
//         console.error(`File not found (404): ${path}`);
//         return null;
//     }
//     if (!res.ok) {
//         console.error("GitHub fetch error: ", res.status, await res.text());
//         return null;
//     }

//     return await res.text();
// }

// export async function POST(req: Request) {
//     console.log("Webhook received");
//     const rawBody = await req.text();
//     const signature = req.headers.get("x-hub-signature-256");

//     if (!verifySignature(rawBody, signature)) {
//         console.error("Invalid signature");
//         return new Response("Invalid signature", { status: 401 });
//     }
//     console.log("Signature verified");

//     const event = req.headers.get("x-github-event");
//     console.log(`Event: ${event}`);
//     if (event !== "push") {
//         console.log("Ignored event (not push)");
//         return new Response("Ignored", { status: 204 });
//     }

//     const payload = JSON.parse(rawBody);
//     console.log(`Payload received for ref: ${payload?.ref}, after: ${payload?.after}`);

//     const afterSha = payload?.after as string;
//     const commits = payload?.commits ?? [];
//     // const touchedFiles: string[] = [];

//     const touchedFiles: string[] = [];

//     for (const c of commits) {
//         const added = c.added ?? [];
//         const modified = c.modified ?? [];

//         for (const f of [...added, ...modified]) {
//             console.log("Checking file:", f);

//             if (typeof f === "string" && f.includes("knowledge/")) {
//                 touchedFiles.push(f);
//             }
//         }
//     }




//     console.log(`Touched knowledge files: ${touchedFiles.join(", ")}`);

//     if (touchedFiles?.length === 0) {
//         console.log("No knowledge files changed");
//         return new Response("No knowledge files changed", { status: 200 });
//     }

//     for (const path of touchedFiles) {
//         console.log(`Fetching content for: ${path}`);
//         const content = await fetchFileContent(path, afterSha);
//         if (!content) {
//             console.log(`Content is empty or failed to fetch for ${path}, skipping ingestion`);
//             continue;
//         }
//         console.log(`Content fetched for ${path}, length: ${content.length}`);

//         try {
//             await ingestTextIntoChroma(
//                 "secondbrain",
//                 path,
//                 content,
//                 { ref: afterSha }
//             )
//             console.log(`Successfully ingested ${path}`);
//         } catch (error) {
//             console.error(`Error ingesting ${path}:`, error);
//         }
//     }

//     return new Response("OK", { status: 200 });
// }

import crypto from "crypto";
import { NextRequest } from "next/server";
import { getOrCreateCollection } from "@/lib/chromaClient";
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

async function fetchFileContent(path: string, ref: string): Promise<string | null> {
    const res = await fetch(
        `https://api.github.com/repos/${OWNER}/${REPO}/contents/${encodeURIComponent(
            path,
        )}?ref=${ref}`,
        {
            headers: {
                Authorization: `Bearer ${GITHUB_TOKEN}`,
                Accept: "application/vnd.github.v3.raw",
            },
        },
    );

    if (res.status === 404) return null;
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
