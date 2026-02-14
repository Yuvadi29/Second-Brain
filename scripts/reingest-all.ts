
import dotenv from "dotenv";
dotenv.config();

import fs from "fs/promises";
import path from "path";
import { ingestTextIntoChroma } from "../lib/chunkAndIngest";
import { getOrCreateCollection } from "../lib/chromaClient";

async function run() {
    console.log("🚀 Starting Full Re-ingestion...");

    const COLLECTION_NAME = "secondbrain";
    const knowledgeDir = path.join(process.cwd(), "knowledge");

    try {
        // 1. Reset Collection
        console.log(`🗑️  Deleting existing collection: ${COLLECTION_NAME}...`);
        const collection = await getOrCreateCollection(COLLECTION_NAME);

        // ChromaDB doesn't have a direct "delete collection" on the collection object easily exposed in all clients, 
        // but we can delete items or strict delete via client. 
        // Let's use the valid JS client method if available, or just delete all documents.
        // Looking at lib/chromaClient.ts, we export `chroma` client. 

        const { chroma } = await import("../lib/chromaClient");
        await chroma.deleteCollection({ name: COLLECTION_NAME });
        console.log("✅ Collection deleted.");

        // Re-create to ensure fresh start
        await getOrCreateCollection(COLLECTION_NAME);
        console.log("✅ Collection re-created.");

        // 2. Read Knowledge Directory
        const files = await fs.readdir(knowledgeDir);
        const mdFiles = files.filter(f => f.endsWith(".md"));

        console.log(`found ${mdFiles.length} markdown files.`);

        // 3. Ingest Each File
        for (const file of mdFiles) {
            const filePath = path.join(knowledgeDir, file);
            console.log(`Processing: ${file}`);
            const content = await fs.readFile(filePath, "utf-8");

            await ingestTextIntoChroma(COLLECTION_NAME, filePath, content, {});
            console.log(`👉 Ingested: ${file}`);
        }

        console.log("🎉 Re-ingestion complete! The dimension mismatch should be resolved.");

    } catch (e) {
        console.error("❌ Error during re-ingestion:", e);
    }
}

run();
