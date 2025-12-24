import { db } from '../db/database.js'
import type { ChatMessage } from '../types/chat.js'

export async function saveMessage(
  message: ChatMessage
): Promise<void> {
  await db.run(
    `
    INSERT INTO messages 
    (id, conversation_id, sender, text, created_at)
    VALUES (?, ?, ?, ?, ?)
    `,
    message.id,
    message.conversationId,
    message.sender,
    message.text,
    message.createdAt
  )
}

export async function getMessages(
  conversationId: string
): Promise<Pick<ChatMessage, 'sender' | 'text'>[]> {
  return db.all(
    `
    SELECT sender, text
    FROM messages
    WHERE conversation_id = ?
    ORDER BY created_at ASC
    `,
    conversationId
  )
}

export async function getFullMessages(
  conversationId: string
): Promise<Omit<ChatMessage, 'conversationId'>[]> {
  return db.all(
    `
    SELECT id, sender, text, created_at as createdAt
    FROM messages
    WHERE conversation_id = ?
    ORDER BY created_at ASC
    `,
    conversationId
  )
}