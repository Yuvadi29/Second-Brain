
import { CloudClient } from "chromadb";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.CHROMA_API_KEY!;
const tenant = process.env.CHROMA_TENANT!;
const database = process.env.CHROMA_DATABASE!;

if (!apiKey || !tenant || !database) {
  throw new Error("CHROMA_API_KEY, CHROMA_TENANT, CHROMA_DATABASE must be set");
}

export const chroma = new CloudClient({
  apiKey,
  tenant,
  database,
})

export async function getOrCreateCollection(name: string) {
  return chroma.getOrCreateCollection({
    name,
  });
}
