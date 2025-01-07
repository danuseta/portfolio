'use client';

import { motion } from 'framer-motion';
import { Code, Palette, Laptop, Sparkles, Triangle, Circle, Square } from 'lucide-react';

export default function FloatingIcons() {
  const icons = [
    { Icon: Code, delay: 0 },
    { Icon: Palette, delay: 0.2 },
    { Icon: Laptop, delay: 0.4 },
    { Icon: Sparkles, delay: 0.6 },
    { Icon: Triangle, delay: 0.8 },
    { Icon: Circle, delay: 1 },
    { Icon: Square, delay: 1.2 }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {icons.map(({ Icon, delay }, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 100 }}
          animate={{
            opacity: [0, 1, 0],
            y: [-50, -150, -250],
            x: Math.sin(index) * 100
          }}
          transition={{
            duration: 10,
            delay: delay,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
          className="absolute"
          style={{
            left: `${(index + 1) * 15}%`,
            bottom: '0%'
          }}
        >
          <Icon
            className="w-8 h-8 text-purple-500/20"
            style={{ transform: `rotate(${index * 45}deg)` }}
          />
        </motion.div>
      ))}
    </div>
  );
}
