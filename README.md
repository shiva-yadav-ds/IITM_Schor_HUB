# IITM Scholar Hub

A comprehensive toolkit for IIT Madras students offering various academic and career resources.

## Features

- **AI Assistant**: Get instant help with academic questions, programming, math problems, and more.
- **Resume Generator**: Create professional resumes with customizable templates.
- **Grade Calculator**: Calculate your grades with the official IITM grading system.
- **End Term Marks Predictor**: Predict the marks needed in your exams to achieve your target grade.
- **Learning Roadmaps**: Follow detailed roadmaps for data science, programming, and web development.

## Tech Stack

- Frontend: React, TypeScript, Tailwind CSS
- UI Components: Shadcn UI
- Animation: Framer Motion
- State Management: React Context API
- API Integration: OpenRouter (for AI services)

## Installation

```bash
# Clone the repository
git clone https://github.com/shiva-yadav-ds/IITM-SCHOLAR-HUB.git

# Navigate to the project directory
cd IITM-SCHOLAR-HUB

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Usage

After starting the development server, open [http://localhost:3000](http://localhost:3000) in your browser to access the application.

## Deployment

The application is deployed on Vercel: [https://iitm-scholar-hub.vercel.app](https://iitm-scholar-hub.vercel.app)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Created By

Shiva Yadav

## Deployment on Vercel

### Prerequisites
- A Vercel account
- OpenRouter API key

### Environment Variables Setup
When deploying on Vercel, you need to set up the following environment variables:

1. `OPENROUTER_API_KEY`: Your OpenRouter API key

To set up environment variables in Vercel:
1. Go to your project settings in Vercel dashboard
2. Navigate to the "Environment Variables" tab
3. Add the variable `OPENROUTER_API_KEY` with your API key value
4. Deploy or redeploy your application

### Deployment Steps
1. Push your code to a GitHub repository
2. Import your repository to Vercel
3. Set up the environment variables as described above
4. Deploy the application

## Local Development
1. Clone this repository
2. Copy `.env.local.example` to `.env.local` and fill in your API keys
3. Run `npm install`
4. Run `npm run dev` to start the development server

## Features
- Grade Calculator
- End Term Marks Predictor
- Resume Generator
- Quiz Platform
- AI Assistant powered by DeepSeek Coder
- Chat Widget powered by Llama 3.3 70B

## AI Assistant Features

The application includes two AI assistants:

1. **Floating Chat Widget** - Using Llama 3.3 70B via OpenRouter
2. **Scholar Assistant** - Using DeepSeek Coder model via OpenRouter for programming and technical help

## AI Models Used

| Bot | Model | Strength |
|-----|-------|----------|
| ChatWidget | meta-llama/llama-3-70b-instruct | Human-like, helpful guidance |
| Scholar Assistant | deepseek-ai/deepseek-coder:latest | Accurate, powerful coding + math AI |

## Troubleshooting

If you encounter connection issues with the AI Assistant:

1. Check that your OpenRouter API key is valid and properly set in the `.env` file
2. Ensure the backend server is running on port 8080
3. Verify network connectivity to the OpenRouter API
4. Check browser console and server logs for specific error messages#
# IITM_Schor_HUB
