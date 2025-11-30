import { getOrCreateCollection } from "./chromaClient";
import { embedTexts } from "./embeddings";

export type IngestItem = {
    id: string;
    text: string;
    metadata?: Record<string, any>;
}

export async function ingestItems(
    collectionName: string,
    items: IngestItem[]
) {
    if (items?.length === 0) return;

    const collection = await getOrCreateCollection(collectionName);

    const ids = items?.map((i) => i?.id);
    const documents = items?.map((i) => i?.text);
    const metadatas = items?.map((i) => i?.metadata ?? {});

    // Compute embeddings
    const embeddings = await embedTexts(documents);

    // Upsert to chroma
    await collection?.upsert({
        ids,
        documents,
        embeddings,
        metadatas,
    });
}