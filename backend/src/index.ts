import { chromaClient, getOrCreateCollection } from "./chromaClient";
import { ingestItems } from "./injest";

async function main() {
    const collectionName = "personal-kb-test";

    // TEMP: delete old collection so it recreates with correct embedding dimension
    try {
        await chromaClient.deleteCollection({ name: collectionName });
        console.log("Old collection dropped.");
    } catch (e) {
        console.log("No existing collection found, creating fresh one.");
    }

    console.log("Connecting to Chroma & preparing collection:", collectionName);

    await ingestItems(collectionName, [
        {
            id: "kb-1",
            text: "LangChain helps build RAG applications by handling document loading, splitting, and retrieval.",
            metadata: { source: "demo", topic: "langchain" },
        },
        {
            id: "kb-2",
            text: "ChromaDB is a vector database used to store embeddings and perform similarity search.",
            metadata: { source: "demo", topic: "chroma" },
        },
    ]);

    console.log("Ingested items.");
}
main();
