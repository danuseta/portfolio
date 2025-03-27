'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { submitFeedback } from '@/src/lib/api/services';
import SectionTitle from '../ui/SectionTitle';
import SectionBackground from '../ui/SectionBackground';
import dynamic from 'next/dynamic';

const Turnstile = dynamic(
  () => import('@marsidev/react-turnstile').then(mod => mod.Turnstile),
  { ssr: false }
);

const isDevelopment = process.env.NODE_ENV === 'development';

export default function Feedback() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    token: isDevelopment ? 'dev-bypass-token' : ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [turnstileError, setTurnstileError] = useState(false);
  const [isTurnstileLoaded, setIsTurnstileLoaded] = useState(false);
  const [isVerified, setIsVerified] = useState(isDevelopment);
  
  const [turnstileWidgetSuccess, setTurnstileWidgetSuccess] = useState(false);
  
  const turnstileRef = useRef(null);
  const buttonRef = useRef(null);
  
  const siteKey = process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY || '';
  
  useEffect(() => {
    if (isDevelopment) return; 
    
    const checkForTurnstileSuccess = () => {
      const successElement = document.querySelector('.cf-turnstile [aria-label="Success"]');
      if (successElement) {
        console.log('✅ Turnstile widget success detected visually!');
        setTurnstileWidgetSuccess(true);
        setIsVerified(true);
        if (buttonRef.current) {
          buttonRef.current.disabled = false;
          buttonRef.current.classList.remove('opacity-50', 'cursor-not-allowed');
        }
      }
    };
    
    checkForTurnstileSuccess();
    
    const observer = new MutationObserver(checkForTurnstileSuccess);
    observer.observe(document.body, { 
      childList: true, 
      subtree: true,
      attributes: true,
      attributeFilter: ['aria-label', 'class'] 
    });
    
    return () => observer.disconnect();
  }, [isDevelopment]);
  
  useEffect(() => {
    if (turnstileWidgetSuccess && !isVerified) {
      console.log('🔄 Forcing state update because widget shows success but state is not verified');
      setIsVerified(true);
    }
  }, [turnstileWidgetSuccess, isVerified]);
  
  useEffect(() => {
    console.log("Aplikasi berjalan dalam mode:", isDevelopment ? "DEVELOPMENT" : "PRODUCTION");
    console.log("Turnstile siteKey:", siteKey ? "Ditemukan" : "Tidak ditemukan");
    
    if (isDevelopment || !siteKey) {
      console.log("Mode development atau siteKey tidak ada - mengaktifkan form secara otomatis");
      setIsVerified(true);
      setIsTurnstileLoaded(false); 
      
      setFormData(prev => ({
        ...prev,
        token: 'dev-mode-auto-verified-token'
      }));
    } else {
      setIsTurnstileLoaded(!!siteKey);
    }
  }, [siteKey]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleTurnstileVerify = (token) => {
    console.log('Turnstile verified with token:', token.substring(0, 10) + '...');
    
    setFormData((prev) => ({
      ...prev,
      token
    }));
    
    setIsVerified(true);
    setTurnstileWidgetSuccess(true);
    setTurnstileError(false);
    console.log('Verification completed and state updated');
    
    if (buttonRef.current) {
      setTimeout(() => {
        buttonRef.current.disabled = false;
        buttonRef.current.classList.remove('opacity-50', 'cursor-not-allowed');
        console.log('Button enabled via direct DOM manipulation');
      }, 100);
    }
  };

  const handleTurnstileError = () => {
    console.error('Turnstile verification error');
    setTurnstileError(true);
    setIsVerified(false);
    setTurnstileWidgetSuccess(false);
  };

  const handleTurnstileExpire = () => {
    console.warn('Turnstile verification expired');
    setFormData((prev) => ({
      ...prev,
      token: ''
    }));
    setIsVerified(false);
    setTurnstileWidgetSuccess(false);
    setTurnstileError(true);
  };

  const isFormEnabled = () => {
    console.log('Button status check:');
    console.log('- Loading:', loading);
    console.log('- isDevelopment:', isDevelopment);
    console.log('- turnstileWidgetSuccess:', turnstileWidgetSuccess);
    console.log('- isVerified:', isVerified);
    
    if (isDevelopment) return !loading;
    
    return !loading && (
      !isTurnstileLoaded || 
      isVerified || 
      turnstileWidgetSuccess || 
      document.querySelector('.cf-turnstile [aria-label="Success"]') !== null
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    console.log('====== FORM SUBMISSION ======');
    console.log('Mode:', isDevelopment ? 'DEVELOPMENT' : 'PRODUCTION');
    console.log('Is verified:', isVerified);
    console.log('Widget success:', turnstileWidgetSuccess);
    console.log('Token exists:', !!formData.token);
    
    const visualSuccess = document.querySelector('.cf-turnstile [aria-label="Success"]') !== null;
    
    if (!isDevelopment && isTurnstileLoaded && !isVerified && !turnstileWidgetSuccess && !visualSuccess) {
      setTurnstileError(true);
      console.error('Turnstile verification required but not completed');
      return;
    }
    
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields');
      return;
    }
    
    setLoading(true);

    try {
      console.log('Submitting feedback with data:', {
        name: formData.name,
        email: formData.email,
        messageLength: formData.message.length,
        hasToken: !!formData.token
      });
      
      const effectiveToken = formData.token || (visualSuccess ? 'visual-success-fallback-token' : '') || (isDevelopment ? 'dev-bypass-token' : '');
      
      const response = await submitFeedback({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        token: effectiveToken
      });
      
      console.log('Feedback submission response:', response);
      
      setSuccess(true);
      setFormData({ 
        name: '', 
        email: '', 
        message: '', 
        token: isDevelopment ? 'dev-bypass-token' : ''
      });
      
      if (!isDevelopment) {
        setIsVerified(false);
        setTurnstileWidgetSuccess(false);
      }
      
      if (turnstileRef.current && isTurnstileLoaded && !isDevelopment) {
        try {
          turnstileRef.current.reset();
        } catch (resetError) {
          console.warn('Could not reset Turnstile:', resetError);
        }
      }
      
      console.log('Feedback submitted successfully');
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setError(error.message || 'Failed to submit feedback. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  return (
    <section className="py-12 md:py-20 relative">
      <SectionBackground variant="purple" density="medium" />
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <SectionTitle title="Feedback" subtitle="Share your thoughts to help me improve" />
          </motion.div>

          <motion.div variants={containerVariants} className="max-w-2xl mx-auto">
            <motion.div
              variants={itemVariants}
              className="bg-white/5 backdrop-blur-lg rounded-xl md:rounded-2xl p-4 md:p-8 relative overflow-hidden
                        hover:bg-white/10 transition-all duration-500"
            >
              {/* Background Gradient */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />

              <form onSubmit={handleSubmit} className="relative z-10 space-y-4 md:space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5 md:mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 md:px-4 py-2 md:py-3 bg-white/5 border border-purple-500/20 rounded-lg 
                             focus:ring-2 focus:ring-purple-500/50 focus:border-transparent
                             text-sm md:text-base text-gray-200 placeholder-gray-400
                             transition-colors duration-200"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5 md:mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 md:px-4 py-2 md:py-3 bg-white/5 border border-purple-500/20 rounded-lg 
                             focus:ring-2 focus:ring-purple-500/50 focus:border-transparent
                             text-sm md:text-base text-gray-200 placeholder-gray-400
                             transition-colors duration-200"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5 md:mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 md:px-4 py-2 md:py-3 bg-white/5 border border-purple-500/20 rounded-lg 
                             focus:ring-2 focus:ring-purple-500/50 focus:border-transparent
                             text-sm md:text-base text-gray-200 placeholder-gray-400
                             transition-colors duration-200"
                    placeholder="Your message..."
                  />
                </div>

                {/* Turnstile Widget - Only render in production and if site key exists */}
                {isTurnstileLoaded && siteKey && !isDevelopment && (
                  <div className="flex justify-center">
                    <Turnstile
                      ref={turnstileRef}
                      siteKey={siteKey}
                      onVerify={handleTurnstileVerify}
                      onError={handleTurnstileError}
                      onExpire={handleTurnstileExpire}
                      theme="dark"
                      refreshExpired="auto"
                    />
                  </div>
                )}
                
                {/* DEV MODE INDICATOR */}
                {isDevelopment && (
                  <div className="text-center text-sm text-amber-400 bg-amber-400/10 rounded-lg p-2 border border-amber-400/30">
                    🔧 DEVELOPMENT MODE - Turnstile verification bypassed 🔧
                  </div>
                )}
                
                {turnstileError && isTurnstileLoaded && !isDevelopment && (
                  <div className="text-center text-sm text-red-400 bg-red-400/10 rounded-lg p-2">
                    Please complete the CAPTCHA verification
                  </div>
                )}
                
                {error && (
                  <div className="text-center text-sm text-red-400 bg-red-400/10 rounded-lg p-2">
                    {error}
                  </div>
                )}

                <div className="flex justify-center pt-2 md:pt-4">
                  <motion.button
                    ref={buttonRef}
                    type="submit"
                    disabled={!isFormEnabled()}
                    whileHover={{
                      scale: 1.02,
                      x: 5,
                      backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 text-purple-400 hover:text-purple-300 
                             bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full transition-colors
                             ${!isFormEnabled() ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={()=> {
                      console.log("Button clicked");
                      console.log("Button disabled?", buttonRef.current?.disabled);
                    }}
                  >
                    <span className="font-semibold tracking-wide">
                      {loading ? 'Sending...' : 'Send Feedback'}
                    </span>
                    <Send className="w-4 h-4 md:w-5 md:h-5" />
                  </motion.button>
                </div>

                {/* Debug info */}
                {isDevelopment && (
                  <div className="mt-4 p-2 border border-purple-500/20 rounded-lg text-xs text-gray-400">
                    <p>DEBUG: isVerified: {isVerified ? 'Yes' : 'No'}</p>
                    <p>DEBUG: turnstileWidgetSuccess: {turnstileWidgetSuccess ? 'Yes' : 'No'}</p>
                    <p>DEBUG: visual success: {document.querySelector('.cf-turnstile [aria-label="Success"]') !== null ? 'Yes' : 'No'}</p>
                    <p>DEBUG: form enabled: {isFormEnabled() ? 'Yes' : 'No'}</p>
                  </div>
                )}

                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-sm md:text-base text-green-400 bg-green-400/10 rounded-lg p-3 md:p-4"
                  >
                    Thank you for your feedback!
                  </motion.div>
                )}
              </form>
            </motion.div>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            animate={{
              y: [-10, 10, -10],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute -right-10 top-1/4 w-24 md:w-32 h-24 md:h-32 bg-purple-500/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              y: [10, -10, 10],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute -left-10 bottom-1/4 w-32 md:w-40 h-32 md:h-40 bg-blue-500/10 rounded-full blur-3xl"
          />
        </motion.div>
      </div>
    </section>
  );
}