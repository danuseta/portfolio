'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const getRandomIconPath = () => {
  const paths = [
    // CPU icon path -
    '<path d="M4 4h16v16H4z M9 9h6v6H9z"/>',
    // Lightning bolt path
    '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>',
    // Code icon path
    '<path d="M16 18l6-6-6-6 M8 6l-6 6 6 6"/>',
    // Circuit path
    '<path d="M2 12h20 M12 2v20 M16 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>',
    // Binary path
    '<path d="M8 2v20M16 2v20M4 6h4M4 14h4M12 10h4M12 18h4"/>',
    // Keyboard path
    '<path d="M2 6h20v12H2z M6 10h2M10 10h2M14 10h2M18 10h2M8 14h8"/>'
  ];
  return paths[Math.floor(Math.random() * paths.length)];
};

interface SectionBackgroundProps {
  variant?: 'purple' | 'blue' | 'mixed';
  density?: 'low' | 'medium' | 'high';
}

export default function SectionBackground({
  variant = 'mixed',
  density = 'medium'
}: SectionBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const iconCount = {
      low: 6,
      medium: 8,
      high: 12
    }[density];

    const icons = Array.from({ length: iconCount }).map((_, index) => {
      const iconWrapper = document.createElement('div');
      iconWrapper.className = 'absolute';
      containerRef.current?.appendChild(iconWrapper);

      const size = Math.random() * 15 + 25;
      iconWrapper.style.width = `${size}px`;
      iconWrapper.style.height = `${size}px`;

      let color;
      if (variant === 'mixed') {
        color = index % 2 === 0 ? 'purple' : 'blue';
      } else {
        color = variant;
      }

      iconWrapper.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" 
        class="${color === 'purple' ? 'text-purple-500/15' : 'text-blue-500/15'}">${getRandomIconPath()}</svg>`;

      const sectionHeight = containerRef.current?.offsetHeight || window.innerHeight;
      const startX = Math.random() * window.innerWidth;
      const startY = Math.random() * sectionHeight;

      gsap.set(iconWrapper, {
        x: startX,
        y: startY,
        rotation: Math.random() * 360
      });

      gsap.to(iconWrapper, {
        duration: 8 + Math.random() * 4,
        x: `random(${startX - 100}, ${startX + 100})`,
        y: `random(${startY - 100}, ${startY + 100})`,
        rotation: `random(${-180}, ${180})`,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });

      gsap.to(iconWrapper, {
        scale: 0.9 + Math.random() * 0.2,
        duration: 2 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });

      return iconWrapper;
    });

    return () => {
      icons.forEach((icon) => icon.remove());
    };
  }, [variant, density]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    />
  );
}
