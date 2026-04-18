import React from "react";
import { cn } from "@/lib/utils";
import { User, Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import 'katex/dist/katex.min.css';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
}

// KaTeX options to handle more symbols and behaviors
const katexOptions = {
  throwOnError: false,     // Don't throw on parse errors
  output: 'html',          // Output format
  strict: false,           // Tolerant parsing mode
  trust: true,             // Allow all commands
  macros: {                // Common macro definitions
    "\\boxed": "\\bbox[border: 1px solid #60a5fa; padding: 0.15em 0.3em; border-radius: 4px; background-color: rgba(59, 130, 246, 0.1);]{#1}",
  },
  displayMode: true,       // Default to display mode for better appearance
  fleqn: false,            // Center equations
  leqno: false,            // Right-aligned equation numbers
  minRuleThickness: 0.08,  // Slightly thicker rules for better visibility
  maxSize: 10,             // Limit size to prevent overflow
  maxExpand: 1000,         // Allow more macro expansions
};

// Preprocess message to fix common LaTeX issues
const preprocessMessage = (message: string): string => {
  // Fix common LaTeX formatting issues
  return message
    // Fix spacing around steps
    .replace(/## Step (\d+):/g, '\n\n## Step $1:')
    // Fix dimensions formatting with multi-line breaks for clarity
    .replace(/dimensions(?:\s+are|:)([^:]+)Width/g, 'dimensions:\n\nWidth')
    // Add subtle spacing before math blocks
    .replace(/\n\$\$/g, '\n\n$$')
    // Ensure math blocks end with proper spacing
    .replace(/\$\$\n/g, '$$\n\n')
    // Fix common mistakes in LaTeX
    .replace(/\\cdot/g, '\\times')
    .replace(/\\left\\{/g, '\\left\\{')
    .replace(/\\right\\}/g, '\\right\\}');
};

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser }) => {
  // Preprocess non-user messages for better formatting
  const processedMessage = isUser ? message : preprocessMessage(message);
  
  return (
    <div className={cn(
      "flex gap-3 mb-6 last:mb-2 transition-all duration-200 ease-in-out",
      isUser ? "justify-end" : "justify-start"
    )}>
      {!isUser && (
        <div className="flex items-start">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[linear-gradient(135deg,#1a73e8_0%,#34a853_100%)] text-white shadow-[var(--shadow-sm)]">
            <Bot size={18} />
          </div>
        </div>
      )}
      
      <div 
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-3",
          isUser
            ? "rounded-tr-none bg-primary text-white shadow-[var(--shadow-sm)]"
            : "rounded-tl-none border border-border/80 bg-card text-foreground shadow-[var(--shadow-sm)]"
        )}
      >
        {isUser ? (
          <div className="max-w-none break-words text-sm">
            {message}
          </div>
        ) : (
          <div className="max-w-none break-words text-sm ai-message">
            <ReactMarkdown
              remarkPlugins={[remarkMath, remarkGfm]}
              rehypePlugins={[[rehypeKatex, katexOptions]]}
              components={{
                h2: ({node, ...props}) => (
                  <h2 className="step" {...props}/>
                ),
                h3: ({node, ...props}) => (
                  <h3 className="step" {...props}/>
                ),
                p: ({node, ...props}) => <p {...props}/>,
                li: ({node, ...props}) => <li className="sub-point" {...props}/>,
                hr: () => <div className="step-separator" />,
                em: ({node, ...props}) => <em {...props}/>,
                code: ({node, className, children, ...props}) => {
                  const isCodeBlock = /language-(\w+)/.test(className || '');
                  if (isCodeBlock) {
                    return (
                      <pre className="my-3 overflow-x-auto rounded-[1rem] border border-border/80 bg-secondary/55 p-4 text-foreground">
                        <code className={className} {...props}>{children}</code>
                      </pre>
                    );
                  }
                  return (
                    <code className="rounded bg-secondary px-1 py-0.5 text-sm" {...props}>{children}</code>
                  );
                },
                h1: ({node, ...props}) => <h1 {...props}/>,
                h4: ({node, ...props}) => <h4 {...props}/>,
                strong: ({node, ...props}) => <strong className="text-primary" {...props}/>,
                ol: ({node, ...props}) => <ol className="list-decimal pl-6 my-4" {...props}/>,
                ul: ({node, ...props}) => <ul className="list-disc pl-6 my-4" {...props}/>,
              }}
            >
              {processedMessage}
            </ReactMarkdown>
          </div>
        )}
      </div>
      
      {isUser && (
        <div className="flex items-start">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-foreground shadow-[var(--shadow-sm)]">
            <User size={18} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessage; 
