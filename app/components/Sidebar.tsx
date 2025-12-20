import { getChatSessions } from "@/lib/chatSessions";
import Link from "next/link";
import { Button } from "./ui/Button";
import { Plus, MessageSquare, Brain} from "lucide-react";

export default async function ChatSidebar() {
    const sessions = await getChatSessions();

    return (
        <aside className="w-72 h-screen border-r border-white/5 bg-black flex flex-col">
            {/* Header */}
            <div className="p-6">
                <Link href="/" className="flex items-center gap-2 mb-8 group">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center group-hover:rotate-12 transition-transform">
                        <Brain className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-lg tracking-tight">Second Brain</span>
                </Link>

                <Link href="/chat">
                    <Button variant="primary" className="w-full justify-start gap-2 h-11 rounded-xl shadow-blue-500/10">
                        <Plus className="w-4 h-4" />
                        New Chat
                    </Button>
                </Link>
            </div>

            {/* Sessions List */}
            <div className="flex-1 overflow-y-auto px-3 space-y-1">
                <div className="px-3 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Recent Chats</span>
                </div>

                {sessions.length === 0 ? (
                    <div className="px-3 py-4 text-xs text-zinc-500 italic">
                        No recent sessions
                    </div>
                ) : (
                    sessions.map((s: any) => (
                        <Link
                            key={s._id.toString()}
                            href={`/chat/${s._id.toString()}`}
                            className="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
                        >
                            <MessageSquare className="w-4 h-4 shrink-0 opacity-50 group-hover:opacity-100" />
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium truncate">{s.title || "Untitled Chat"}</div>
                                <div className="text-[10px] opacity-40 mt-0.5">
                                    {new Date(s.updatedAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </aside>
    );
}

