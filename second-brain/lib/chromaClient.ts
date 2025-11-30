import {ChromaClient} from "chromadb";
import dotenv from "dotenv";

dotenv.config();

const CHROMA_URL = process.env.CHROMA_URL || "http://localhost:8000";

export const chromaClient = new ChromaClient({
    path: CHROMA_URL,
});

export async function getOrCreateCollection(name: string) {
    try {
        const collection = await chromaClient.getOrCreateCollection({
            name,
        });
        return collection;
    } catch (error) {
        console.error("Error getting/creating chroma Collection: ", error);
        throw error;
    }
}