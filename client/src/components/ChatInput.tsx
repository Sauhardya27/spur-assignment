import { useState } from 'react'
import { MAX_MESSAGE_LENGTH } from '../constants/constants'

export default function ChatInput({ onSend, disabled }: {
  onSend: (text: string) => void
  disabled: boolean
}) {
  const [text, setText] = useState('')

  function submit() {
    const trimmed = text.trim()
    if (!trimmed || disabled) return
    
    if (trimmed.length > MAX_MESSAGE_LENGTH) {
      alert(`Message too long. Maximum ${MAX_MESSAGE_LENGTH} characters allowed.`)
      return
    }
    
    onSend(trimmed)
    setText('')
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  return (
    <div className="flex gap-2 p-4 bg-white border-t border-gray-200">
      <input
        className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
        placeholder="Type your message..."
        value={text}
        disabled={disabled}
        onChange={e => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        maxLength={MAX_MESSAGE_LENGTH}
      />
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
        onClick={submit}
        disabled={disabled || !text.trim()}
      >
        Send
      </button>
    </div>
  )
}