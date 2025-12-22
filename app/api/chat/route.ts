import { NextRequest } from "next/server";
import { google } from "@ai-sdk/google";
import { streamText, convertToModelMessages } from "ai";

import { getOrCreateCollection } from "@/lib/chromaClient";
import { Citation, saveMessage } from "@/lib/chatMessages";

export const runtime = "nodejs";
export const maxDuration = 40;

const COLLECTION_NAME = "secondbrain";

type TextPart = {
  type: "text";
  text: string;
}

type ChromaMetadata = {
  filePath?: string;
  fileHash?: string;
  chunkIndex?: string;
};

export async function POST(req: NextRequest) {
  const body = await req.json();

  const messages = body.messages as {
    parts: TextPart[];
    metadata?: {
      sessionId?: string
    };
  }[];
  const lastMessage = messages?.[messages.length - 1];

  // ✅ sessionId extraction (Root Body > Message Metadata > URL Param)
  const sessionId: string | undefined =
    body.sessionId ||
    lastMessage?.metadata?.sessionId ||
    req.nextUrl.searchParams.get("sessionId") ||
    undefined;

  const userMessage =
    lastMessage?.parts?.find((p): p is TextPart => p.type === "text")?.text;

  if (!sessionId || !messages || !userMessage?.trim()) {
    console.error("INVALID PAYLOAD:", JSON.stringify(body, null, 2));
    return new Response(JSON.stringify({
      error: "Missing sessionId or message",
      received: { sessionId: !!sessionId, messages: !!messages, userMessage: !!userMessage }
    }), { status: 400 });
  }

  const query = userMessage.trim();

  /* ---------------- SAVE USER MESSAGE ---------------- */
  console.log(`[API] Attempting to save user message for session ${sessionId}`);
  await saveMessage({
    sessionId,
    role: "user",
    content: query,
  });

  /* ---------------- RAG ---------------- */
  const collection = await getOrCreateCollection(COLLECTION_NAME);

  const ragResults = await collection.query({
    queryTexts: [query],
    nResults: 5,
    include: ["documents", "metadatas"],
  });

  const rawDocs = ragResults.documents?.[0] ?? [];
  const docs: string[] = rawDocs.filter(
    (doc): doc is string => typeof doc === "string"
  );

  const rawMetas = ragResults.metadatas?.[0] ?? [];
  const metas: ChromaMetadata[] = rawMetas.filter(
    (m): m is ChromaMetadata => m !== null
  );

  const citations: Citation[] = metas.map((m) => ({
    filePath: m.filePath ?? "unknown",
    chunkIndex:
      typeof m.chunkIndex === "number"
        ? m.chunkIndex
        : Number(m.chunkIndex ?? 0),
  }));


  const context = docs
    .map(
      (doc, i) =>
        `Source ${i + 1} (${citations[i].filePath}, chunk ${citations[i].chunkIndex}):\n${doc}`
    )
    .join("\n\n");

  const systemPrompt = `
You are Adi's personal Second Brain assistant.
Use ONLY the provided Context.
If missing, say:
"I don't have that in my Second Brain yet."
`.trim();

  const modelMessages = convertToModelMessages([
    {
      role: "system",
      parts: [{ type: "text", text: systemPrompt }],
    },
    {
      role: "user",
      parts: [
        {
          type: "text",
          text: `${query}

---
Context:
${context}`,
        },
      ],
    },
  ]);

  const result = streamText({
    model: google("gemini-1.5-flash"),
    messages: modelMessages,

    onFinish: async (event) => {
      await saveMessage({
        sessionId,
        role: "assistant",
        content: event.text,
        citations,
      });
    },
  });

  return result.toUIMessageStreamResponse();
}

