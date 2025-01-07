'use client';
import { motion } from 'framer-motion';
import { profileData } from '@/src/data/portfolio';

export default function Footer() {
  return (
    <footer className="backdrop-blur-md">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center">
          <motion.div 
            className="text-sm text-gray-400 text-center"
            whileHover={{ scale: 1.02 }}
          >
            © 2024 <span className="text-purple-400">{profileData.fullName}</span>. All rights reserved.
          </motion.div>
        </div>
      </div>
    </footer>
  );
}