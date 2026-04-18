import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
import axios from 'axios';
import compression from 'express-compression';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// OpenRouter Configuration
const openRouterAxios = axios.create({
  baseURL: 'https://openrouter.ai/api/v1/chat/completions',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer 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',
    'HTTP-Referer': 'https://iitm-scholar-hub.vercel.app/',
    'X-Title': 'IITM Scholar Hub'
  },
  timeout: 15000 // 15 second timeout
});

const app = express();
const PORT = process.env.PORT || 8081;

// Enable response compression for all routes
app.use(compression({ level: 6 })); // Moderate compression level for balance between CPU and size

// Add response caching where appropriate
const cacheTime = 3600; // 1 hour in seconds

// Middleware - Enable CORS for all routes with more options
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', true], // Allow Vite dev server and all origins in development
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
app.use(express.json({ limit: '2mb' })); // Add size limit to prevent abuse

// Log important configurations on server startup
console.log(`Server running on port ${PORT}`);

// Health check endpoint - must come before other routes
app.get('/health', (req, res) => {
  // Cache health check response
  res.set('Cache-Control', `public, max-age=${60}`); // 1 minute cache
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// OPTIONS preflight for CORS
app.options('*', cors());

// ChatWidget endpoint
app.post('/chat-widget', async (req, res) => {
  console.log('Received /chat-widget request');
  console.log('Request body:', JSON.stringify(req.body, null, 2));

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      console.error('Invalid request format: messages array missing or not an array');
      return res.status(400).json({
        error: 'Invalid request format',
        details: 'Expected messages array'
      });
    }

    // Extract the system message
    const systemMessage = messages.find(msg => msg.role === 'system');

    // Create a comprehensive system prompt that includes all the required information
    const enhancedSystemPrompt = `
${systemMessage?.content || 'You are a helpful assistant for the IITM Scholar Hub app.'}

RESPONSE STYLE:
- ALWAYS keep responses under 40 words maximum. Be extremely concise!
- Be conversational, friendly, and occasionally funny
- Engage at the user's level of understanding
- Remember previous 2-3 messages for context

APP FEATURES:
- Resume Generator: Helps create professional resumes with templates
- Grade Calculator: Calculate academic grades using IITM's grading system
- End Term Marks Predictor: Estimates marks based on assignments and quiz scores  
- Learning Roadmaps: Structured learning paths for different careers
- AI Assistant: Detailed help for complex queries

ABOUT CREATOR:
- Name: Shiva Yadav
- Location: Prayagraj, Uttar Pradesh, India
- Field: Data Science

CAREER ADVICE:
- Stay active on GitHub and LinkedIn
- Build a strong portfolio with projects
- Network with professionals in your field
- Continuously learn new skills

IMPORTANT:
- Keep ALL responses under 40 words - this is critical!
- For detailed conversations, recommend the AI Assistant page
`;

    // Replace the original system message with our enhanced one
    const enhancedMessages = messages.map(msg =>
      msg.role === 'system' ? { ...msg, content: enhancedSystemPrompt } : msg
    );

    // Get the last user message
    const lastUserMessage = messages.findLast(msg => msg.role === 'user')?.content || '';

    try {
      // Try OpenRouter API first
      const openRouterRequest = {
        model: "meta-llama/llama-3-70b-instruct",
        messages: enhancedMessages,
        max_tokens: 250,
        temperature: 0.7,
        top_p: 0.9,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stream: false
      };

      console.log('Sending request to OpenRouter with enhanced prompt');

      const response = await openRouterAxios.post('', openRouterRequest);

      console.log('Received response from OpenRouter:', JSON.stringify(response.data, null, 2));

      // Return the response with the desired format for ChatWidget
      const responseData = {
        response: response.data.choices[0].message.content,
        choices: response.data.choices
      };

      console.log('Sending response to client:', JSON.stringify(responseData, null, 2));

      return res.json(responseData);
    } catch (apiError) {
      console.error('Error calling OpenRouter API:', apiError);
      console.log('Falling back to mock response');

      // If API fails, provide a mock response
      const mockResponse = {
        response: `I can help with that! IITM Scholar Hub offers Grade Calculator, End Term Marks Predictor, Resume Builder, and Roadmaps. What interests you?`,
        choices: [{
          message: {
            content: `I can help with that! IITM Scholar Hub offers Grade Calculator, End Term Marks Predictor, Resume Builder, and Roadmaps. What interests you?`,
            role: "assistant"
          },
          finish_reason: "stop",
          index: 0
        }]
      };

      return res.json(mockResponse);
    }
  } catch (error) {
    console.error('Error in Chat Widget endpoint:', error);

    const errorResponse = {
      error: 'Failed to get response from AI service',
      details: error.message || 'Unknown error',
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    };

    console.error('Error response:', errorResponse);

    res.status(500).json(errorResponse);
  }
});

// AI Assistant endpoint
app.post('/api/assistant', async (req, res) => {
  console.log('Received /api/assistant request');

  try {
    const { messages, max_tokens, temperature } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        error: 'Invalid request format',
        details: 'Expected messages array'
      });
    }

    console.log('Sending request to OpenRouter with messages:', JSON.stringify(messages, null, 2));

    // Make the API call to OpenRouter
    const response = await openRouterAxios.post('', {
      model: "meta-llama/llama-4-maverick",
      messages: messages,
      max_tokens: max_tokens || 500,
      temperature: temperature || 0.7,
      top_p: 0.9,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stream: false
    });

    console.log('Received response from OpenRouter:', JSON.stringify(response.data, null, 2));

    // Return the complete response to match the expected format
    res.json(response.data);

  } catch (error) {
    console.error('Error in AI Assistant endpoint:', error);
    console.error('Error response:', error.response?.data);

    // Detailed error response
    const errorResponse = {
      error: 'Failed to get response from AI service',
      details: error.response?.data?.error?.message || error.message,
      status: error.response?.status || 500
    };

    res.status(errorResponse.status).json(errorResponse);
  }
});

// Basic route to confirm server is running
app.get('/', (req, res) => {
  // Cache homepage response
  res.set('Cache-Control', `public, max-age=${cacheTime}`);
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>IITM Scholar Hub - Server</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
          h1 { color: #3b82f6; }
          .status { background-color: #f0f9ff; border-left: 4px solid #3b82f6; padding: 10px 15px; margin: 20px 0; }
          code { background: #f1f1f1; padding: 2px 5px; border-radius: 3px; font-family: monospace; }
        </style>
      </head>
      <body>
        <h1>IITM Scholar Hub Server</h1>
        <div class="status">Server Status: Running</div>
        <p>This is the backend server for the IITM Scholar Hub application.</p>
        <p>The following API endpoints are available:</p>
        <ul>
          <li><code>/chatbot</code> - POST endpoint for AI chat functionality</li>
          <li><code>/chat-widget</code> - POST endpoint for floating chat widget</li>
          <li><code>/api/assistant</code> - POST endpoint for AI Assistant page</li>
          <li><code>/health</code> - GET endpoint for server health check</li>
        </ul>
        <p>If you're seeing this page, the server is running correctly.</p>
      </body>
    </html>
  `);
});

// Handle other routes to avoid dist/index.html errors - MOVED TO END
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested endpoint does not exist'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
}); 