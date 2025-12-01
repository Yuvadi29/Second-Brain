module.exports = [
"[externals]/@huggingface/transformers [external] (@huggingface/transformers, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("@huggingface/transformers");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/node_modules/@chroma-core/default-embed/dist/default-embed.legacy-esm.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// src/index.ts
__turbopack_context__.s([
    "DefaultEmbeddingFunction",
    ()=>DefaultEmbeddingFunction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chroma$2d$core$2f$ai$2d$embeddings$2d$common$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@chroma-core/ai-embeddings-common/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$huggingface$2f$transformers__$5b$external$5d$__$2840$huggingface$2f$transformers$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/@huggingface/transformers [external] (@huggingface/transformers, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$huggingface$2f$transformers__$5b$external$5d$__$2840$huggingface$2f$transformers$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f40$huggingface$2f$transformers__$5b$external$5d$__$2840$huggingface$2f$transformers$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
var DefaultEmbeddingFunction = class _DefaultEmbeddingFunction {
    constructor(args = {}){
        this.name = "default";
        this.progressCallback = void 0;
        const { modelName = "Xenova/all-MiniLM-L6-v2", revision = "main", dtype = void 0, progressCallback = void 0, quantized = false, wasm = false } = args;
        this.modelName = modelName;
        this.revision = revision;
        this.dtype = dtype || (quantized ? "uint8" : "fp32");
        this.quantized = quantized;
        this.progressCallback = progressCallback;
        this.wasm = wasm;
        if (this.wasm) {
            __TURBOPACK__imported__module__$5b$externals$5d2f40$huggingface$2f$transformers__$5b$external$5d$__$2840$huggingface$2f$transformers$2c$__esm_import$29$__["env"].backends.onnx.backend = "wasm";
        }
    }
    static buildFromConfig(config) {
        return new _DefaultEmbeddingFunction({
            modelName: config.model_name,
            revision: config.revision,
            dtype: config.dtype,
            quantized: config.quantized,
            wasm: config.wasm
        });
    }
    async generate(texts) {
        const pipe = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$huggingface$2f$transformers__$5b$external$5d$__$2840$huggingface$2f$transformers$2c$__esm_import$29$__["pipeline"])("feature-extraction", this.modelName, {
            revision: this.revision,
            progress_callback: this.progressCallback,
            dtype: this.dtype
        });
        const output = await pipe(texts, {
            pooling: "mean",
            normalize: true
        });
        return output.tolist();
    }
    defaultSpace() {
        return "cosine";
    }
    supportedSpaces() {
        return [
            "cosine",
            "l2",
            "ip"
        ];
    }
    getConfig() {
        return {
            model_name: this.modelName,
            revision: this.revision,
            dtype: this.dtype,
            quantized: this.quantized
        };
    }
    validateConfigUpdate(newConfig) {
        if (this.getConfig().model_name !== newConfig.model_name) {
            throw new Error("The DefaultEmbeddingFunction's 'model' cannot be changed after initialization.");
        }
    }
    static validateConfig(config) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chroma$2d$core$2f$ai$2d$embeddings$2d$common$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateConfigSchema"])(config, "transformers");
    }
};
;
 //# sourceMappingURL=default-embed.mjs.map
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__cd1f245f._.js.map