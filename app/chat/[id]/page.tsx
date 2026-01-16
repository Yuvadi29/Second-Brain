"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState, useRef, useEffect } from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import TypingIndicator from "@/app/components/TypingIndicator";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { Send, User, Bot, Brain } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { use } from "react";
import { useSearchParams } from "next/navigation";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { markdownSchema } from "@/lib/markdownSanitizer";

function extractYouTubeId(url: string): string | null {
    try {
        const u = new URL(url);

        if (u.hostname.includes("youtube.com")) {
            return u.searchParams.get("v");
        }

        if (u.hostname === "youtu.be") {
            return u.pathname.slice(1);
        }

        return null;
    } catch {
        return null;
    }
}


export default function ChatSessionPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [input, setInput] = useState("");
    const { messages, setMessages, sendMessage, status } = useChat({
        transport: new DefaultChatTransport({
            api: `/api/chat?sessionId=${id}`
        }),
        body: {
            sessionId: id
        }
    } as any);

    const [historyLoaded, setHistoryLoaded] = useState(false);

    useEffect(() => {
        async function fetchHistory() {
            try {
                const res = await fetch(`/api/messages/${id}`);
                const data = await res.json();
                if (Array.isArray(data) && data.length > 0) {
                    const mappedMessages = data.map((m: any) => ({
                        id: m._id,
                        role: m.role as any,
                        parts: [{ type: "text" as const, text: m.content }],
                    }));
                    setMessages(mappedMessages);
                }
                setHistoryLoaded(true);
            } catch (error) {
                console.error("Failed to fetch history:", error);
                setHistoryLoaded(true);
            }
        }
        fetchHistory();
    }, [id, setMessages]);

    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || status === "submitted" || status === "streaming") return;
        await sendMessage({ text: input, metadata: { sessionId: id } });
        setInput("");
    };

    const isLoading = status === "submitted" || status === "streaming";

    const searchParams = useSearchParams();
    const firstQuery = searchParams.get("q");
    const sentRef = useRef(false);

    useEffect(() => {
        if (historyLoaded && firstQuery && !sentRef.current && messages.length === 0) {
            sentRef.current = true;
            sendMessage({
                text: firstQuery,
                metadata: { sessionId: id }
            })
        }
    }, [historyLoaded, firstQuery, sendMessage, messages.length, id]);

    return (
        <div className="flex flex-col h-screen bg-[#0a0a0a]">
            {/* Header */}
            <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-black/50 backdrop-blur-xl shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center border border-white/10">
                        <Brain className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                        <h1 className="text-sm font-semibold text-white">Knowledge Session</h1>
                        <p className="text-[10px] text-zinc-500 uppercase tracking-widest">ID: {id.slice(-6)}</p>
                    </div>
                </div>
            </header>

            {/* Messages */}
            <main className="flex-1 overflow-y-auto px-4 md:px-0 py-8">
                <div className="max-w-3xl mx-auto space-y-8 pb-12">
                    {messages.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col items-center justify-center py-20 text-center"
                        >
                            <div className="w-16 h-16 rounded-3xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center mb-6">
                                <Brain className="w-8 h-8 text-blue-500" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Deep Knowledge Retrieval</h2>
                            <p className="text-zinc-500 max-w-sm">
                                This session is ready. Ask anything about your indexed documents and notes.
                            </p>
                        </motion.div>
                    )}

                    <AnimatePresence initial={false}>
                        {messages.map((m) => (
                            <motion.div
                                key={m.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex gap-4 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                            >
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${m.role === "user"
                                    ? "bg-blue-600/10 border-blue-500/20 text-blue-400"
                                    : "bg-zinc-800 border-white/10 text-zinc-400"
                                    }`}>
                                    {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                </div>

                                <div className={`flex flex-col max-w-[85%] ${m.role === "user" ? "items-end" : "items-start"}`}>
                                    <div className={`px-5 py-3 rounded-2xl ${m.role === "user"
                                        ? "bg-blue-600 text-white"
                                        : "bg-zinc-900 border border-white/5 text-zinc-200"
                                        }`}>
                                        {m.parts.map((p, i) => (
                                            p.type === "text" ? (
                                                <div key={i} className="prose prose-sm prose-invert max-w-none">
                                                    {p.text.split("\n\n").map((block, idx) => {

                                                        return (
                                                            <Markdown
                                                                rehypePlugins={[
                                                                    rehypeRaw,
                                                                    [rehypeSanitize, markdownSchema]
                                                                ]}
                                                                key={idx}
                                                                skipHtml
                                                                components={{

                                                                    code({ inline, className, children, ...props }: any) {
                                                                        const match = /language-(\w+)/.exec(className || "");
                                                                        return !inline && match ? (
                                                                            <SyntaxHighlighter
                                                                                style={vscDarkPlus}
                                                                                language={match[1]}
                                                                                PreTag="div"
                                                                                className="rounded-xl my-4 text-xs"
                                                                                {...props}
                                                                            >
                                                                                {String(children).replace(/\n$/, "")}
                                                                            </SyntaxHighlighter>
                                                                        ) : (
                                                                            <code
                                                                                className="bg-white/10 px-1.5 py-0.5 rounded text-sm"
                                                                                {...props}
                                                                            >
                                                                                {children}
                                                                            </code>
                                                                        );
                                                                    },
                                                                    iframe({ src }) {
                                                                        if (!src) return null;

                                                                        return (
                                                                            <div className="my-4 w-full overflow-hidden rounded-xl border border-white/10 bg-black">
                                                                                <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                                                                                    <iframe
                                                                                        src={src}
                                                                                        title="Embedded video"
                                                                                        className="absolute top-0 left-0 w-full h-full"
                                                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                                        allowFullScreen
                                                                                        referrerPolicy="strict-origin-when-cross-origin"
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    }
                                                                }}
                                                            >
                                                                {block}
                                                            </Markdown>
                                                        );
                                                    })}
                                                </div>
                                            ) : null
                                        ))}
                                    </div>
                                    <div className="mt-1 px-2 text-[10px] text-zinc-600">
                                        {m.role === "user" ? "You" : "Second Brain"}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {isLoading && (
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-zinc-400">
                                <Bot className="w-4 h-4" />
                            </div>
                            <div className="bg-zinc-900/50 border border-white/5 rounded-2xl px-4 py-2">
                                <TypingIndicator />
                            </div>
                        </div>
                    )}
                    <div ref={bottomRef} className="h-4" />
                </div>
            </main>

            {/* Input Area */}
            <div className="p-6 bg-linear-to-t from-black via-black to-transparent">
                <form onSubmit={onSubmit} className="max-w-3xl mx-auto relative group">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Search your brain..."
                        disabled={isLoading}
                        className="pr-14 h-14 rounded-2xl bg-zinc-900/50 border-white/10 focus:border-blue-500/50 focus:ring-blue-500/20 shadow-2xl transition-all"
                    />
                    <div className="absolute right-2 top-2">
                        <Button
                            type="submit"
                            size="icon"
                            disabled={isLoading || !input.trim()}
                            className="h-10 w-10 rounded-xl cursor-pointer"
                        >
                            <Send className="w-4 h-4" />
                        </Button>
                    </div>
                </form>
                <p className="text-center mt-3 text-[10px] text-zinc-600 tracking-wider">
                    AI generated responses may be inaccurate. Check citations for verification.
                </p>
            </div>
        </div>
    );
}
