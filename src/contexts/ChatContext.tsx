
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatContextType {
  messages: Message[];
  sendMessage: (content: string) => Promise<void>;
  isLoading: boolean;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi there! I'm your mental wellness assistant. How are you feeling today?",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // This is a mock implementation for now
      // In a real app, this would call the OpenRouter API
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock response based on user message
      let responseContent = '';
      if (content.toLowerCase().includes('anxious') || content.toLowerCase().includes('stress')) {
        responseContent = 'I understand feeling stressed can be difficult. Have you tried any breathing exercises or mindfulness techniques today?';
      } else if (content.toLowerCase().includes('happy') || content.toLowerCase().includes('good')) {
        responseContent = "That's wonderful to hear! What specific things have been bringing you joy today?";
      } else if (content.toLowerCase().includes('tired') || content.toLowerCase().includes('exhausted')) {
        responseContent = "I notice you're feeling tired. How has your sleep been lately? Remember that rest is an important part of mental wellness.";
      } else {
        responseContent = "Thank you for sharing. How else can I support your mental wellness today?";
      }
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Handle error - perhaps add an error message to the chat
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage, isLoading }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
