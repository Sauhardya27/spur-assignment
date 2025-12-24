import type { Request, Response } from 'express'
import { getMessages } from '../repositories/messageRepo.js'

export async function getHistoryController(
  req: Request,
  res: Response
) {
  try {
    const { sessionId } = req.params
    
    if (!sessionId) {
      return res.status(400).json({ error: 'sessionId is required' })
    }

    const messages = await getMessages(sessionId)
    res.json({ messages, sessionId })
  } catch (error) {
    throw error
  }
}