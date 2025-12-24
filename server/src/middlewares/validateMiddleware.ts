import type { Request, Response, NextFunction } from 'express'
import { truncate } from '../utils/truncate.js'
import { env } from '../config/env.js'

export function validateChatRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { message } = req.body

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({
      error: 'Message must be a non-empty string.'
    })
  }

  if (message.length > env.maxLength) {
    req.body.message = truncate(message, env.maxLength)
  }

  next()
}