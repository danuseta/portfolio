'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getProfile } from '@/src/lib/api/services';
import type { Profile } from '@/src/lib/api/types';
import { useScrollBlur } from '@/src/hooks/useScrollBlur';

export default function Hero() {
  const { blur, scrollProgress } = useScrollBlur();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) return null;

  return (
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#1a191d]" />
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute inset-0 transition-all duration-150"
          style={{
            backdropFilter: `blur(${blur}px)`,
            WebkitBackdropFilter: `blur(${blur}px)`,
            backgroundColor: `rgba(0, 0, 0, ${Math.min(scrollProgress * 0.6, 0.6)})`
          }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-2 md:space-y-4">
            {/* First Line */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-serif tracking-tight text-gray-100"
            >
              The Mind Behind
            </motion.h1>

            {/* Second Line with Image */}
            <div className="flex items-center gap-2 md:gap-4">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-serif text-gray-100"
              >
                The Code
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 lg:w-24 lg:h-24 overflow-hidden hidden md:block"
              >
                <Image
                  src={profile?.heroImage1?.url || '/assets/profile-small.jpg'}
                  alt={`${profile?.fullName || 'Developer'} Setup`}
                  fill
                  className="object-cover brightness-75 rounded-3xl"
                />
              </motion.div>
            </div>

            {/* Third Line with Image */}
            <div className="flex items-center gap-2 md:gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 lg:w-24 lg:h-24 overflow-hidden hidden md:block"
              >
                <Image
                  src={profile?.heroImage2?.url || '/assets/profile-small.jpg'}
                  alt={profile?.fullName || 'Developer'}
                  fill
                  className="object-cover brightness-75 rounded-3xl"
                />
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-serif text-gray-100"
              >
                —A Driven Web Developer
              </motion.h3>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 md:bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        style={{
          opacity: Math.max(1 - scrollProgress * 3, 0),
          visibility: scrollProgress >= 0.33 ? 'hidden' : 'visible'
        }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 md:w-6 md:h-10 border-2 border-gray-300 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gray-300 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
