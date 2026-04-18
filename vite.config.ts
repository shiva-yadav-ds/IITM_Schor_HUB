import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ['react', 'react-dom', 'animejs', 'framer-motion', 'lucide-react']
  },
  optimizeDeps: {
    include: [
      'animejs/lib/anime.es.js',
      'react', 
      'react-dom', 
      'react-router-dom',
      'framer-motion',
      'lucide-react',
      '@radix-ui/react-toast',
      '@radix-ui/react-slot',
      'clsx',
      'tailwind-merge'
    ],
    esbuildOptions: {
      target: 'esnext',
      supported: {
        'top-level-await': true
      },
      treeShaking: true
    }
  },
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, res) => {
            console.log('proxy error', err);
            if (res && !res.headersSent) {
              res.writeHead(500, {
                'Content-Type': 'application/json',
              });
              res.end(JSON.stringify({
                error: 'API server connection failed',
                message: 'The API server is not running or is unreachable.',
                choices: [
                  {
                    message: {
                      content: "I'm unable to connect to the API server. Please try again later."
                    }
                  }
                ]
              }));
            }
          });
        }
      },
      '/health': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        rewrite: (path) => path,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, res) => {
            console.log('health check proxy error', err);
            if (res && !res.headersSent) {
              res.writeHead(500, {
                'Content-Type': 'application/json',
              });
              res.end(JSON.stringify({
                status: 'error',
                message: 'Unable to connect to the server'
              }));
            }
          });
        }
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: mode !== 'production',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: true
      }
    },
    assetsDir: 'assets',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/react') || 
              id.includes('node_modules/react-dom') || 
              id.includes('node_modules/react-router-dom')) {
            return 'vendor-react';
          }
          
          if (id.includes('node_modules/@radix-ui') || 
              id.includes('node_modules/framer-motion')) {
            return 'vendor-ui';
          }
          
          if (id.includes('node_modules/animejs') || 
              id.includes('node_modules/clsx') || 
              id.includes('node_modules/tailwind-merge')) {
            return 'vendor-utils';
          }
          
          if (id.includes('node_modules/chart.js') || 
              id.includes('node_modules/react-chartjs-2') ||
              id.includes('node_modules/recharts')) {
            return 'vendor-charts';
          }
          
          if (id.includes('node_modules')) {
            return 'vendor-other';
          }
        }
      }
    },
    cssCodeSplit: true,
    assetsInlineLimit: 4096
  },
  cacheDir: 'node_modules/.vite'
}));
