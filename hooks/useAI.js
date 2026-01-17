/**
 * useAI Hook
 * Mock AI chat for demo mode
 */

import { useState } from 'react';

export function useAI() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: 'Hello! I am your AI assistant. How can I help you manage your business today?',
      timestamp: new Date()
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);

  const sendMessage = async (content) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    // Simulate AI thinking
    setTyping(true);
    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    // Add AI response
    const aiResponse = {
      id: Date.now() + 1,
      role: 'assistant',
      content: `I understand you're asking about "${content}". In demo mode, I can show you how the AI assistant will help manage your business. Try asking about sales, inventory, or customer insights!`,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, aiResponse]);
    setTyping(false);
    setLoading(false);
  };

  return {
    messages,
    sendMessage,
    loading,
    typing
  };
}

export default useAI;
