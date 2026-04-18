import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, Send, Trash2, Plus, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import MainLayout from "@/components/MainLayout";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";
import ChatMessage from "@/components/ChatMessage";
import { 
  Message, 
  Chat, 
  generateId, 
  generateChatTitle, 
  isHinglish,
  generateSystemPrompt
} from "@/utils/aiAssistant";
import '@/styles/ai-assistant.css';

const AiAssistant = () => {
  const { toast } = useToast();
  
  // State for chat and messages
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  // References
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  // API configuration
  const API_URL = process.env.NODE_ENV === 'development' 
    ? "http://localhost:8081/api/assistant"
    : "/api/assistant";
  const REQUEST_TIMEOUT_MS = 20000;
  
  // Load chats from local storage
  useEffect(() => {
    const savedChats = localStorage.getItem("aiAssistantChats");
    if (savedChats) {
      try {
        const parsedChats = JSON.parse(savedChats);
        setChats(parsedChats);
        
        // If there are chats, set the most recent one as active
        if (parsedChats.length > 0) {
          const sortedChats = [...parsedChats].sort((a, b) => b.createdAt - a.createdAt);
          setActiveChat(sortedChats[0]);
        }
      } catch (e) {
        console.error("Failed to parse saved chats:", e);
      }
    } else {
      // Create a new chat if none exists
      handleNewChat();
    }
  }, []);

  // Save chats to local storage whenever they change
  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem("aiAssistantChats", JSON.stringify(chats));
    }
  }, [chats]);

  // Add and remove body class to disable page scrolling
  useEffect(() => {
    document.body.classList.add('ai-assistant-active');
    
    return () => {
      document.body.classList.remove('ai-assistant-active');
    };
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [activeChat?.messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  // Function to create a new chat
  const handleNewChat = () => {
    const newChat: Chat = {
      id: generateId(),
      title: "New chat",
      messages: [{
        id: generateId(),
        text: "Hi! I'm your AI assistant. How can I help you today?",
        isUser: false,
        timestamp: Date.now()
      }],
      createdAt: Date.now()
    };
    
    setChats(prev => [newChat, ...prev]);
    setActiveChat(newChat);
    setInput("");
    
    // Focus on input field
        setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  };
  
  // Function to handle chat selection
  const handleSelectChat = (chat: Chat) => {
    setActiveChat(chat);
    setInput("");
    
    // Focus on input field
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  };
  
  // Function to delete a chat
  const handleDeleteChat = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    const filteredChats = chats.filter(chat => chat.id !== chatId);
    setChats(filteredChats);
    
    // If the deleted chat was the active one, set the first chat as active or create a new one
    if (activeChat?.id === chatId) {
      if (filteredChats.length > 0) {
        setActiveChat(filteredChats[0]);
      } else {
        handleNewChat();
      }
    }
  };
  
  // Function to clear the current chat
  const clearChat = () => {
    if (!activeChat) return;
    
    const clearedChat: Chat = {
      ...activeChat,
      messages: [{
        id: generateId(),
        text: "Hi! I'm your AI assistant. How can I help you today?",
        isUser: false,
        timestamp: Date.now() 
      }]
    };
    
    setActiveChat(clearedChat);
    setChats(prev => prev.map(chat => 
      chat.id === activeChat.id ? clearedChat : chat
    ));
    
    toast({
      title: "Chat cleared",
      description: "Your conversation has been cleared."
    });
  };

  // Function to auto-resize textarea
  const autoResizeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    setInput(textarea.value);
    
    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = '45px';
    
    // Only expand if content exceeds the default height
    if (textarea.scrollHeight > 45) {
      const newHeight = Math.min(150, textarea.scrollHeight);
      textarea.style.height = `${newHeight}px`;
    }
  };

  /**
   * Function to format messages for better readability
   * - Adds line breaks between steps
   * - Ensures proper LaTeX rendering
   */
  const formatMessageForDisplay = (message: string): string => {
    // Format step headers with line breaks
    let formattedMessage = message
      // Normalize line endings
      .replace(/\r\n/g, '\n')
      // Add proper spacing around step headers
      .replace(/##\s+Step\s+\d+:/g, '\n\n$&\n')
      // Add proper spacing after step headers
      .replace(/(##\s+Step\s+\d+:[^\n]+)\n(?!\n)/g, '$1\n\n')
      // Make sure each step is properly separated
      .replace(/\n(##\s+Step)/g, '\n\n$1')
      
      // Fix common LaTeX notation issues
      .replace(/\\cdot/g, '\\times')
      .replace(/\\left\(/g, '(')
      .replace(/\\right\)/g, ')')
      
      // Make sure block LaTeX is properly formatted with whitespace
      .replace(/\$\$(.*?)\$\$/gs, (match, equation) => {
        // Clean up the equation by removing excessive whitespace
        const cleanEquation = equation.trim().replace(/\s+/g, ' ');
        return `\n\n$$\n${cleanEquation}\n$$\n\n`;
      })
      
      // Ensure inline LaTeX has proper spacing
      .replace(/(\w)(\$[^$\n]+\$)(\w)/g, '$1 $2 $3')
      
      // Format "Therefore" statements as bold and with proper spacing
      .replace(/Therefore/g, '\n\n**Therefore**')
      
      // Fix common dimensionality issues
      .replace(/(width|height|dimensions)(\s*)(=|:)(\s*)([$\\])/gi, (match, term, space1, equals, space2, math) => {
        // Capitalize the first letter of the term and add proper spacing
        return `**${term.charAt(0).toUpperCase() + term.slice(1)}**${equals} ${math}`;
      });
    
    // Clean up any triple+ newlines to double newlines
    formattedMessage = formattedMessage.replace(/\n{3,}/g, '\n\n');
    
    return formattedMessage;
  };

  /**
   * Filter out AI Assistant page references from text
   * and format the response for better readability
   */
  const sanitizeAssistantResponse = (text: string): string => {
    // First, apply our own filtering logic instead of calling the imported function
    let filteredText = text;
    
    // Apply some basic filtering patterns
    const patterns = [
      /For detailed problem-solving, try our "?AI Assistant"? page.*/gi,
      /For (more|detailed) (assistance|help|information|details), (please )?(visit|check|use|go to|head to|try) (the |our )?"?AI Assistant"? page.*/gi,
      /You can also (try|use|visit|check) (the |our )?"?AI Assistant"? page.*/gi,
      /I recommend (using|trying|checking) (the |our )?"?AI Assistant"? page.*/gi,
      /.*AI Assistant.*page.*/gi,
    ];
    
    // Apply each pattern
    patterns.forEach(pattern => {
      filteredText = filteredText.replace(pattern, '');
    });
    
    // Then apply basic content formatting
    filteredText = formatMessageForDisplay(filteredText);
    
    // Special cleanup for LaTeX expressions
    // Format step headers properly
    filteredText = filteredText.replace(/##\s+Step\s+(\d+):/g, (match, stepNum) => {
      return `## Step ${stepNum}:`;
    });
    
    // Fix instances where LaTeX is inside markdown but not properly formatted
    if (filteredText.includes('$') || filteredText.includes('\\')) {
      // Ensure proper spacing for LaTeX blocks
      filteredText = filteredText.replace(/\$\$(.*?)\$\$/gs, (match, content) => {
        return `\n\n$$${content}$$\n\n`;
      });
      
      // Make sure inline LaTeX has proper spacing
      filteredText = filteredText.replace(/(\w)\$(\\\w+)/g, '$1 $$$2');
      filteredText = filteredText.replace(/(\\\w+)\$(\w)/g, '$1$$ $2');
      
      // Ensure proper markdown for lists with LaTeX
      filteredText = filteredText.replace(/-\s*\$\\frac/g, '- $\\frac');
    }

    // Fix common LaTeX mistakes
    filteredText = filteredText.replace(/\\cdot/g, '\\times');
    filteredText = filteredText.replace(/\\left\\{/g, '\\left\\{');
    filteredText = filteredText.replace(/\\right\\}/g, '\\right\\}');
    
    // Improve final answer presentation
    const dimensionSummaryPattern = /(dimensions|final answer|rectangle with maximum area).*(width|height)/i;
    if (dimensionSummaryPattern.test(filteredText) && !filteredText.includes('Therefore')) {
      // Try to extract dimension values
      const widthMatch = filteredText.match(/[Ww]idth\s*=\s*(?:\\frac\{([^}]+)\}\{([^}]+)\}|\\boxed\{([^}]+)\}|([0-9.\\sqrt{}/]+))/);
      const heightMatch = filteredText.match(/[Hh]eight\s*=\s*(?:\\frac\{([^}]+)\}\{([^}]+)\}|\\boxed\{([^}]+)\}|([0-9.\\sqrt{}/]+))/);
      
      if (widthMatch && heightMatch) {
        const widthValue = widthMatch[1] && widthMatch[2] ? `\\frac{${widthMatch[1]}}{${widthMatch[2]}}` : 
                           widthMatch[3] ? widthMatch[3] : widthMatch[4];
        
        const heightValue = heightMatch[1] && heightMatch[2] ? `\\frac{${heightMatch[1]}}{${heightMatch[2]}}` : 
                            heightMatch[3] ? heightMatch[3] : heightMatch[4];
        
        if (widthValue && heightValue) {
          filteredText += `\n\n**Therefore, the dimensions of the rectangle with maximum area are:**\n- Width = $${widthValue}$\n- Height = $${heightValue}$`;
        }
      }
    }
    
    return filteredText;
  };

  const extractServerErrorMessage = async (response: Response): Promise<string | null> => {
    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      try {
        const errorData = await response.json();
        if (typeof errorData?.error === "string") return errorData.error;
        if (typeof errorData?.details === "string") return errorData.details;
        if (typeof errorData?.message === "string") return errorData.message;
      } catch {
        return null;
      }
      return null;
    }

    try {
      const rawText = (await response.text()).trim();
      return rawText ? rawText.slice(0, 200) : null;
    } catch {
      return null;
    }
  };

  const mapHttpErrorToMessage = (status: number, serverMessage?: string | null): string => {
    const fallbackByStatus: Record<number, string> = {
      400: "The request could not be processed. Please rephrase and try again.",
      401: "Authentication failed. Please refresh the page and try again.",
      403: "You don’t have permission to perform this action.",
      404: "Assistant service is currently unavailable. Please try again shortly.",
      408: "The request timed out. Please try again.",
      413: "Your message is too long. Please shorten it and try again.",
      429: "Too many requests right now. Please wait a moment and try again.",
      500: "Server error occurred. Please try again in a few moments.",
      502: "Service is temporarily unavailable. Please retry shortly.",
      503: "Service is currently busy. Please try again shortly.",
      504: "Server took too long to respond. Please try again."
    };

    const genericMessage = "We couldn’t complete your request right now. Please try again.";

    if (serverMessage && !/failed to fetch|network|internal server error/i.test(serverMessage)) {
      return serverMessage;
    }

    return fallbackByStatus[status] || genericMessage;
  };

  const getFriendlyErrorMessage = (err: unknown): string => {
    if (!navigator.onLine) {
      return "You appear to be offline. Check your connection and try again.";
    }

    if (err instanceof DOMException && err.name === "AbortError") {
      return "The request took too long. Please try again.";
    }

    if (err instanceof TypeError) {
      return "Unable to reach the assistant service. Please try again.";
    }

    if (err instanceof Error) {
      if (err.message === "UNREADABLE_RESPONSE") {
        return "The server returned an invalid response. Please try again.";
      }

      return err.message || "Something went wrong. Please try again.";
    }

    return "Something went wrong. Please try again.";
  };

  // Function to handle message submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || !activeChat) return;
    
    // Add user message
    const userMessage: Message = {
      id: generateId(),
      text: input.trim(),
      isUser: true,
      timestamp: Date.now()
    };
    
    // Update chat with user message
    const updatedChat = {
      ...activeChat,
      title: activeChat.messages.length <= 1 ? generateChatTitle(input.trim()) : activeChat.title,
      messages: [...activeChat.messages, userMessage]
    };
    
    setActiveChat(updatedChat);
    setChats(prev => prev.map(chat => 
      chat.id === activeChat.id ? updatedChat : chat
    ));
    
    setInput("");
    setIsLoading(true);
    
    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = '45px';
    }
    
    try {
      // Get the last 4 messages for context
      const recentMessages = updatedChat.messages.slice(-4);
      
      // Detect if user is using Hinglish or asking for detailed info
      const userUsesHinglish = isHinglish(input.trim());
      const wantsDetailedInfo = /detail|step|explain|elaborate|clarify|breakdown/i.test(input.trim());
      
      // Prepare context for the AI Assistant
      const context = generateSystemPrompt(userUsesHinglish, wantsDetailedInfo);
      
      if (!navigator.onLine) {
        throw new Error("You appear to be offline. Check your connection and try again.");
      }

      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

      let response: Response;
      try {
        response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          signal: controller.signal,
          body: JSON.stringify({
            messages: [
              { role: "system", content: context },
              ...recentMessages.map(m => ({
                role: m.isUser ? "user" : "assistant",
                content: m.text
              }))
            ],
            max_tokens: wantsDetailedInfo ? 1000 : 500,
            temperature: 0.7,
            top_p: 0.9,
            frequency_penalty: 0.0,
            presence_penalty: 0.0
          })
        });
      } finally {
        window.clearTimeout(timeoutId);
      }

      if (!response.ok) {
        const serverMessage = await extractServerErrorMessage(response);
        throw new Error(mapHttpErrorToMessage(response.status, serverMessage));
      }

      const contentType = response.headers.get("content-type") || "";
      let data: any;

      if (contentType.includes("application/json")) {
        try {
          data = await response.json();
        } catch {
          throw new Error("UNREADABLE_RESPONSE");
        }
      } else {
        throw new Error("UNREADABLE_RESPONSE");
      }
      
      if (!data.choices?.[0]?.message?.content) {
        console.error('Invalid response format:', data);
        throw new Error("The assistant response was incomplete. Please try again.");
      }
      
      // Get the assistant's response and filter out unnecessary references
      const botReply = sanitizeAssistantResponse(data.choices[0].message.content.trim());
      
      // Add bot message
      const assistantMessage: Message = {
        id: generateId(),
        text: botReply,
        isUser: false,
        timestamp: Date.now()
      };
      
      // Update chat with assistant's response
      const finalChat = {
        ...updatedChat,
        messages: [...updatedChat.messages, assistantMessage]
      };
      
      setActiveChat(finalChat);
      setChats(prev => prev.map(chat => 
        chat.id === activeChat.id ? finalChat : chat
      ));
      
    } catch (error) {
      console.error("Error details:", error);
      
      const errorMessage = getFriendlyErrorMessage(error);
      
      // Add error message to chat
      const errorChat = {
        ...updatedChat,
        messages: [...updatedChat.messages, {
          id: generateId(),
          text: errorMessage,
          isUser: false,
          timestamp: Date.now()
        }]
      };
      
      setActiveChat(errorChat);
      setChats(prev => prev.map(chat => 
        chat.id === activeChat.id ? errorChat : chat
      ));
      
    } finally {
      setIsLoading(false);
      // Focus on input after response
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
        scrollToBottom();
      }, 100);
    }
  };

  // Function to toggle mobile sidebar
  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };
  
  // Close mobile sidebar when a chat is selected
  const handleSelectChatMobile = (chat: Chat) => {
    handleSelectChat(chat);
    setIsMobileSidebarOpen(false);
  };

  return (
    <MainLayout>
      <Helmet>
        <title>AI Assistant & Math Question Solver | IITM Scholar Hub</title>
        <meta name="description" content="Get instant help with math problems, programming, and academic questions. Our free AI Assistant provides step-by-step solutions for calculus, algebra, statistics and more. The perfect math question solver for students." />
        <meta name="keywords" content="free AI assistant, math question solver, free math solver, step by step math solutions, programming help, AI homework helper, IITM AI assistant, free question solver, coding assistant" />
        <meta property="og:title" content="Free AI Assistant & Math Question Solver | IITM Scholar Hub" />
        <meta property="og:description" content="Get instant help with math problems, programming, and academic questions with our free AI Assistant." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="IITM Scholar Hub" />
        <meta property="og:url" content="https://iitm-scholar-hub.vercel.app/ai-assistant" />
        <meta property="og:image" content="https://iitm-scholar-hub.vercel.app/og-image.svg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:title" content="Free AI Assistant & Math Question Solver" />
        <meta name="twitter:description" content="Get instant solutions for math problems, programming, and academic questions." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://iitm-scholar-hub.vercel.app/og-image.svg" />
      </Helmet>
      
      <div className="fixed inset-0 overflow-hidden pt-20">
        <div className="flex flex-col md:flex-row h-full">
          {/* Mobile sidebar overlay */}
          <AnimatePresence>
            {isMobileSidebarOpen && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-black/25 md:hidden"
                onClick={() => setIsMobileSidebarOpen(false)}
              />
            )}
          </AnimatePresence>
          
          {/* Left sidebar with chat history */}
          <AnimatePresence>
            {(isMobileSidebarOpen || !['xs', 'sm'].includes('md')) && (
              <motion.div
                initial={{ x: -280, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -280, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={`${
                  isMobileSidebarOpen ? "fixed left-0 top-16 bottom-0 z-50" : "hidden md:block"
                } h-full shrink-0 border-r border-border/80 bg-card/96 no-scrollbar md:relative md:w-64 lg:w-72`}
              >
            <div className="h-full overflow-hidden flex flex-col">
                  <div className="flex items-center justify-between border-b border-border/80 p-4">
                <h3 className="text-base font-semibold text-foreground">AI Assistant</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleMobileSidebar}
                      className="md:hidden"
                    >
                      <X size={20} />
                    </Button>
              </div>
              
                  <div className="p-3">
                    <Button 
                      onClick={handleNewChat}
                      className="h-10 w-full justify-start text-sm font-normal"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      <span>New Chat</span>
                    </Button>
                      </div>
                  
                  <div className="flex-1 overflow-auto p-3 space-y-2">
                    {chats.map(chat => (
                      <div 
                        key={chat.id} 
                        onClick={() => isMobileSidebarOpen ? handleSelectChatMobile(chat) : handleSelectChat(chat)}
                        className={`p-2 rounded-md cursor-pointer transition-all flex items-center justify-between group chat-history-item ${
                          activeChat?.id === chat.id ? 'active' : ''
                        }`}
                      >
                        <div className="flex items-center space-x-2 truncate">
                          <MessageCircle className="h-4 w-4 shrink-0" />
                          <span className="truncate text-sm">{chat.title}</span>
                      </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-secondary hover:text-foreground"
                          onClick={(e) => handleDeleteChat(chat.id, e)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
              </div>
              
              <div className="mt-auto border-t border-border/80 p-4">
                <Button 
                  variant="outline" 
                  className="h-10 w-full justify-start border-dashed text-sm font-normal"
                  onClick={clearChat}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  <span>Clear conversation</span>
                </Button>
              </div>
            </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Main chat area */}
          <div className="relative flex flex-1 flex-col overflow-hidden rounded-t-[1.75rem] border border-border/80 bg-white/70 shadow-[var(--shadow)] dark:bg-card/92">
            {/* Button to toggle sidebar on mobile */}
            <div className="flex items-center justify-between border-b border-border/80 p-2 md:hidden">
                    <Button
                      variant="outline"
                size="sm"
                className="h-9"
                onClick={toggleMobileSidebar}
                    >
                <Menu className="h-4 w-4 mr-2" />
                <span>Chats</span>
                    </Button>
            </div>
            
            {/* Messages area - this is the only part that should scroll */}
            <div className="messages-container no-scrollbar flex-1 overflow-y-auto bg-transparent px-4 py-4 md:px-6 md:py-6">
              {activeChat?.messages.map((message, index) => (
                <motion.div
                  key={message.id} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-4`}
                >
                  <div className={`flex items-start gap-3 max-w-[80%]`}>
                    {!message.isUser && (
                      <div className="w-2 rounded-full bg-gradient-to-br from-blue-500 to-violet-600"></div>
                    )}
                    
                    <ChatMessage message={message.text} isUser={message.isUser} />
                  </div>
                </motion.div>
              ))}
              
              <div ref={messagesEndRef} />
                    
                    {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start mb-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 rounded-full bg-gradient-to-br from-blue-500 to-violet-600"></div>
                    <div className="rounded-2xl border border-border/80 bg-card px-4 py-3">
                      <div className="flex space-x-2 typing-indicator">
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                      </div>
                          </div>
                        </div>
                </motion.div>
                    )}
                  </div>
                  
            {/* Input area */}
            <div className="input-container sticky bottom-0 z-10 border-t border-border/80 bg-white/88 p-3 shadow-sm backdrop-blur-xl dark:bg-card/92 md:p-4">
              <form onSubmit={handleSubmit} className="flex gap-2 items-end">
                <div className="relative flex-1">
                      <textarea
                        ref={inputRef}
                        value={input}
                        onChange={autoResizeTextarea}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit(e as unknown as React.FormEvent);
                          }
                        }}
                    placeholder="Ask anything..."
                    className="chat-input w-full resize-none rounded-[1.25rem] border border-border/80 bg-background px-4 py-3 pr-12 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25"
                        style={{
                      height: '50px',
                      maxHeight: '150px',
                      overflow: 'auto',
                          lineHeight: '1.5',
                        }}
                        disabled={isLoading}
                      />
                      <Button 
                        type="submit" 
                        size="icon"
                    className={`absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white transition-all duration-200 hover:bg-primary/95 disabled:pointer-events-none disabled:opacity-50 ${input.trim() ? 'send-button-ready' : ''}`}
                        disabled={isLoading || !input.trim()}
                      >
                    <Send size={16} />
                      </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AiAssistant;
