const API_BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:4000/chat" : "/chat";
const MESSAGE_URL = `${API_BASE_URL}/message`;

export async function sendMessage(message: string, sessionId?: string) {
  console.log("MESSAGE_URL =", MESSAGE_URL);

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