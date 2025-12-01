// app/api/github/webhook/route.ts
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

  try {
    return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature));
  } catch {
    return false;
  }
}

async function fetchFileContent(path: string, ref: string): Promise<string | null> {
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${encodeURIComponent(
    path
  )}?ref=${ref}`;

  console.log("[webhook] fetching file:", url);

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3.raw", // <-- fixed typo
    },
  });

  if (res.status === 404) {
    console.warn("[webhook] 404 for", path, "ref", ref);
    return null;
  }

  if (!res.ok) {
    console.error("[webhook] GitHub fetch error:", res.status, await res.text());
    return null;
  }

  const text = await res.text();
  console.log("[webhook] fetched content length:", text.length);
  return text;
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-hub-signature-256");
  const event = req.headers.get("x-github-event");
  const deliveryId = req.headers.get("x-github-delivery");

  console.log("[webhook] received", { event, deliveryId });

  if (!verifySignature(rawBody, signature)) {
    console.warn("[webhook] invalid signature");
    return new Response("Invalid signature", { status: 401 });
  }

  if (event !== "push") {
    console.log("[webhook] ignoring non-push event:", event);
    return new Response("Ignored", { status: 204 });
  }

  const payload = JSON.parse(rawBody);
  const afterSha = payload.after as string;
  const commits = payload.commits ?? [];
  const touchedFiles: string[] = [];

  for (const c of commits) {
    const added = c.added ?? [];
    const modified = c.modified ?? [];
    for (const f of [...added, ...modified]) {
      if (typeof f === "string" && f.startsWith("knowledge/")) {
        touchedFiles.push(f);
      }
    }
  }

  console.log("[webhook] touched knowledge files:", touchedFiles);

  if (!touchedFiles.length) {
    return new Response("No knowledge files changed", { status: 200 });
  }

  for (const path of touchedFiles) {
    const content = await fetchFileContent(path, afterSha);
    if (!content) {
      console.warn("[webhook] no content extracted for", path);
      continue;
    }

    console.log(`[webhook] ingesting ${path} (${content.length} chars)`);

    await ingestTextIntoChroma("secondbrain", path, content, {
      ref: afterSha,
    });
  }

  return new Response("OK", { status: 200 });
}
