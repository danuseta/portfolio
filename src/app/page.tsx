'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Hero from '@/src/components/sections/Hero';
import Education from '@/src/components/sections/Education';
import Projects from '@/src/components/sections/Projects';
import Experience from '@/src/components/sections/Experience';
import Feedback from '@/src/components/sections/Feedback';
import LoadingScreen from '@/src/components/animations/LoadingScreen';
import { useScrollAnimations } from '@/src/hooks/useScrollAnimations';
import { getProfile } from '@/src/lib/api/services';
import type { Profile } from '@/src/lib/api/types';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const { blur, heroOpacity, contentOpacity, contentY } = useScrollAnimations();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile();
        setProfile(profileData);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  if (isLoading) return <LoadingScreen />;

  return (
    <main className="relative">
      {/* Fixed Background */}
      <div className="fixed inset-0 bg-[#1a191d] z-0">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        </div>
      </div>

      {/* Fixed Hero */}
      <motion.div
        id="home"
        className="fixed inset-0 z-10"
        style={{
          filter: blur,
          opacity: heroOpacity
        }}
      >
        <Hero />
      </motion.div>

      {/* Content Container */}
      <div className="relative">
        {/* Spacer for scroll */}
        <div className="h-screen" />

        {/* Content Sections */}
        <motion.div
          className="relative z-20 bg-transparent"
          style={{
            opacity: contentOpacity,
            y: contentY
          }}
        >
          <div className="space-y-4">
            <section id="about" className="mb-2">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-lg rounded-2xl p-8 mb-10">
                  <div className="flex flex-col sm:flex-row gap-6 mb-6 items-center sm:items-start">
                    {/* Profile Photo */}
                    <div className="relative h-32 sm:h-24 aspect-square shrink-0">
                      <Image
                        src={profile?.aboutImage?.url || '/assets/profile-small.jpg'}
                        alt={profile?.fullName || 'Profile Photo'}
                        fill
                        unoptimized
                        className="object-cover rounded-xl"
                      />
                    </div>
                    {/* Name and Role */}
                    <div className="text-center sm:text-left">
                      <h2 className="text-3xl font-bold text-purple-400 mb-2 tracking-wide">
                        {profile?.fullName}
                      </h2>
                      <p className="text-xl text-purple-400 tracking-wide">{profile?.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-justify mb-6">
                    {profile?.shortBio}
                  </p>

                  {/* Buttons Container */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <motion.a
                      href={profile?.cvLink || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{
                        scale: 1.02,
                        x: 5,
                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 text-purple-400 hover:text-purple-300 
                               bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      <span className="font-semibold tracking-wide">Download CV</span>
                    </motion.a>

                    <Link href="/certificates" className="w-full sm:w-auto">
                      <motion.button
                        whileHover={{
                          scale: 1.02,
                          x: 5,
                          backgroundColor: 'rgba(255, 255, 255, 0.1)'
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full flex items-center justify-center gap-2 text-purple-400 hover:text-purple-300 
                                 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full transition-colors"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <span className="font-semibold tracking-wide">View Certificates</span>
                      </motion.button>
                    </Link>
                  </div>
                </div>
                <Education />
              </div>
            </section>

            <section id="experience" className="mb-2">
              <Experience />
            </section>

            <section id="projects" className="mb-2">
              <Projects />
            </section>

            {/* Feedback Section */}
            <section id="feedback" className="mb-2">
              {/* <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-lg rounded-2xl p-8"> */}
              <Feedback />
              {/* </div>
              </div> */}
            </section>
          </div>

          {/* Footer Space */}
          <div className="h-16" />
        </motion.div>
      </div>
    </main>
  );
}
