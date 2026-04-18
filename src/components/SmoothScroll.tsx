import { useEffect, useRef, useState } from 'react';
import Scrollbar from 'smooth-scrollbar';
import { useLocation } from 'react-router-dom';

interface SmoothScrollProps {
  children: React.ReactNode;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const [scrollbar, setScrollbar] = useState<Scrollbar | null>(null);
  const location = useLocation();

  // Initialize smooth scrollbar
  useEffect(() => {
    if (!scrollbarRef.current) return;

    // Detect touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Only apply custom scrollbar on non-touch devices (desktop)
    if (!isTouchDevice) {
      const options = {
        damping: 0.07,
        thumbMinSize: 20,
        renderByPixels: true,
        alwaysShowTracks: false,
        continuousScrolling: true,
      };
      
      const instance = Scrollbar.init(scrollbarRef.current, options);
      setScrollbar(instance);
      
      // Scroll to top when location changes
      instance.scrollTo(0, 0, 300);
      
      return () => {
        if (instance) {
          instance.destroy();
          setScrollbar(null);
        }
      };
    }
  }, []);
  
  // Reset scroll position on page change
  useEffect(() => {
    if (scrollbar) {
      // Smooth scroll to top with animation
      scrollbar.scrollTo(0, 0, 300);
    } else {
      // Fallback for native scrolling
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [location.pathname, scrollbar]);

  return (
    <div 
      ref={scrollbarRef} 
      style={{ 
        height: '100vh', 
        width: '100%', 
        overflow: 'auto',
        position: 'relative'
      }}
      className="smooth-scroll-container"
    >
      {children}
      
      <style jsx global>{`
        .scrollbar-track {
          background: transparent !important;
        }
        
        .scrollbar-track-y {
          width: 6px !important;
          right: 2px !important;
        }
        
        .scrollbar-thumb {
          background: rgba(120, 120, 120, 0.3) !important;
          border-radius: 8px !important;
          transition: background 0.3s ease !important;
        }
        
        .scrollbar-thumb:hover {
          background: rgba(120, 120, 120, 0.5) !important;
        }
        
        .dark .scrollbar-thumb {
          background: rgba(200, 200, 200, 0.3) !important;
        }
        
        .dark .scrollbar-thumb:hover {
          background: rgba(200, 200, 200, 0.5) !important;
        }
        
        .smooth-scroll-container {
          -webkit-overflow-scrolling: touch;
        }
        
        @media (max-width: 768px) {
          .scrollbar-track, .scrollbar-thumb {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default SmoothScroll; 