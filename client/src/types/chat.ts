export type Sender = 'user' | 'ai'

export interface Message {
  id: string
  sender: Sender
  text: string
  timestamp: string
}

export interface ChatResponse {
  reply: string
  sessionId: string
}

export interface ChatRequest {
  message: string
  sessionId?: string
}