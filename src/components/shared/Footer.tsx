'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Profile } from '@/src/lib/api/types';
import { getProfile } from '@/src/lib/api/services';

export default function Footer() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    };

    loadProfile();
  }, []);

  return (
    <footer className="backdrop-blur-md">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center">
          <motion.div className="text-sm text-gray-400 text-center" whileHover={{ scale: 1.02 }}>
            © 2024 <span className="text-purple-400">{profile?.fullName || 'Loading...'}</span>.
            All rights reserved.
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
