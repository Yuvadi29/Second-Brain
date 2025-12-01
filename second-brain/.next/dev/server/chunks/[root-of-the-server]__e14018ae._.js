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
"[project]/app/api/injest/test/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// app/api/dev/ingest-upi/route.ts
__turbopack_context__.s([
    "POST",
    ()=>POST,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$chunkAndIngest$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/chunkAndIngest.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$chunkAndIngest$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$chunkAndIngest$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
const runtime = "nodejs";
const UPI_TEXT = `
### Traditional Approach for Payments in India UPI
Traditional System for Payments in India work on the basis of banks. Users must have a bank account to make payments. They can have their accounts in any of the banks like ICICI, HDFC, SBI, HSBC, etc. 
All these banks are regulated by RBI which is the Reserve Bank of India

Each user has the following unique details in their bank, irrespective of the bank that they have their account in:
\t- Account Number
\t- Bank Name
\t- Branch Code
\t- IFSC Code
Say, me as a user want to make a payment to Anil. So, to make the transaction, i will need the above details of Anil. Here, I will need the Account Details of Anil to make the transaction complete, without that there will not be any transaction done.
Now, to make the payment, there are different services that are used. 
\t- For Small transaction like 1000, 2000, etc we use IMPS which is Immediate Payment Service
\t- For Medium Transaction like 50,000 , 1,00,000 etc we use NEFT which is National Electronic Funds Transfer. Here the catch is that it will take hours to get reflected into the receivers account. For this , people usually save up a screenshot of their transaction stating that user 1 has already payed, and it will take some hours for the amount to get reflected on user 2's bank.
\t- For High Transaction like 5,00,000 , 20,00,000 etc RTGS which is Realtime-Gross-Settlement
This is the traditional approach on the payment transfer.
***How UPI Revolutionized the Way Payment Works ?
First of all UPI stands for Unified Payment Interface. It is an instant real-time payment system developed by NPCI which is National Payments Corporation of India. 
The way UPI is changing the way things work is by saying 'Ok, we don't want to go through all the traditional of money transfer, we want to change it and make it very simple '. This is how it works:
NPCI acts as the Payment Infrastructure. 
The APIs provided by NPCI are not publicly available, hence not everyone can communicate with NPCI network.
NPCI has a list of trusted banks with which it communicates. It includes HDFC, ICICI, SBI, etc. Meaning, only these banks can communicate with the NPCI's API. 
 Now say, user wants to make a transaction, he or she cannot directly communicate with the api of NPCI. So, for that we have PSP (Payment Service Provider). This is basically a third party entity that facilitates electronic payment transactions for merchants. Some of the Customer PSPs are GooglePay, PhonePay, SuperMoney etc. 
Now here what we do is, we have a QR Code . We scan it to make the payments. We need an address to make the payments. QR Code contains the VPA of that user. VPA stands for Virutal Payment Address. It works like username@handle. 
Now say i want to make the payment from aditya@hdfc to anil@icici. I cannot directly go to NPCI as it only communicates with the trusted banks. So what happens is the PSP calls the banks with which it has its tie up. Say i am using GooglePay which has the tieup to HDFC Bank, it will communicate with the HDFC Bank for the transaction.
While making the payment, it would create an intent which would be like:
\tfrom:aditya@hdfc
\tto:anil@icici
\tamount: 5000
Now this payment request goes to HDFC Bank, which then sends it to NPCI asking for the payment from aditya to anil of Rs 5000. 
NPCI then asks if the amount is available in the sender's bank, that is when we get a screen on putting the PIN for the payment.  Once the amount is debited, it then sends a notification to user that the amount has been debited. NPCI now sends a request to the receiver's bank asking to credit the amount. If the server is busy, it will fail to response. That is when we get a notification that the receiver's server is busy. If it is not busy, the amount will be credited to the user2 and they will receive a message of credit.
NPCI has just made this possible using the from and to VPA(Virtual Payment Address).
`;
async function POST() {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$chunkAndIngest$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ingestTextIntoChroma"])("secondbrain", "knowledge/upi-payments.md", UPI_TEXT, {
        source: "dev-test"
    });
    return new Response("Ingested UPI doc", {
        status: 200
    });
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e14018ae._.js.map