import clientPromise from "@/lib/mongodb";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const { firstMessage } = await req.json();

    if (!firstMessage?.trim()) {
        return new Response("Missing message", {
            status: 400
        });
    }

    const client = await clientPromise;
    const db = client.db("secondbrain");

    const now = new Date();

    const res = await db.collection("sessions").insertOne({
        title: firstMessage.slice(0, 40),
        createdAt: now,
        updatedAt: now,
    });

    return Response.json({
        sessionId: res.insertedId.toString(),
    });
}