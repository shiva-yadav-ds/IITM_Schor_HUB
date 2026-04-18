import fetch from 'node-fetch';

// OpenRouter API endpoint configuration
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_API_KEY = "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";

export default async function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;

    console.log('Received chat-widget request:', {
      messageCount: messages?.length
    });

    if (!messages || !Array.isArray(messages)) {
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

    // Make request to OpenRouter API
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://iitm-scholar-hub.vercel.app/',
        'X-Title': 'IITM Scholar Hub'
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3-70b-instruct",
        messages: enhancedMessages,
        max_tokens: 250,
        temperature: 0.7,
        top_p: 0.9,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stream: false
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('API error:', errorData);
      console.error('Status:', response.status);
      throw new Error(`API responded with status ${response.status}`);
    }

    const data = await response.json();
    console.log('API response received');

    // Return the response with the desired format for ChatWidget
    const responseData = {
      response: data.choices[0].message.content,
      choices: data.choices
    };

    return res.status(200).json(responseData);
  } catch (error) {
    console.error('Chat Widget API error:', error.message);

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

    return res.status(200).json(mockResponse);
  }
} 