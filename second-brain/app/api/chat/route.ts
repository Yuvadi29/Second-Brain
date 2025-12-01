import { getOrCreateCollection } from "@/lib/chromaClient";
import { google } from "@ai-sdk/google";
import { convertToModelMessages, generateText, streamText, type UIMessage } from 'ai';
import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 40; //Allow streaming for upto 40s

function extractUserMessageText(msg: any): string {
    if (Array.isArray(msg.parts)) {
        return msg.parts
            .map((p: any) => (p.type === "text" ? p.text : ""))
            .join("\n")
            .trim();
    }
    return "";
}


const COLLECTION_NAME = "secondbrain";

export async function POST(req: NextRequest) {
    const { messages } = (await req.json() as { messages: UIMessage[] });

    if (!messages || !messages?.length) {
        return new Response("Missing messages", { status: 400 });
    };

    // Get last user message as query
    const lastUserIndex = [...messages].reverse().findIndex((m) => m?.role === "user");

    if (lastUserIndex === -1) {
        return new Response("No user message found", { status: 400 });
    }

    const realIndex = messages?.length - 1 - lastUserIndex;
    const lastUserMessage = messages[realIndex];
    const query = extractUserMessageText(lastUserMessage);

    if (!query?.trim()) {
        return new Response("Empty user query", { status: 400 });
    }

    // RAG: Retrieve Top-k chunks from Chroma
    const collection = await getOrCreateCollection(COLLECTION_NAME);

    const ragResults = await collection?.query({
        queryTexts: [query],
        nResults: 5,
        include: ["documents", "metadatas"],
    });

    const docs = (ragResults?.documents?.[0] ?? []) as string[];
    const metas = (ragResults?.metadatas?.[0] ?? []) as Record<string, any>[];

    // Build a context block
    const context = docs
        ?.map((doc, i) => {
            const meta = metas[i] || {};
            const source = meta?.filePath ?? meta?.path ?? "unknown";
            const chunkIndex = meta?.chunkIndex ?? i;
            return `Source ${i + 1} (file: ${source}, chunk: ${chunkIndex}):\n${doc}`;
        }).join("\n\n");

    const systemPrompt = `
You are Adi's personal Second Brain assistant.

Use ONLY the information provided in the "Context" section below when answering.
If the answer is not clearly contained in the context, say:
"I don't have that in my Second Brain yet."

When you answer:
- Be concise but clear.
- Prefer bullet points where it helps.
- If relevant, mention which source(s) you used.
`.trim();

    const augmentedLastUser: UIMessage = {
        // ...lastUserMessage,
        // content: `${query}
        id: lastUserMessage?.id,
        role: "user",
        parts: [
            {
                type: "text",
                text: `${query} 
                --- 
                Context from Adi's Second Brain:
                ${context || "[no matching context found]"}
                
                Now answer the user's question strictly based on the context above.
                `
            }
        ],
    }

    // Build model messages: system + previous history + augmented last user
    const uiMessagesWithContext: UIMessage[] = [
        {
            id: "system-1",
            role: "system",
            parts: [{
                type: "text",
                text: systemPrompt
            }],
        },
        ...messages?.slice(0, realIndex),
        augmentedLastUser,
    ];

    // Stream response
    const result = streamText({
        model: google("gemini-2.5-flash"),
        messages: convertToModelMessages(uiMessagesWithContext),
    });

    // Return streaming response compatible with useChat
    return result?.toUIMessageStreamResponse();
}