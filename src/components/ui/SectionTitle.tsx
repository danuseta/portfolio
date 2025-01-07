'use client';

import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="relative mb-20 overflow-hidden">
      {' '}
      {/* Added overflow-hidden */}
      {/* Large Background Title */}
      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 0.05, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute -top-20 left-1/2 transform -translate-x-1/2 text-[8rem] md:text-[12rem] 
                   font-bold text-white whitespace-nowrap pointer-events-none text-center w-full
                   opacity-5 truncate max-w-screen"
      >
        {title}
      </motion.h2>
      {/* Main Title */}
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-4xl md:text-6xl font-bold text-center mb-4 gradient-text relative z-10"
      >
        {title}
      </motion.h3>
      {/* Subtitle if provided */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-xl text-gray-400 text-center"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
