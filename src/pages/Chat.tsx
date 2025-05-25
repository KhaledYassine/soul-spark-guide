
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ChatMessage from '@/components/ChatMessage';
import ChatList from '@/components/ChatList';
import { useChat } from '@/contexts/ChatContext';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, ArrowLeft, List } from 'lucide-react';

const Chat: React.FC = () => {
  const { currentSession, chatSessions, sendMessage, createNewSession, switchToSession, isLoading } = useChat();
  const [inputValue, setInputValue] = useState('');
  const [showChatList, setShowChatList] = useState(!currentSession);
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading || !currentSession) return;
    
    const messageText = inputValue;
    setInputValue('');
    await sendMessage(messageText);
  };

  const handleNewChat = () => {
    createNewSession();
    setShowChatList(false);
  };

  const handleSelectChat = (chatId: string) => {
    switchToSession(chatId);
    setShowChatList(false);
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentSession?.messages]);

  // Auto-create first session if none exist
  useEffect(() => {
    if (chatSessions.length === 0) {
      createNewSession();
    }
  }, []);

  if (showChatList) {
    return (
      <div className="flex flex-col h-screen bg-gradient-to-b from-mental-lightGray to-white">
        <header className="p-4 flex justify-between items-center border-b bg-white">
          <Button variant="ghost" onClick={() => navigate('/home')} className="px-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Chats</h1>
          <div className="w-8"></div>
        </header>
        
        <main className="flex-1 p-4">
          <ChatList 
            chatSessions={chatSessions.map(session => ({
              id: session.id,
              title: session.title,
              lastMessage: session.messages[session.messages.length - 1]?.content || '',
              timestamp: session.lastActivity,
            }))}
            onSelectChat={handleSelectChat}
            onNewChat={handleNewChat}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-mental-lightGray to-white">
      <header className="p-4 flex justify-between items-center border-b bg-white">
        <Button variant="ghost" onClick={() => setShowChatList(true)} className="px-2">
          <List className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold">Assistant Chat</h1>
        <Button variant="ghost" onClick={() => navigate('/home')} className="px-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </header>
      
      <main className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          {currentSession?.messages.map((message) => (
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
            <MessageSquare className="h-5 w-5" />
          </Button>
        </form>
      </footer>
    </div>
  );
};

export default Chat;
