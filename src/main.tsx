import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add performance timing mark to measure initial load time
performance.mark('app-start');

// Preload critical resources
const preloadCriticalChunks = () => {
  // Helper function to create preload links
  const preload = (href: string, as: string, type?: string) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    if (type) link.type = type;
    document.head.appendChild(link);
  };
  
  // Preload main JS files
  preload('/assets/vendor-react.js', 'script');
  
  // Preload critical fonts
  if ('connection' in navigator && 
      (navigator as any).connection && 
      (navigator as any).connection.effectiveType !== 'slow-2g') {
    preload('/fonts/inter-var.woff2', 'font', 'font/woff2');
  }
};

// Only preload in production to avoid development overhead
if (import.meta.env.PROD) {
  preloadCriticalChunks();
}

// Use concurrent mode for React 18 features
const root = createRoot(document.getElementById("root")!);

// Load the app with optimization for initial paint
const renderApp = () => {
  if (import.meta.env.DEV) {
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } else {
    root.render(<App />);
  }
  
  // Measure and log performance
  performance.measure('app-load', 'app-start');
  const perfEntries = performance.getEntriesByType('measure');
  if (perfEntries.length > 0) {
    console.log(`App loaded in ${perfEntries[0].duration.toFixed(2)}ms`);
  }
};

// Check if the browser supports requestIdleCallback
if (window.requestIdleCallback) {
  // Defer non-critical initialization to idle time
  requestIdleCallback(() => {
    // Register service worker for caching in production
    if (import.meta.env.PROD && 'serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(error => {
          console.error('Service worker registration failed:', error);
        });
      });
    }
  });
  
  // Render as soon as possible
  renderApp();
} else {
  // Fallback for browsers that don't support requestIdleCallback
  renderApp();
}
