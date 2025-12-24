import type { Message } from '../types/chat'
import Markdown from 'react-markdown'

export default function ChatMessage({ message }: { message: Message }) {
  const isUser = message.sender === 'user'

  return (
    <div className={`flex mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[70%] rounded-2xl px-4 py-3 shadow-sm ${
        isUser 
          ? 'bg-blue-600 text-white rounded-br-sm' 
          : 'bg-white text-gray-800 rounded-bl-sm'
      }`}>
        <div className="text-sm leading-relaxed wrap-break-word">
          <Markdown>{message.text}</Markdown>
        </div>
        <div className="text-xs mt-1 opacity-70">
          {new Date(message.timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
    </div>
  )
}