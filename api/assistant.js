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
    const { messages, max_tokens, temperature } = req.body;
    
    console.log('Received assistant request:', { 
      messageCount: messages?.length, 
      max_tokens, 
      temperature 
    });

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ 
        error: 'Invalid request format',
        details: 'Expected messages array'
      });
    }

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
        model: "meta-llama/llama-4-maverick",
        messages: messages,
        max_tokens: max_tokens || 500,
        temperature: temperature || 0.7,
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
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Assistant API error:', error.message);
    // Detailed error response
    const errorResponse = {
      error: 'Failed to get response from AI service',
      details: error.message,
      status: 500
    };
    
    return res.status(500).json(errorResponse);
  }
} 