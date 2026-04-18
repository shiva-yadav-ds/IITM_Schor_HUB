import anime from 'animejs/lib/anime.es.js';
import { useEffect } from 'react';

export const useHomeAnimations = () => {
  useEffect(() => {
    // Optimize animations for performance
    const animateHome = setTimeout(() => {
      // Hero section animations - done together for better performance
      anime({
        targets: ['.hero-title', '.hero-description', '.hero-buttons'],
        opacity: [0, 1],
        translateY: [15, 0],
        duration: 600,
        delay: anime.stagger(150),
        easing: 'easeOutCubic'
      });

      // Features section animations - simplified
      anime({
        targets: '.feature-card',
        opacity: [0, 1],
        translateY: [15, 0],
        duration: 400,
        delay: anime.stagger(50),
        easing: 'easeOutCubic'
      });

      // How it works section animations - simplified
      anime({
        targets: '.how-it-works-card',
        opacity: [0, 1],
        translateY: [15, 0],
        duration: 400,
        delay: anime.stagger(50),
        easing: 'easeOutCubic'
      });

      // CTA section animations - simplified
      anime({
        targets: '.cta-section',
        opacity: [0, 1],
        translateY: [15, 0],
        duration: 400,
        easing: 'easeOutCubic'
      });
    }, 100); // Small delay to ensure page is rendered first

    return () => {
      clearTimeout(animateHome);
    };
  }, []);
};
