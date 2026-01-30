import { NextRequest } from "next/server";
import { getMessagesBySession, deleteChatSession } from "@/lib/chatMessages";

export async function GET(_: NextRequest, props: { params: Promise<{ sessionId: string }> }) {
  const params = await props.params;
  const messages = await getMessagesBySession(params.sessionId);
  return Response.json(messages);
}

export async function DELETE(_: NextRequest, props: { params: Promise<{ sessionId: string }> }) {
  const params = await props.params;
  try {
    await deleteChatSession(params.sessionId);
    return Response.json({ success: true });
  } catch (error) {
    console.error("Failed to delete chat session:", error);
    return Response.json({ error: "Failed to delete chat session" }, { status: 500 });
  }
}
