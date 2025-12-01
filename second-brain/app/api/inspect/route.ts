import { NextRequest } from "next/server";
import { getOrCreateCollection } from "@/lib/chromaClient";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const collectionName = searchParams.get("collection") || "secondbrain";

    try {
        const collection = await getOrCreateCollection(collectionName);
        const result = await collection.get({
            include: ["documents", "metadatas"],
        });
        return Response.json(result);
    } catch (err) {
        console.error("Chroma inspect error:", err);
        return Response.json({ error: "inspect failed" }, { status: 500 });
    }
}
