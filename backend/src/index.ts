import { getOrCreateCollection } from "./chromaClient";

async function main() {
    console.log('Upserting some sample documents...');

    const collection = await getOrCreateCollection("personal-kb-test");


    // Minimal mock data
    const ids = ["doc1", "doc2"];
    const documents = [
        "This is my first knowledge chunk about LangChain and RAG.",
        "This is another chunk about ChromaDB and vector databases.",
    ];

    const metadatas = [
        {
            source: "demo",
            topic: "rag"
        },
        {
            source: "demo",
            topic: "chroma"
        }
    ];
    await collection.upsert({ ids, documents, metadatas });

    console.log("Upserted docs.");

    console.log("Querying Collection");
    const query = "What do I know about vector databases?";
    const results = await collection.query({
        nResults: 2,
        queryTexts: [query],
    });

    console.log("Query results:");
    console.dir(results, { depth: null });

    console.log("Done.");


}

main().catch((err) => {
    console.error("Fatal error:", err);
    process.exit(1);
});