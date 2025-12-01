import { getOrCreateCollection } from "@/lib/chromaClient";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      collectionName = "secondbrain",
      filePath,
      fileContent,
      metadata
    } = body;

    if (!filePath || !fileContent) {
      return Response.json({
        error: "FilePath and File Content are required"
      }, { status: 400 });
    }

    const collection = await getOrCreateCollection(collectionName);

    await collection?.add({
      ids: [filePath],
      documents: [fileContent],
      metadatas: [metadata ?? {}],
    });

    return Response?.json({ ok: true });
  } catch (err) {
    console.error("Chroma ingest error:", err);
    return Response.json({ error: "ingest failed" }, { status: 500 });
  }
}