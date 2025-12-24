import { GoogleGenerativeAI } from '@google/generative-ai'
import { env } from '../config/env.js'
import { logger } from '../utils/logger.js'

const genAI = new GoogleGenerativeAI(env.geminiApiKey)

const model = genAI.getGenerativeModel({ 
  model: "gemini-2.5-flash", 
  generationConfig: { 
    maxOutputTokens: 300,
    temperature: 0.7 
  }
})

export async function generateReply(prompt: string): Promise<string> {
  try {
    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text() || 'No response generated.'
  } catch (error: any) {
    if (error.status === 429) {
        logger.error('Gemini Rate Limit Hit (Free Tier)')
        return 'I am a bit busy right now. Please wait a moment before messaging again.'
    }
    logger.error('Gemini API error', error)
    return 'Sorry, I am currently unable to respond.'
  }
}