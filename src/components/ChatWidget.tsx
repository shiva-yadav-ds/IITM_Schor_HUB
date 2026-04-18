import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, MinusIcon, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import ChatMessage from '@/components/ChatMessage';
import { useLocation } from 'react-router-dom';
import '@/styles/ai-assistant.css';

// Message type definition
interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: number;
}

const CHAT_REQUEST_TIMEOUT_MS = 12000;

class ChatRequestError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = 'ChatRequestError';
    this.status = status;
  }
}

// Generate a unique ID for messages
const generateId = () => {
  return Math.random().toString(36).substring(2, 15);
};

const getChatEndpoints = () => {
  const devServerEndpoint = 'http://localhost:8081/chat-widget';
  const endpoints = process.env.NODE_ENV === 'development'
    ? [devServerEndpoint, '/chat-widget', '/api/chat-widget']
    : ['/chat-widget', '/api/chat-widget'];

  return [...new Set(endpoints)];
};

const fetchWithTimeout = async (url: string, options: RequestInit, timeoutMs: number) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
};

const safeJsonParse = async (response: Response) => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

const getFriendlyErrorMessage = (error: unknown) => {
  if (error instanceof ChatRequestError) {
    if (error.status === 429) return 'Too many requests right now. Please wait a moment and try again.';
    if (error.status === 401 || error.status === 403) return 'Chat service is temporarily restricted. Please try again shortly.';
    if (error.status && error.status >= 500) return 'Chat service is temporarily unavailable. Please try again in a minute.';
    return error.message;
  }

  if (error instanceof DOMException && error.name === 'AbortError') {
    return 'The request timed out. Please check your connection and try again.';
  }

  if (error instanceof TypeError) {
    return 'Unable to connect to chat service. Please check your internet and try again.';
  }

  return 'Something went wrong while sending your message. Please try again.';
};

// ChatWidget component
const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const location = useLocation();
  
  // Initial welcome message based on the current page
  useEffect(() => {
    const isResumePage = location.pathname.includes('resume');
    const welcomeMessage = isResumePage 
      ? "Hi! I can help you create a professional resume. What kind of assistance do you need?" 
      : "Hello! I'm your IITM Scholar Hub assistant. How can I help you today?";
    
    setMessages([{
      id: generateId(),
      text: welcomeMessage,
      isUser: false,
      timestamp: Date.now()
    }]);
  }, [location.pathname]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
      scrollToBottom();
  }, [messages]);

  // Focus input when opening chat
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);
  
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const toggleChat = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsMinimized(false);
    } else {
      if (isMinimized) {
        setIsMinimized(false);
      } else {
        setIsOpen(false);
      }
    }
  };
  
  const minimizeChat = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(true);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading) return;
    
    // Add user message
    const userMessage: Message = {
      id: generateId(),
      text: input.trim(),
      isUser: true,
      timestamp: Date.now()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        throw new ChatRequestError('You are offline. Please connect to the internet and try again.');
      }

      // Determine which API endpoint to use based on current page
      const isResumePage = location.pathname.includes('resume');
      const endpoints = getChatEndpoints();
      
      // Add context about current page
      const contextMessage = isResumePage 
        ? "The user is currently on the Resume Generator page and needs help with creating or improving their resume."
        : `The user is currently on the ${location.pathname === '/' ? 'Home' : location.pathname.replace('/', '')} page of the IITM Scholar Hub.`;
      
      // Get last few messages for context (max 3)
      const recentMessages = [
        ...messages.slice(-3),
        userMessage
      ];

      const requestBody = {
        messages: [
          { role: 'system', content: contextMessage },
          ...recentMessages.map(msg => ({
            role: msg.isUser ? 'user' : 'assistant',
            content: msg.text
          }))
        ]
      };

      let data: any = null;
      let lastError: unknown = null;

      for (const endpoint of endpoints) {
        try {
          const response = await fetchWithTimeout(
            endpoint,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(requestBody)
            },
            CHAT_REQUEST_TIMEOUT_MS
          );

          if (!response.ok) {
            const errorData = await safeJsonParse(response);
            const errorMessage = errorData?.error || errorData?.details || `Request failed with status ${response.status}`;

            if (response.status === 404 || response.status === 405) {
              lastError = new ChatRequestError(errorMessage, response.status);
              continue;
            }

            throw new ChatRequestError(errorMessage, response.status);
          }

          data = await safeJsonParse(response);
          if (!data) {
            throw new ChatRequestError('Invalid response received from chat service.');
          }

          break;
        } catch (requestError) {
          lastError = requestError;
        }
      }

      if (!data) {
        throw (lastError instanceof Error ? lastError : new ChatRequestError('Unable to reach chat service.'));
      }
      
      // Add bot response
      const botResponse = data.response || data.choices?.[0]?.message?.content || "I'm sorry, I couldn't process your request.";
      
      setMessages(prev => [...prev, { 
        id: generateId(),
        text: botResponse,
        isUser: false,
        timestamp: Date.now()
      }]);
      
    } catch (error) {
      console.error('Error:', error);
      const friendlyMessage = getFriendlyErrorMessage(error);

      if (!(error instanceof ChatRequestError) && !(error instanceof TypeError) && !(error instanceof DOMException)) {
        toast({
          title: 'Chat unavailable',
          description: friendlyMessage,
          variant: 'destructive',
        });
      }
      
      // Add error message as a bot message
      setMessages(prev => [...prev, { 
        id: generateId(),
        text: friendlyMessage,
        isUser: false,
        timestamp: Date.now()
      }]);
    } finally {
      setIsLoading(false);
      setTimeout(scrollToBottom, 100);
    }
  };

  return (
    <>
      {/* Chat toggle button */}
        <Button 
        className="fixed right-6 bottom-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-md)] hover:bg-primary/90"
        onClick={toggleChat}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </Button>
      
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 'auto' : '500px',
              width: isMinimized ? '300px' : '350px'
            }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-6 bottom-20 z-50 flex flex-col overflow-hidden rounded-xl border border-border/80 bg-card/95 text-foreground shadow-[var(--shadow-md)] backdrop-blur-xl"
          >
            {/* Chat header */}
            <div className="flex items-center justify-between border-b border-border bg-secondary/70 px-4 py-3">
              <div className="flex items-center gap-2">
                <Bot size={18} className="text-primary" />
                <h3 className="text-sm font-medium">IITM Scholar Hub Assistant</h3>
              </div>
              <div className="flex items-center">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 text-muted-foreground hover:bg-accent hover:text-foreground"
                  onClick={minimizeChat}
                >
                  <MinusIcon size={16} />
                </Button>
            <Button 
              variant="ghost" 
              size="icon" 
                  className="ml-1 h-7 w-7 text-muted-foreground hover:bg-accent hover:text-foreground"
                  onClick={toggleChat}
            >
                  <X size={16} />
            </Button>
          </div>
            </div>
            
            {/* Chat messages */}
            {!isMinimized && (
              <>
                <div className="messages-container flex-1 overflow-y-auto bg-background/55 p-4">
                  {messages.map((message) => (
                    <div key={message.id} className="mb-3">
                      <ChatMessage message={message.text} isUser={message.isUser} />
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                      <div className="flex space-x-1 typing-indicator">
                        <div className="typing-dot" style={{ animationDelay: '-0.32s' }}></div>
                        <div className="typing-dot" style={{ animationDelay: '-0.16s' }}></div>
                        <div className="typing-dot" style={{ animationDelay: '0s' }}></div>
                      </div>
                    </div>
                  )}
                  
                <div ref={messagesEndRef} />
                </div>
                
                {/* Chat input */}
                <form onSubmit={handleSubmit} className="border-t border-border bg-card/95 p-3">
                  <div className="flex items-center gap-2">
                    <input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
                      disabled={isLoading}
                    />
                    <Button 
                      type="submit" 
                      size="icon" 
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                      disabled={isLoading || !input.trim()}
                    >
                      <Send size={14} />
                    </Button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
      )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget; 