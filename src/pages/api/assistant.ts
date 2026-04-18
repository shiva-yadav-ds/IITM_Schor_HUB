import { NextApiRequest, NextApiResponse } from 'next';

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_API_KEY = "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";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://iitm-scholar-hub.vercel.app/',
        'X-Title': 'IITM Scholar Hub'
      },
      body: JSON.stringify({
        ...req.body,
        model: "meta-llama/llama-4-maverick",
        stream: false
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'API request failed');
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: 'Failed to process request',
      details: (error as Error).message 
    });
  }
} 