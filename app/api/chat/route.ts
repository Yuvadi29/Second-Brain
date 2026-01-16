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

const BLOCKED_PATTERNS = [
  /bank/i,
  /account number/i,
  /ifsc/i,
  /password/i,
  /otp/i,
  /credit card/i,
  /debit card/i,
  /ssn/i,
  /aadhar/i,
  /pan card/i,
  /who is/i,
  /ignore previous/i,
  /system prompt/i,
  /you are chatgpt/i,
];

function violatesInputPolicy(query: string): boolean {
  return BLOCKED_PATTERNS.some((p) => p.test(query));
}

const SENSITIVE_CONTEXT_PATTERNS = [
  /\b\d{12,16}\b/g,          // card-like numbers
  /\b\d{9,12}\b/g,           // ids
  /account number/i,
  /ifsc/i,
  /password/i,
  /secret/i,
  /token/i,
];

function sanitizeContext(text: string): string {
  let sanitized = text;

  for (const pattern of SENSITIVE_CONTEXT_PATTERNS) {
    sanitized = sanitized.replace(pattern, "[REDACTED]");
  }

  return sanitized;
}

const OUTPUT_BLOCK_PATTERNS = [
  /bank/i,
  /account number/i,
  /ifsc/i,
  /password/i,
  /credit card/i,
  /\b\d{12,16}\b/,
];

function violatesOutputPolicy(text: string): boolean {
  return OUTPUT_BLOCK_PATTERNS.some((p) => p.test(text));
}


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

  if (violatesInputPolicy(query)) {
    return new Response(
      JSON.stringify({
        error: "This question is not allowed in your Second Brain.",
      }),
      { status: 403 }
    );
  }


  /* ---------------- SAVE USER MESSAGE ---------------- */
  // console.log(`[API] Attempting to save user message for session ${sessionId}`);
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


  const context = sanitizeContext(
    docs
      .map(
        (doc, i) =>
          `Source ${i + 1} (${citations[i].filePath}, chunk ${citations[i].chunkIndex}):\n${doc}`
      )
      .join("\n\n")
  );


  const systemPrompt = `
ROLE: Private Knowledge Assistant

RULES (NON-NEGOTIABLE):
1. Answer ONLY using the provided Context.
2. If the answer is not explicitly present, reply EXACTLY:
   "I don't have that in my Second Brain yet."
3. Do NOT infer, guess, summarize external knowledge.
4. Do NOT reveal personal, financial, or sensitive information.
5. If the question violates rules, respond:
   "This request is not permitted."
6. If the Context contains a YouTube URL, include it in the answer.
7. Do NOT invent video links.
8. Do NOT summarize video content unless explicitly written in Context.


FAILURE TO FOLLOW THESE RULES IS A SECURITY BREACH.
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
    model: google("gemini-2.5-flash"),
    messages: modelMessages,

    // onFinish: async (event) => {
    //   await saveMessage({
    //     sessionId,
    //     role: "assistant",
    //     content: event.text,
    //     citations,
    //   });
    // },

    onFinish: async (event) => {
      const text = event.text ?? "";

      if (violatesOutputPolicy(text)) {
        await saveMessage({
          sessionId,
          role: "assistant",
          content: "This response was blocked due to security restrictions.",
        });
        return;
      }

      await saveMessage({
        sessionId,
        role: "assistant",
        content: text,
        citations,
      });
    },

  });

  return result.toUIMessageStreamResponse();
}

