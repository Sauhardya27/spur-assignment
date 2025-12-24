export default function TypingIndicator() {
  return (
    <div className="flex justify-start mb-4">
      <div className="flex items-center gap-1 bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.1s]"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
      </div>
    </div>
  )
}