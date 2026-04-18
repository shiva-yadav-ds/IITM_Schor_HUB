/**
 * AI Assistant Utilities
 * 
 * This file contains utility functions for the AI Assistant feature.
 * It handles message formatting, markdown rendering, and other common functions.
 */

import { marked } from 'marked';

/**
 * Message type for the AI Assistant
 */
export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: number;
}

/**
 * Chat type for storing conversations
 */
export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
}

/**
 * Generate a random ID for messages and chats
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

/**
 * Generate a title for a chat based on the first message
 */
export const generateChatTitle = (message: string): string => {
  if (!message) return "New chat";
  
  // Extract first few meaningful words
  const words = message.split(" ");
  const title = words.slice(0, 3).join(" ");
  return title.length > 20 ? title.substring(0, 20) + "..." : title;
};

/**
 * Format message text with Markdown
 */
export const formatMessage = (text: string): string => {
  // Replace ** with strong tags for bold text
  let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Replace * with em tags for italic text
  formattedText = formattedText.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Replace ```code``` blocks with pre/code tags
  formattedText = formattedText.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
  
  // Replace `code` with code tags
  formattedText = formattedText.replace(/`(.*?)`/g, '<code>$1</code>');
  
  // Replace line breaks with <br>
  formattedText = formattedText.replace(/\n/g, '<br>');
  
  return formattedText;
};

/**
 * Filter out any references to the AI Assistant page
 * Since the user is already on the AI Assistant page
 */
export const filterAIAssistantPageReferences = (text: string): string => {
  if (!text) return text;
  
  // List of patterns to filter out
  const patterns = [
    /For detailed problem-solving, try our "?AI Assistant"? page.*/gi,
    /For (more|detailed) (assistance|help|information|details), (please )?(visit|check|use|go to|head to|try) (the |our )?"?AI Assistant"? page.*/gi,
    /For (complex|technical|detailed) (questions|queries|issues|problems), (please )?(use|visit|check|refer to) (the |our )?"?AI Assistant"? page.*/gi,
    /You can also (try|use|visit|check) (the |our )?"?AI Assistant"? page.*/gi,
    /I recommend (using|trying|checking) (the |our )?"?AI Assistant"? page.*/gi,
    /For (better|more comprehensive|detailed|in-depth) (help|assistance|support|responses), (please )?(use|visit|check) (the |our )?"?AI Assistant"? page.*/gi,
    /The "?AI Assistant"? (page |)(can|could|will|would) (help|assist|provide) (you |)(with|in) (this|that|more detail).*/gi,
    /You'll find (more|better|detailed) (help|answers|solutions|assistance) (in|on|at) (the |our )?"?AI Assistant"? page.*/gi,
    /Our "?AI Assistant"? (page |)(is designed|is built|is made|exists|is available) (to|for) (handle|help with|assist with|support) (these|such|complex|detailed) (questions|issues|problems|queries).*/gi,
    /For (this|that|such|these) (kind of|type of|sorts of) (questions|queries|problems|issues), (please )?(use|visit|check) (the |our )?"?AI Assistant"? page.*/gi,
    // Add general catch-all pattern for any remaining mentions
    /.*visit.*AI Assistant.*page.*/gi,
    /.*check.*AI Assistant.*page.*/gi,
    /.*use.*AI Assistant.*page.*/gi,
    /.*try.*AI Assistant.*page.*/gi,
    /.*go to.*AI Assistant.*page.*/gi,
    /.*navigate to.*AI Assistant.*page.*/gi,
    /.*open.*AI Assistant.*page.*/gi,
    // Final catch-all for any sentence containing AI Assistant
    /.*AI Assistant.*page.*/gi,
  ];
  
  // Apply each pattern
  let filteredText = text;
  patterns.forEach(pattern => {
    filteredText = filteredText.replace(pattern, '');
  });
  
  // Remove any sentences that end with AI Assistant
  filteredText = filteredText.replace(/[^.!?]*AI Assistant[^.!?]*[.!?]/g, '');
  
  // Remove sentences that end with AI Assistant page
  filteredText = filteredText.replace(/[^.!?]*AI Assistant page[^.!?]*[.!?]/g, '');
  
  // Clean up any resulting double spaces or line breaks
  filteredText = filteredText.replace(/\s+/g, ' ').trim();
  filteredText = filteredText.replace(/\n\s*\n/g, '\n').trim();
  
  return filteredText || "I'm not sure how to help with that. Could you provide more details?";
};

/**
 * Detect if text is in Hinglish (mix of Hindi and English)
 */
export const isHinglish = (text: string): boolean => {
  // Common Hinglish words and patterns
  const hinglishPatterns = [
    /kya/i, /hai/i, /kaise/i, /aap/i, /main/i, /hum/i, /tum/i, 
    /mujhe/i, /hamara/i, /tumhara/i, /karna/i, /ho/i, /raha/i, 
    /gaya/i, /chahiye/i, /nahi/i, /matlab/i, /samajh/i, /batao/i
  ];
  
  // Check for Devanagari characters mixed with Latin
  const hasDevanagari = /[\u0900-\u097F]/.test(text);
  const hasLatin = /[a-zA-Z]/.test(text);
  
  // If both Devanagari and Latin are present, it's likely Hinglish
  if (hasDevanagari && hasLatin) {
    return true;
  }
  
  // Check for common Hinglish words
  return hinglishPatterns.some(pattern => pattern.test(text));
};

/**
 * Generate system prompt for the AI Assistant
 */
export const generateSystemPrompt = (userUsesHinglish: boolean, wantsDetailedInfo: boolean): string => {
  return `
You are an AI assistant for the IITM Scholar Hub app. Be helpful, concise, and friendly.

CONVERSATION MEMORY:
- Remember the last 3+ messages in the conversation for context.
- Refer back to previous messages when relevant.

RESPONSE GUIDELINES:
- Keep responses under 40 words unless specifically asked for more detail.
- If asked for detailed information (when user says "Tell me in detail" or similar), provide:
  * Point-wise answers
  * Bold text for important parts (headings, formulas)
  * Clearly show mathematical operations

ABILITIES:
- Solve math problems and statistics questions step-by-step
- Help with programming in various languages
- Assist with English grammar and writing
- Answer conceptual questions about academic subjects

LANGUAGE:
- ${userUsesHinglish ? 'User is communicating in Hinglish (Hindi-English mix). Respond in Hinglish too.' : 'Respond in English'}
- Be conversational and occasionally humorous where appropriate

IMPORTANT:
- You are already in the AI Assistant page, so don't suggest visiting it.
- Always be direct and concise unless detailed explanation is requested.
- Never use technical jargon unless the user appears technical.
- Never apologize for not having certain capabilities.

FORMATTING:
- Use **bold** for important information
- Use point-form lists for multiple items
- Use proper formatting for code snippets
  `;
}; 