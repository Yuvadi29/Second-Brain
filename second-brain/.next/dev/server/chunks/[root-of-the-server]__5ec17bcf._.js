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
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

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
"[project]/lib/chunkAndIngest.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

/* __next_internal_action_entry_do_not_use__ [{"781585da4d2035e29ea58d13b2350882139d769c50":"ingestTextIntoChroma"},"",""] */ __turbopack_context__.s([
    "ingestTextIntoChroma",
    ()=>ingestTextIntoChroma
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$langchain$2f$textsplitters$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@langchain/textsplitters/dist/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$langchain$2f$textsplitters$2f$dist$2f$text_splitter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@langchain/textsplitters/dist/text_splitter.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$chromaClient$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/chromaClient.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$chromaClient$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$chromaClient$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
async function ingestTextIntoChroma(collectionName, filePath, text, metadata = {}) {
    const splitter = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$langchain$2f$textsplitters$2f$dist$2f$text_splitter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RecursiveCharacterTextSplitter"]({
        chunkSize: 1200,
        chunkOverlap: 200
    });
    const chunks = await splitter.splitText(text);
    const collection = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$chromaClient$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getOrCreateCollection"])(collectionName);
    await collection?.add({
        ids: chunks?.map((_, i)=>`${filePath}::${i}`),
        documents: chunks,
        metadatas: chunks?.map((_, i)=>({
                ...metadata,
                filePath,
                chunkIndex: i
            }))
    });
    console.log(`Ingested ${chunks?.length} chunks from ${filePath}`);
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    ingestTextIntoChroma
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(ingestTextIntoChroma, "781585da4d2035e29ea58d13b2350882139d769c50", null);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/app/api/github/webhook/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$chunkAndIngest$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/chunkAndIngest.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$chunkAndIngest$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$chunkAndIngest$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const runtime = "nodejs";
const GH_SECRET = process.env.GITHUB_WEBHOOK_SECRET;
const OWNER = process.env.GITHUB_REPO_OWNER;
const REPO = process.env.GITHUB_REPO_NAME;
const GITHUB_TOKEN = process.env.GITHUB_ACCESS_TOKEN;
function verifySignature(payload, signature) {
    if (!signature) return false;
    const hmac = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHmac("sha256", GH_SECRET);
    const digest = `sha256=${hmac.update(payload).digest('hex')}`;
    return __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"]?.timingSafeEqual(Buffer?.from(digest), Buffer?.from(signature));
}
async function fetchFileContent(path, ref) {
    const encodedPath = path.split('/').map((s)=>encodeURIComponent(s)).join('/');
    const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${encodeURIComponent(path)}?ref=${ref}`;
    console.log(`Fetching from: ${url}`);
    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            Accept: "application/vnd.github.v3.raw"
        }
    });
    if (res.status === 404) {
        console.error(`File not found (404): ${path}`);
        return null;
    }
    if (!res.ok) {
        console.error("GitHub fetch error: ", res.status, await res.text());
        return null;
    }
    return await res.text();
}
async function POST(req) {
    console.log("Webhook received");
    const rawBody = await req.text();
    const signature = req.headers.get("x-hub-signature-256");
    if (!verifySignature(rawBody, signature)) {
        console.error("Invalid signature");
        return new Response("Invalid signature", {
            status: 401
        });
    }
    console.log("Signature verified");
    const event = req.headers.get("x-github-event");
    console.log(`Event: ${event}`);
    if (event !== "push") {
        console.log("Ignored event (not push)");
        return new Response("Ignored", {
            status: 204
        });
    }
    const payload = JSON.parse(rawBody);
    console.log(`Payload received for ref: ${payload?.ref}, after: ${payload?.after}`);
    const afterSha = payload?.after;
    const commits = payload?.commits ?? [];
    const touchedFiles = [];
    for (const c of commits){
        console.log(`Processing commit: ${c.id}, added: ${c.added}, modified: ${c.modified}`);
        for (const f of [
            ...c.added,
            ...c.modified
        ]){
            if (typeof f === "string" && f.includes("knowledge/")) {
                touchedFiles?.push(f);
            }
        }
    }
    console.log(`Touched knowledge files: ${touchedFiles.join(", ")}`);
    if (touchedFiles?.length === 0) {
        console.log("No knowledge files changed");
        return new Response("No knowledge files changed", {
            status: 200
        });
    }
    for (const path of touchedFiles){
        console.log(`Fetching content for: ${path}`);
        const content = await fetchFileContent(path, afterSha);
        if (content === null) {
            continue;
        }
        if (!content) {
            console.log(`Content is empty for ${path}, skipping ingestion`);
            continue;
        }
        console.log(`Content fetched for ${path}, length: ${content.length}`);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$chunkAndIngest$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ingestTextIntoChroma"])("secondbrain", path, content, {
                ref: afterSha
            });
            console.log(`Successfully ingested ${path}`);
        } catch (error) {
            console.error(`Error ingesting ${path}:`, error);
        }
    // await collection?.add({
    //     ids: [path],
    //     documents: [content],
    //     metadatas: [{ path, ref: afterSha }],
    // });
    }
    return new Response("OK", {
        status: 200
    });
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__5ec17bcf._.js.map