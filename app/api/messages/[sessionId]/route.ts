import { NextRequest } from "next/server";
import { getMessagesBySession } from "@/lib/chatMessages";

export async function GET(_: NextRequest, props: { params: Promise<{ sessionId: string }> }) {
  const params = await props.params;
  const messages = await getMessagesBySession(params.sessionId);
  return Response.json(messages);
}
