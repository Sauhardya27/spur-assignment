const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';
const MESSAGE_URL = `${API_BASE_URL}/chat/message`;

export async function sendMessage(message: string, sessionId?: string) {
  const res = await fetch(MESSAGE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, sessionId })
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.error || 'Failed to send message')
  }

  return res.json()
}