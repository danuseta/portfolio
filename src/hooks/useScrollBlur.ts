'use client';

import { useEffect, useState } from 'react';

export function useScrollBlur() {
  const [blur, setBlur] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      const blurValue = Math.min((scrollPosition / (windowHeight * 0.2)) * 25, 40);
      setBlur(blurValue);
      
      const progress = scrollPosition / windowHeight;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { blur, scrollProgress };
}