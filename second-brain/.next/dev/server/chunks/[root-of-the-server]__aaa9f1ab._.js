module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/chromadb [external] (chromadb, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("chromadb");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/lib/chromaClient.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "chroma",
    ()=>chroma,
    "getOrCreateCollection",
    ()=>getOrCreateCollection
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$chromadb__$5b$external$5d$__$28$chromadb$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/chromadb [external] (chromadb, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dotenv$2f$lib$2f$main$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/dotenv/lib/main.js [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$chromadb__$5b$external$5d$__$28$chromadb$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$chromadb__$5b$external$5d$__$28$chromadb$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dotenv$2f$lib$2f$main$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].config();
const apiKey = process.env.CHROMA_API_KEY;
const tenant = process.env.CHROMA_TENANT;
const database = process.env.CHROMA_DATABASE;
if (!apiKey || !tenant || !database) {
    throw new Error("CHROMA_API_KEY, CHROMA_TENANT, CHROMA_DATABASE must be set");
}
const chroma = new __TURBOPACK__imported__module__$5b$externals$5d2f$chromadb__$5b$external$5d$__$28$chromadb$2c$__esm_import$29$__["CloudClient"]({
    apiKey,
    tenant,
    database
});
async function getOrCreateCollection(name) {
    return chroma.getOrCreateCollection({
        name
    });
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/app/api/chat/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "maxDuration",
    ()=>maxDuration,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$chromaClient$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/chromaClient.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ai$2d$sdk$2f$google$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ai-sdk/google/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/ai/dist/index.mjs [app-route] (ecmascript) <locals>");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$chromaClient$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$chromaClient$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
const runtime = "nodejs";
const maxDuration = 40; //Allow streaming for upto 40s
function extractUserMessageText(msg) {
    if (Array.isArray(msg.parts)) {
        return msg.parts.map((p)=>p.type === "text" ? p.text : "").join("\n").trim();
    }
    return "";
}
const COLLECTION_NAME = "secondbrain";
async function POST(req) {
    const { messages } = await req.json();
    if (!messages || !messages?.length) {
        return new Response("Missing messages", {
            status: 400
        });
    }
    ;
    // Get last user message as query
    const lastUserIndex = [
        ...messages
    ].reverse().findIndex((m)=>m?.role === "user");
    if (lastUserIndex === -1) {
        return new Response("No user message found", {
            status: 400
        });
    }
    const realIndex = messages?.length - 1 - lastUserIndex;
    const lastUserMessage = messages[realIndex];
    const query = extractUserMessageText(lastUserMessage);
    if (!query?.trim()) {
        return new Response("Empty user query", {
            status: 400
        });
    }
    // RAG: Retrieve Top-k chunks from Chroma
    const collection = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$chromaClient$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getOrCreateCollection"])(COLLECTION_NAME);
    const ragResults = await collection?.query({
        queryTexts: [
            query
        ],
        nResults: 5,
        include: [
            "documents",
            "metadatas"
        ]
    });
    const docs = ragResults?.documents?.[0] ?? [];
    const metas = ragResults?.metadatas?.[0] ?? [];
    // Build a context block
    const context = docs?.map((doc, i)=>{
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
    const augmentedLastUser = {
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
        ]
    };
    // Build model messages: system + previous history + augmented last user
    const uiMessagesWithContext = [
        {
            id: "system-1",
            role: "system",
            parts: [
                {
                    type: "text",
                    text: systemPrompt
                }
            ]
        },
        ...messages?.slice(0, realIndex),
        augmentedLastUser
    ];
    // Stream response
    const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["streamText"])({
        model: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ai$2d$sdk$2f$google$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["google"])("gemini-2.5-flash"),
        messages: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["convertToModelMessages"])(uiMessagesWithContext)
    });
    // Return streaming response compatible with useChat
    return result?.toUIMessageStreamResponse();
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__aaa9f1ab._.js.map