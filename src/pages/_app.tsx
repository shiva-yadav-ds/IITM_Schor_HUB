import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '../routes/AppRoutes';
import { ThemeProvider } from '../components/ui/theme-provider';
import { Analytics } from '@vercel/analytics/react';
import '../styles/globals.css';

function App() {
  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);
          })
          .catch(error => {
            console.error('Service Worker registration failed:', error);
          });
      });
    }
  }, []);

  return (
    <ThemeProvider defaultTheme="system" storageKey="iitm-scholar-hub-theme">
      <BrowserRouter>
        <AppRoutes />
        <Analytics />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App; 