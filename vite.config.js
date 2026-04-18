import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/chat-widget': 'http://localhost:8081',
      '/api/assistant': 'http://localhost:8081',
      '/health': 'http://localhost:8081'
    }
  }
}); 