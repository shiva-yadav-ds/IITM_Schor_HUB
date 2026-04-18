import fetch from 'node-fetch';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

async function testOpenRouterApi() {
  const apiKey = process.env.OPENROUTER_API_KEY;
  
  console.log('Testing OpenRouter API connection...');
  console.log(`API Key starts with: ${apiKey.substring(0, 10)}...`);
  
  try {
    const response = await fetch('https://openrouter.ai/api/v1/models', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });
    
    if (response.ok) {
      const models = await response.json();
      console.log('API connection successful! Available models:');
      models.data.forEach(model => {
        console.log(`- ${model.id}`);
      });
      
      // Test if the deepseek-coder model is available
      const deepseekModel = models.data.find(model => model.id.includes('deepseek'));
      if (deepseekModel) {
        console.log(`\nDeepSeek model found: ${deepseekModel.id}`);
      } else {
        console.log('\nNo DeepSeek model found in available models.');
      }
      
      return true;
    } else {
      const errorData = await response.text();
      console.error('API Error:', errorData);
      console.error('Status:', response.status);
      return false;
    }
  } catch (error) {
    console.error('Connection Error:', error.message);
    return false;
  }
}

testOpenRouterApi().then(success => {
  if (success) {
    console.log('\nTest completed successfully.');
  } else {
    console.log('\nTest failed. Please check your API key and connection.');
  }
}); 