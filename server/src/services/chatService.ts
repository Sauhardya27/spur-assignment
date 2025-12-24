import { v4 as uuid } from 'uuid'
import type { ChatResponseBody, ChatMessage } from '../types/chat.js'
import { createConversation } from '../repositories/conversationRepo.js'
import { saveMessage, getMessages } from '../repositories/messageRepo.js'
import { getFaqContext } from './faqService.js'
import { generateReply } from './llmService.js'
import { logger } from '../utils/logger.js'

export async function processChatMessage(
  messageText: string,
  sessionId?: string
): Promise<ChatResponseBody> {
  try {
    const conversationId = sessionId ?? uuid()

    if (!sessionId) {
      await createConversation(conversationId)
    }

    const userMessage: ChatMessage = {
      id: uuid(),
      conversationId,
      sender: 'user',
      text: messageText,
      createdAt: new Date().toISOString()
    }

    await saveMessage(userMessage)

    const history = await getMessages(conversationId)

    const prompt = `
You are a helpful support agent for a small e-commerce store.

${getFaqContext()}

Conversation:
${history.map(h => `${h.sender}: ${h.text}`).join('\n')}
`

    const replyText = await generateReply(prompt)

    const aiMessage: ChatMessage = {
      id: uuid(),
      conversationId,
      sender: 'ai',
      text: replyText,
      createdAt: new Date().toISOString()
    }

    await saveMessage(aiMessage)

    return {
      reply: replyText,
      sessionId: conversationId
    }
  } catch (error) {
    logger.error('Error processing chat message', error)
    throw new Error('Failed to process message')
  }
}