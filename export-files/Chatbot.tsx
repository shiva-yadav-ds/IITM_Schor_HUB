
import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import PageHeader from "@/components/PageHeader";
import MainLayout from "@/components/MainLayout";
import ChatMessage from "@/components/ChatMessage";
import { Separator } from "@/components/ui/separator";
import { useLocation, useNavigate } from "react-router-dom";

interface Message {
  text: string;
  isUser: boolean;
  timestamp?: number;
}

const Chatbot = () => {
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi! I'm your IITM app assistant. How can I help you today?",
      isUser: false,
      timestamp: Date.now()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<Message[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chatboxRef = useRef<HTMLDivElement>(null);

  // OpenRouter API configuration
  const API_URL = "https://openrouter.ai/api/v1/chat/completions";
  const API_KEY = "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";

  const scrollToBottom = () => {
    // Only scroll the messages area, not the whole page
    if (messagesEndRef.current) {
      const chatContainer = document.querySelector('.messages-container');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle initial focus and scroll when component mounts or location changes
  useEffect(() => {
    // Check if we're coming from a navbar click
    const isFromNavbar = location.state?.fromNavbar;

    if (isFromNavbar && chatboxRef.current) {
      // Smooth scroll to the chatbox
      chatboxRef.current.scrollIntoView({ behavior: "smooth" });
      // Focus on input field after scrolling
      setTimeout(() => inputRef.current?.focus(), 500);
    } else if (chatContainerRef.current) {
      // Just focus the input field without scrolling the page
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [location]);

  // Add a global click handler to prevent page scrolling when clicking inside the chat
  useEffect(() => {
    const handleChatClick = (e: MouseEvent) => {
      // Check if the click is inside the chat container
      const chatContainer = document.querySelector('.messages-container');
      const inputContainer = document.querySelector('.input-container');

      if ((chatContainer && chatContainer.contains(e.target as Node)) ||
        (inputContainer && inputContainer.contains(e.target as Node))) {
        // Prevent event propagation to avoid page scrolling
        e.stopPropagation();
      }
    };

    // Add the event listener
    document.addEventListener('click', handleChatClick, true);

    // Clean up
    return () => {
      document.removeEventListener('click', handleChatClick, true);
    };
  }, []);

  // Function to detect if text is in Hinglish
  const isHinglish = (text: string): boolean => {
    // Common Hinglish words and patterns
    const hinglishPatterns = [
      /kya/i, /hai/i, /kaise/i, /aap/i, /main/i, /hum/i, /tum/i,
      /mujhe/i, /hamara/i, /tumhara/i, /karna/i, /ho/i, /raha/i,
      /gaya/i, /chahiye/i, /nahi/i, /matlab/i, /samajh/i, /batao/i
    ];

    return hinglishPatterns.some(pattern => pattern.test(text));
  };

  // Function to clear chat history
  const clearChat = () => {
    setMessages([
      {
        text: "Hi! I'm your IITM app assistant. How can I help you today?",
        isUser: false,
        timestamp: Date.now()
      }
    ]);
    setConversationHistory([]);
    toast({
      title: "Chat cleared",
      description: "Your conversation history has been cleared."
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    // Add user message
    const userMessage = input.trim();
    const newUserMessage = { text: userMessage, isUser: true, timestamp: Date.now() };

    // Update messages state with the new user message
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      // Keep track of conversation history (last 4 messages)
      const recentMessages = [...conversationHistory, newUserMessage].slice(-4);
      setConversationHistory(recentMessages);

      // Detect if user is using Hinglish
      const userUsesHinglish = isHinglish(userMessage);

      // Prepare context for the chatbot
      const context = `
You are an AI assistant for the IITM Scholar Hub app. Be helpful, concise, and friendly.

About the app features:
1. End Term Marks Predictor: Uses IITM formula T = 0.1GAA + 0.2Quiz1 + 0.3Quiz2 + 0.4EndTerm. GAA is from weekly assignments, Quiz1 and Quiz2 are quiz scores, EndTerm is final exam. Passing criteria is 40%.
2. Grade Calculator: Uses IITM grading (A=10, B=9, C=8, D=7, E=6, F=0). CGPA = Sum of (Course Credit × Grade Point) / Total Credits.
3. Quiz Platform: Practice with course-specific questions, timed quizzes, and performance tracking.

You can solve questions related to:
- Mathematics (algebra, calculus, statistics, probability)
- Programming (Python, Java, C++, JavaScript)
- Data Science concepts
- English grammar and writing
- Computer Science theory

IMPORTANT INSTRUCTIONS:
1. ALWAYS keep your responses extremely concise and to the point - no unnecessary explanations.
2. If user communicates in Hinglish, respond in Hinglish. If they use English, respond in English.
3. For math/programming problems, provide direct solutions with minimal steps - just what's needed.
4. Include appropriate humor and light conversation where suitable - be friendly but not excessive.
5. Always reference previous messages and maintain conversation context - make responses relevant.
6. Ask follow-up questions occasionally to show engagement.
7. Respond quickly with fast, efficient answers.
8. Maximum response length should be 100 words - be brief!

Developer: Shiva Yadav, an IITM Student.
      `;

      // Call OpenRouter API
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`,
          "HTTP-Referer": "https://iitm-scholar-hub.vercel.app",
          "X-Title": "IITM Scholar Hub"
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3-70b-instruct",  // Using Llama 3 70B model
          messages: [
            { role: "system", content: context },
            // Include last 4 messages for context/memory
            ...recentMessages.map(m => ({
              role: m.isUser ? "user" : "assistant",
              content: m.text
            })),
            { role: "user", content: userMessage }
          ],
          max_tokens: 250,
          temperature: 0.75
        })
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const botReply = data.choices[0].message.content;

      // Add bot message
      setMessages(prev => [...prev, { text: botReply, isUser: false }]);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to get response from the chatbot. Please try again.",
        variant: "destructive",
      });

      setMessages(prev => [...prev, {
        text: "Sorry, I'm having trouble connecting right now. Please try again later.",
        isUser: false
      }]);
    } finally {
      setIsLoading(false);
      // Focus on input after response
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  return (
    <MainLayout>
      <div className="container py-4" ref={chatContainerRef}>
        <PageHeader
          title="AI Assistant"
          description="Chat with our AI assistant for help with IITM courses and features"
          icon={MessageCircle}
        />

        {/* Anchor point for scrolling */}
        <div id="chatbox" ref={chatboxRef} className="scroll-mt-16"></div>

        {/* Two-column layout: suggestions on left, chatbot on right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Left column: Suggestions */}
          <div className="md:col-span-3 order-2 md:order-1">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 sticky top-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-semibold dark:text-gray-100">What can I help you with?</h3>
              </div>

              <Separator className="my-2" />

              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Solve math problems (algebra, calculus, statistics)</li>
                <li>• Help with programming questions (Python, Java, etc.)</li>
                <li>• Information about IITM courses and grading</li>
                <li>• Explain concepts in data science or computer science</li>
                <li>• English grammar and writing assistance</li>
              </ul>

              <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400">The assistant remembers your recent messages and can respond in Hinglish if you prefer.</p>
              </div>
            </div>
          </div>

          {/* Right column: Chatbot */}
          <div className="md:col-span-9 order-1 md:order-2">
            <Card className="shadow-md sticky top-4">
              <CardContent className="p-0">
                {/* Fixed height chat container */}
                <div className="flex flex-col h-[70vh] md:h-[600px]">
                  {/* Header with clear chat button */}
                  <div className="p-3 border-b flex justify-between items-center bg-gray-50 dark:bg-gray-800 dark:border-gray-700 sticky top-0 z-10">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200">IITM AI Assistant</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearChat}
                      className="text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      <span className="text-xs">Clear chat</span>
                    </Button>
                  </div>

                  {/* Messages area with scroll - only this part should scroll */}
                  <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent messages-container dark:bg-gray-900">
                    {messages.map((message, index) => (
                      <ChatMessage
                        key={index}
                        message={message.text}
                        isUser={message.isUser}
                      />
                    ))}
                    <div ref={messagesEndRef} />

                    {isLoading && (
                      <div className="flex justify-start mb-4">
                        <div className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-4 py-2 rounded-lg rounded-tl-none">
                          <div className="flex space-x-2">
                            <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Fixed input area at bottom - always visible */}
                  <div className="border-t dark:border-gray-700 p-3 bg-white dark:bg-gray-800 sticky bottom-0 z-10 shadow-sm input-container">
                    <form onSubmit={handleSubmit} className="flex gap-2">
                      <Input
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message..."
                        disabled={isLoading}
                        className="flex-1"
                        autoFocus
                      />
                      <Button
                        type="submit"
                        className="bg-[hsl(var(--iitm-blue))] text-white hover:bg-[hsl(var(--iitm-blue))]/90"
                        disabled={isLoading || !input.trim()}
                      >
                        <Send className="h-4 w-4" />
                        <span className="sr-only">Send</span>
                      </Button>
                    </form>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Chatbot;
