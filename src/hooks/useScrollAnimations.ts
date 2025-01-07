'use client';

import { useScroll, useTransform, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export function useScrollAnimations() {
  const { scrollY } = useScroll();
  const [activeSection, setActiveSection] = useState<string>('home');

  const springConfig = { mass: 1, stiffness: 100, damping: 30 };
  const smoothBlur = useSpring(useTransform(scrollY, [0, 300], [0, 10]), springConfig);
  const smoothOpacity = useSpring(useTransform(scrollY, [0, 300], [1, 0]), springConfig);

  const blur = useTransform(scrollY, [0, 100, 300], [0, 5, 10]);
  const heroOpacity = useTransform(scrollY, [0, 100, 300], [1, 0.5, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.95]);

  const contentY = useTransform(scrollY, [200, 400], [50, 0]);
  const contentOpacity = useTransform(scrollY, [200, 400], [0, 1]);

  const handleScroll = () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + window.innerHeight / 3;

    sections.forEach((section) => {
      const sectionTop = (section as HTMLElement).offsetTop;
      const sectionHeight = section.clientHeight;
      const sectionId = section.getAttribute('id') || '';

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        if (activeSection !== sectionId) {
          setActiveSection(sectionId);
          const navLinks = document.querySelectorAll('.nav-link');
          navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      }
    });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbar = document.querySelector('nav');
      const offset = navbar ? navbar.clientHeight + 32 : 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return {
    blur: smoothBlur,
    heroOpacity: smoothOpacity,
    heroScale,
    contentY,
    contentOpacity,
    activeSection,
    scrollToSection
  };
}
