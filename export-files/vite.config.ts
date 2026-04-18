import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 3001,
    proxy: {
      '/chatbot': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, res) => {
            console.log('Proxy error:', err);
            res.writeHead(500, {
              'Content-Type': 'application/json',
            });
            res.end(JSON.stringify({
              error: 'Failed to connect to backend server',
              message: 'The backend server is not running. Please start it with "npm run server"',
              choices: [
                {
                  message: {
                    content: "I'm unable to connect to the AI backend server. Please try again later or refresh the page."
                  }
                }
              ]
            }));
          });
        }
      }
    }
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
