import fetch from 'node-fetch';

// OpenRouter API endpoint configuration
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

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

  // Check if API key is available
  if (!OPENROUTER_API_KEY) {
    console.error('API key is missing');
    return res.status(500).json({ 
      error: 'Server configuration error', 
      message: 'API key is not configured properly'
    });
  }

  try {
    const { messages, max_tokens, temperature } = req.body;
    
    console.log('Received request:', { 
      messageCount: messages?.length, 
      max_tokens, 
      temperature 
    });

    // Make request to OpenRouter API for deepseek-coder
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://iitm-scholar-hub.vercel.app',
        'X-Title': 'IITM Scholar Hub'
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-coder:latest", // Using DeepSeek Coder model
        messages: messages,
        max_tokens: max_tokens || 1000,
        temperature: temperature || 0.3
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
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Server error:', error.message);
    return res.status(500).json({ 
      error: 'Failed to get response from the AI model',
      message: error.message
    });
  }
} 