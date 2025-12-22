import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export type Citation = {
    filePath: string;
    chunkIndex: number;
};

export type ChatMessage = {
    _id: ObjectId;
    sessionId: ObjectId;
    role: "user" | "assistant";
    content: string;
    citations?: Citation[];
    createdAt: Date;
};

/**
 * Save a message
 */
export async function saveMessage({
    sessionId,
    role,
    content,
    citations,
}: {
    sessionId: string;
    role: "user" | "assistant";
    content: string;
    citations?: Citation[];
}) {
    try {
        const client = await clientPromise;
        const db = client.db("secondbrain");

        // console.log(`[DB] Saving ${role} message for session ${sessionId}...`);

        const res = await db.collection("messages").insertOne({
            sessionId: new ObjectId(sessionId),
            role,
            content,
            citations,
            createdAt: new Date(),
        });

        // console.log(`[DB] Successfully saved message with ID: ${res.insertedId}`);

        // bump session updatedAt
        const updateRes = await db.collection("sessions").updateOne(
            { _id: new ObjectId(sessionId) },
            { $set: { updatedAt: new Date() } }
        );

        if (updateRes.matchedCount === 0) {
            console.warn(`[DB] Warning: No session found with ID ${sessionId} to update.`);
        } else {
            // console.log(`[DB] Updated session timestamp for ${sessionId}`);
        }
    } catch (error) {
        console.error(`[DB] Error saving message:`, error);
        throw error; // Re-throw to ensure the caller knows it failed
    }
}

/**
 * Load all messages for a session
 */
export async function getMessagesBySession(sessionId: string) {
    const client = await clientPromise;
    const db = client.db("secondbrain");

    return db
        .collection<ChatMessage>("messages")
        .find({ sessionId: new ObjectId(sessionId) })
        .sort({ createdAt: 1 })
        .toArray();
}
