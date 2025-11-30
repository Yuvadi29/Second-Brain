import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
    throw new Error("OpenAI Api Key is not set in environment");
}

const openai = new OpenAI({ apiKey });

const DEFAULT_MODEL = process.env.OPENAI_EMBEDDING_MODEL || "text-embedding-3-small";

export async function embedTexts(texts: string[]): Promise<number[][]> {
    if (texts?.length === 0) return [];

    const response = await openai.embeddings.create({
        model: DEFAULT_MODEL,
        input: texts,
    });

    return response?.data?.map((d) => d?.embedding);
}