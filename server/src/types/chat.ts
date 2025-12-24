export type Sender = 'user' | 'ai'

export interface ChatMessage {
  id: string
  conversationId: string
  sender: Sender
  text: string
  createdAt: string
}

export interface Conversation {
  id: string
  createdAt: string
}

export interface ChatRequestBody {
  message: string
  sessionId?: string
}

export interface ChatResponseBody {
  reply: string
  sessionId: string
}