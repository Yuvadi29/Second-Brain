import crypto from "crypto";
import { NextRequest } from "next/server";
import { extractTextFromGithubFile } from "@/lib/extractGithubFile";
import { ingestTextIntoChroma } from "@/lib/chunkAndIngest";

export const runtime = "nodejs";

const GH_SECRET = process.env.GITHUB_WEBHOOK_SECRET!;

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
        const files = [...(c.added ?? []), ...(c.modified ?? [])];
        for (const f of files) {
            if (typeof f === "string" && f.startsWith("knowledge/")) {
                touchedFiles.push(f);
            }
        }
    }

    if (touchedFiles.length === 0) {
        return new Response("No knowledge files changed", { status: 200 });
    }

    for (const path of touchedFiles) {
        const text = await extractTextFromGithubFile(path, afterSha);
        if (!text) {
            console.warn("[webhook] No text extracted for", path);
            continue;
        }

        await ingestTextIntoChroma("secondbrain", path, text, {
            ref: afterSha,
        });
    }

    return new Response("OK", { status: 200 });
}
