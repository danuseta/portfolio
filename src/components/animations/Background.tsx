'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Background() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const particles = Array.from({ length: 50 }).map(() => {
      const particle = document.createElement('div');
      particle.className = 'absolute w-1 h-1 rounded-full bg-purple-500/20';
      containerRef.current?.appendChild(particle);

      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;

      gsap.set(particle, { x, y });

      gsap.to(particle, {
        duration: 'random(10, 20)',
        x: `random(${-window.innerWidth / 2}, ${window.innerWidth * 1.5})`,
        y: `random(${-window.innerHeight / 2}, ${window.innerHeight * 1.5})`,
        repeat: -1,
        ease: 'none',
        yoyo: true
      });

      return particle;
    });

    return () => {
      particles.forEach((particle) => particle.remove());
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 via-transparent to-transparent" />
    </div>
  );
}
