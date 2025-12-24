import "dotenv/config";

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY environment variable is required')
}

export const env = {
  port: Number(process.env.PORT) || 4000,
  geminiApiKey: process.env.GEMINI_API_KEY!,
  maxLength: Number(process.env.MAX_MESSAGE_LENGTH) || 1000,
};