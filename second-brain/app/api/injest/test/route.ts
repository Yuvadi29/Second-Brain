import { ingestTextIntoChroma } from "@/lib/chunkAndIngest";

export async function POST() {
    await ingestTextIntoChroma(
        "secondbrain",
        "manual-test-file.md",
        `
# Testing Chunking

Section 1 text for the test. This should chunk based on size.

Section 2 more text. Keep adding more to simulate long file ingestion.
`.repeat(20)
    );

    return Response.json({ ok: true });
}
