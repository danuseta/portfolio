'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/src/components/shared/Navbar';
import Footer from '@/src/components/shared/Footer';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isProjectsPage = pathname === '/projects';
  const isOrganizationsPage = pathname === '/organizations';
  const isCertificatesPage = pathname === '/certificates';
  const hideNavbar = isProjectsPage || isOrganizationsPage || isCertificatesPage;
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <html lang="en" className="overflow-x-hidden" suppressHydrationWarning>
      <head>
        <meta name="application-name" content="danuseta" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="danuseta" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#1a191d" />
        
        {/* PWA Icons */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/images/icons/icon-192x192.png" />
        <link rel="icon" type="image/png" href="/images/icons/icon-384x384.png" />
      </head>
      <body className={`${inter.className} overflow-x-hidden`}>
      {!isLoading && !hideNavbar && <Navbar />}
<div className="overflow-x-hidden">{children}</div>
{!isLoading && <Footer />}

{/* Scroll to Top Button */}
<AnimatePresence>
  {showScrollTop && (
    <motion.button
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      onClick={scrollToTop}
      className="fixed bottom-20 right-8 md:bottom-24 md:right-12 p-2 md:p-3 bg-purple-400/20 
                hover:bg-purple-400/30 backdrop-blur-sm rounded-full z-50
                transition-colors duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <ArrowUp className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
    </motion.button>
  )}
</AnimatePresence>
      </body>
    </html>
  );
}