// services/chat.ts

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export const chatService = {
  chat: async (messages: ChatMessage[]) => {
    const response = await fetch('http://localhost:8000/chat', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Server Error: ${response.status} - ${text}`);
    }

    const data = await response.json();
    return data.message;
  },
};
