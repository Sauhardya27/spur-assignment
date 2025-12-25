import { useState, useEffect } from 'react'
import type { Message } from '../types/chat'
import { sendMessage } from '../api/chatApi'
import { getSessionId, setSessionId } from '../utils/session'

const API_BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:4000" : "/chat";
const HISTORY_URL = `${API_BASE_URL}/history`

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [sessionId, setSession] = useState<string | undefined>(
    getSessionId() || undefined
  )
  const [historyLoaded, setHistoryLoaded] = useState(false)

  
  useEffect(() => {
    async function loadHistory() {
      if (!sessionId || historyLoaded) return
      
      try {
        const response = await fetch(`${HISTORY_URL}/${sessionId}`)
        if (response.ok) {
          const data = await response.json()
          if (data.messages && data.messages.length > 0) {
            
            const formattedMessages: Message[] = data.messages.map((msg: any) => ({
              id: msg.id || crypto.randomUUID(),
              sender: msg.sender,
              text: msg.text,
              timestamp: msg.createdAt || new Date().toISOString()
            }))
            setMessages(formattedMessages)
          }
        }
      } catch (error) {
        console.error('Failed to load history:', error)
      } finally {
        setHistoryLoaded(true)
      }
    }

    loadHistory()
  }, [sessionId, historyLoaded])

  async function handleSend(text: string) {
    if (!text.trim()) return

    setLoading(true)

    const userMsg: Message = {
      id: crypto.randomUUID(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMsg])

    try {
      const res = await sendMessage(text.trim(), sessionId)
      
      if (res.sessionId) {
        setSession(res.sessionId)
        setSessionId(res.sessionId)
      }

      const aiMsg: Message = {
        id: crypto.randomUUID(),
        sender: 'ai',
        text: res.reply,
        timestamp: new Date().toISOString()
      }

      setMessages(prev => [...prev, aiMsg])
    } catch (error) {
      console.error('Chat error:', error)
      
      const errorMsg: Message = {
        id: crypto.randomUUID(),
        sender: 'ai',
        text: 'Sorry, I encountered an error processing your message. Please try again.',
        timestamp: new Date().toISOString()
      }
      
      setMessages(prev => [...prev, errorMsg])
    } finally {
      setLoading(false)
    }
  }

  return { messages, loading, handleSend, sessionId }
}