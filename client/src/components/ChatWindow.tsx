import { useEffect, useRef } from 'react'
import ChatMessage from './ChatMessage'
import TypingIndicator from './TypingIndicator'
import type { Message } from '../types/chat'

export default function ChatWindow({ messages, loading }: {
  messages: Message[]
  loading: boolean
}) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, loading])

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
      {messages.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center h-full text-center p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome to Support Chat
          </h3>
          <p className="text-gray-600 mb-6">
            Ask me anything about our store policies, shipping, returns, or support hours!
          </p>
          <div className="bg-white rounded-lg p-4 shadow-sm space-y-2 max-w-sm">
            <div className="text-xs font-semibold text-gray-500 uppercase mb-3">
              Try asking:
            </div>
            <div className="text-sm text-blue-600 bg-blue-50 rounded-lg p-2 hover:bg-blue-100 transition-colors">
              "What's your return policy?"
            </div>
            <div className="text-sm text-blue-600 bg-blue-50 rounded-lg p-2 hover:bg-blue-100 transition-colors">
              "Do you ship internationally?"
            </div>
            <div className="text-sm text-blue-600 bg-blue-50 rounded-lg p-2 hover:bg-blue-100 transition-colors">
              "What are your support hours?"
            </div>
          </div>
        </div>
      )}
      
      {messages.map(m => (
        <ChatMessage key={m.id} message={m} />
      ))}
      
      {loading && <TypingIndicator />}
      <div ref={messagesEndRef} />
    </div>
  )
}