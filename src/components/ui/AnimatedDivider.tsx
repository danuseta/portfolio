'use client';

import { motion } from 'framer-motion';
import { Player } from '@lottiefiles/react-lottie-player';

interface AnimatedDividerProps {
  title: string;
  animationUrl: string;
}

export default function AnimatedDivider({ title, animationUrl }: AnimatedDividerProps) {
  return (
    <div className="relative py-20">
      {/* Large Background Title */}
      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="text-8xl font-bold text-white/5 absolute top-1/2 left-1/2 
                   transform -translate-x-1/2 -translate-y-1/2 pointer-events-none 
                   whitespace-nowrap"
      >
        {title}
      </motion.h2>

      {/* Actual Title */}
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center relative z-10 mb-8 gradient-text"
      >
        {title}
      </motion.h3>

      {/* Lottie Animation */}
      <div className="w-32 h-32 mx-auto">
        <Player autoplay loop src={animationUrl} style={{ height: '100%', width: '100%' }} />
      </div>

      {/* Decorative Lines */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex items-center justify-center space-x-4">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '200px' }}
          className="h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-blue-500"
        />
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '200px' }}
          className="h-[1px] bg-gradient-to-l from-transparent via-purple-500 to-blue-500"
        />
      </div>
    </div>
  );
}
