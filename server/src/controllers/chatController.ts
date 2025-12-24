import type { Request, Response, NextFunction } from 'express'
import type { ChatRequestBody } from '../types/chat.js'
import { processChatMessage } from '../services/chatService.js'
import { logger } from '../utils/logger.js'

export async function chatController(
  req: Request<{}, {}, ChatRequestBody>,
  res: Response,
  next: NextFunction
) {
  try {
    const { message, sessionId } = req.body

    logger.info('Processing chat message', { 
      sessionId: sessionId || 'new', 
      messageLength: message.length 
    })

    const result = await processChatMessage(message, sessionId)
    
    logger.info('Chat message processed successfully', { 
      sessionId: result.sessionId 
    })

    res.json(result)
  } catch (error) {
    logger.error('Error in chatController', error)
    
    next(error)
  }
}