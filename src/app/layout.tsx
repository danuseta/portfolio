'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/src/components/shared/Navbar';
import Footer from '@/src/components/shared/Footer';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Muhammad Danu Seta Wiardana",
  "alternateName": ["Danu Seta", "M Danu Seta W", "Muhammad Danu"],
  "jobTitle": ["Full Stack Developer", "UI/UX Designer", "Software Engineer"],
  "description": "Experienced Full Stack Developer, UI/UX Designer, and Software Engineer specializing in modern web development, mobile applications, and user experience design.",
  "url": "https://www.danuseta.my.id",
  "sameAs": [
    "https://github.com/danuseta",
    "https://linkedin.com/in/danuseta",
    "https://instagram.com/danuseta"
  ],
  "knowsAbout": [
    "Full Stack Development",
    "UI/UX Design",
    "React.js",
    "Next.js",
    "Node.js",
    "TypeScript",
    "JavaScript",
    "Web Development",
    "Mobile Development",
    "Software Engineering"
  ],
  "nationality": "Indonesian",
  "worksFor": {
    "@type": "Organization",
    "name": "Freelance Developer"
  }
};

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
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        
        <meta name="author" content="Muhammad Danu Seta Wiardana" />
        <meta name="dcterms.creator" content="Muhammad Danu Seta Wiardana" />
        <meta name="dcterms.rightsHolder" content="Muhammad Danu Seta Wiardana" />
        <meta name="owner" content="Muhammad Danu Seta Wiardana" />
        
        <meta name="geo.region" content="ID" />
        <meta name="geo.country" content="Indonesia" />
        <meta name="language" content="English" />
        <meta name="content-language" content="en" />
        
        <meta name="classification" content="Technology, Software Development, Web Development" />
        <meta name="category" content="Technology" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        
        <meta name="application-name" content="Muhammad Danu Seta Wiardana Portfolio" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Danu Seta Portfolio" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#1a191d" />
        <meta name="msapplication-TileColor" content="#1a191d" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

         <link rel="canonical" href="https://www.danuseta.my.id/" />
        
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/images/icons/icon-192x192.png" />
        <link rel="icon" type="image/png" href="/images/icons/icon-384x384.png" />
        <link rel="shortcut icon" href="/images/icons/icon-384x384.png" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Muhammad Danu Seta Wiardana Portfolio",
              "alternateName": "Danu Seta Portfolio",
                             "url": "https://www.danuseta.my.id",
              "description": "Professional portfolio of Muhammad Danu Seta Wiardana - Full Stack Developer and UI/UX Designer",
              "inLanguage": "en",
              "isAccessibleForFree": true,
              "author": {
                "@type": "Person",
                "name": "Muhammad Danu Seta Wiardana"
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.danuseta.my.id/?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.className} overflow-x-hidden`}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5PGG1TGNY2"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5PGG1TGNY2', {
              cookie_domain: 'danuseta.my.id',
              cookie_flags: 'SameSite=None;Secure'
            });
          `}
        </Script>
        
        {!isLoading && !hideNavbar && <Navbar />}
        <div className="overflow-x-hidden">{children}</div>
        {!isLoading && <Footer />}
        <Analytics />

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
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
            </motion.button>
          )}
        </AnimatePresence>
      </body>
    </html>
  );
}