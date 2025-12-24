import ChatWindow from './components/ChatWindow'
import ChatInput from './components/ChatInput'
import { useChat } from './hooks/useChat'

export default function App() {
  const { messages, loading, handleSend } = useChat()

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col h-150">
        <div className="bg-linear-to-r from-blue-600 to-indigo-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">💬</div>
            <div>
              <h1 className="text-xl font-bold m-0">Customer Support</h1>
              <p className="text-sm text-blue-100 m-0">We're here to help</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Online
          </div>
        </div>
        
        <ChatWindow messages={messages} loading={loading} />
        <ChatInput onSend={handleSend} disabled={loading} />
      </div>
    </div>
  )
}