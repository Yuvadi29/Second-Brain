"use client";

import { UIMessage, useChat } from "@ai-sdk/react";
import { UIDataTypes, UITools, ChatRequestOptions, UIMessageChunk } from "ai";
import { useState, useRef, useEffect } from "react";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat({
    transport: {
      sendMessages: function (options: { trigger: "submit-message" | "regenerate-message"; chatId: string; messageId: string | undefined; messages: UIMessage<unknown, UIDataTypes, UITools>[]; abortSignal: AbortSignal | undefined; } & ChatRequestOptions): Promise<ReadableStream<UIMessageChunk>> {
        throw new Error("Function not implemented.");
      },
      reconnectToStream: function (options: { chatId: string; } & ChatRequestOptions): Promise<ReadableStream<UIMessageChunk> | null> {
        throw new Error("Function not implemented.");
      }
    }
  });

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    await sendMessage({ text: input });
    setInput("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <header className="px-6 py-4 border-b border-white/10">
        <h1 className="text-xl font-semibold">Second Brain 💡</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`px-4 py-2 rounded-2xl max-w-[80%] whitespace-pre-wrap leading-relaxed ${
                m.role === "user" ? "bg-blue-600 text-white" : "bg-white/10 text-white"
              }`}>
                {m.parts.map((p, i) => (
                  p.type === "text" ? <div key={i}>{p.text}</div> : null
                ))}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </main>

      <form onSubmit={onSubmit} className="p-4 border-t border-white/10 bg-black">
        <div className="max-w-2xl mx-auto flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your Second Brain anything..."
            className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            // disabled={status === "submitting"}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition disabled:bg-blue-900"
          >
            {/* {status === "submitting" ? "Thinking..." : "Send"} */}
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
