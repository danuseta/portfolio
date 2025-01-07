'use client';

import { motion } from 'framer-motion';
import { FileCode2, Briefcase, GraduationCap, Code, Sparkles, ChevronDown } from 'lucide-react';
import { Player } from '@lottiefiles/react-lottie-player';

interface SectionDividerProps {
  type: 'about' | 'experience' | 'education' | 'projects';
  lottieAnimation?: string;
  showScrollIndicator?: boolean;
}

const icons = {
  about: FileCode2,
  experience: Briefcase,
  education: GraduationCap,
  projects: Code
};

const sectionColors = {
  about: 'from-purple-500 to-blue-500',
  experience: 'from-blue-500 to-cyan-500',
  education: 'from-cyan-500 to-green-500',
  projects: 'from-green-500 to-purple-500'
};

export default function SectionDivider({
  type,
  lottieAnimation,
  showScrollIndicator = false
}: SectionDividerProps) {
  const Icon = icons[type];
  const gradientColor = sectionColors[type];

  return (
    <div className="container mx-auto px-4">
      <div className="relative py-24 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 opacity-10 bg-gradient-to-b from-transparent via-purple-500/10 to-transparent" />

        {/* Main Content Container */}
        <div className="relative max-w-screen-xl mx-auto">
          {/* Main Divider Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r 
                     from-transparent via-purple-500 to-transparent opacity-50"
          />

          {/* Center Icon Container */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', duration: 1.5, bounce: 0.4 }}
            className="relative z-10 w-20 h-20 mx-auto bg-dark rounded-full 
                     flex items-center justify-center border border-purple-500/20
                     shadow-lg shadow-purple-500/10"
          >
            {lottieAnimation ? (
              <Player
                autoplay
                loop
                src={lottieAnimation}
                style={{ height: '60px', width: '60px' }}
              />
            ) : (
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-4 rounded-full bg-gradient-to-br ${gradientColor}
                         flex items-center justify-center group`}
              >
                <Icon
                  className="w-8 h-8 text-white transition-transform 
                             group-hover:scale-110 group-hover:rotate-12"
                />
              </motion.div>
            )}
          </motion.div>

          {/* Decorative Elements Container */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Particles Container */}
            <div className="relative h-full">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    background: `linear-gradient(to right, ${i % 2 === 0 ? 'purple' : 'blue'}, transparent)`,
                    left: `${Math.min(10 + i * 10, 60)}%`,
                    top: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                  initial={{
                    y: -20,
                    opacity: 0,
                    scale: 0.5
                  }}
                  animate={{
                    y: [-10, 10],
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2 + i * 0.2,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut'
                  }}
                />
              ))}
            </div>

            {/* Side Sparkles */}
            {[...Array(2)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute top-1/2"
                style={{
                  [i === 0 ? 'left' : 'right']: '20%',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <Sparkles className="w-4 h-4 text-purple-500 opacity-50" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        {showScrollIndicator && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center"
          >
            <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <ChevronDown className="w-6 h-6 text-purple-500 opacity-50" />
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
