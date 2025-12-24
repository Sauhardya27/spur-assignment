import { db } from '../db/database.js'
import type { Conversation } from '../types/chat.js'

export async function createConversation(id: string): Promise<Conversation> {
  const createdAt = new Date().toISOString()

  await db.run(
    'INSERT INTO conversations (id, created_at) VALUES (?, ?)',
    id,
    createdAt
  )

  return { id, createdAt }
}