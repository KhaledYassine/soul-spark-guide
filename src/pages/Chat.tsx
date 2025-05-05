
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ChatMessage from '@/components/ChatMessage';
import { useChat } from '@/contexts/ChatContext';
import { useNavigate } from 'react-router-dom';
import { messageSquare } from 'lucide-react';

const Chat: React.FC = () => {
  const { messages, sendMessage, isLoading } = useChat();
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    
    const messageText = inputValue;
    setInputValue('');
    await sendMessage(messageText);
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-mental-lightGray to-white">
      <header className="p-4 flex justify-between items-center border-b bg-white">
        <Button variant="ghost" onClick={() => navigate('/home')} className="px-2">
          &larr;
        </Button>
        <h1 className="text-xl font-semibold">Assistant Chat</h1>
        <div className="w-8"></div> {/* Spacer for alignment */}
      </header>
      
      <main className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              content={message.content}
              isUser={message.role === 'user'}
              timestamp={message.timestamp}
            />
          ))}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="flex space-x-2 bg-gray-100 rounded-2xl px-4 py-3 rounded-tl-none">
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse"></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>
      
      <footer className="p-3 border-t bg-white">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2 max-w-3xl mx-auto">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="mental-input flex-1"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            disabled={!inputValue.trim() || isLoading}
            className="bg-mental-purple hover:bg-mental-darkPurple text-white"
          >
            <messageSquare className="h-5 w-5" />
          </Button>
        </form>
      </footer>
      
      {/* Navigation Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2">
        <nav className="flex justify-around">
          <Button variant="ghost" className="flex flex-col items-center py-1 text-gray-500" onClick={() => navigate('/home')}>
            <span>Home</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center py-1 text-mental-purple">
            <span>Chat</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center py-1 text-gray-500">
            <span>Profile</span>
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default Chat;
