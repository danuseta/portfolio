'use client';

import { motion } from 'framer-motion';

interface SkillBadgeProps {
  name: string;
  icon?: React.ReactNode;
  level?: number;
}

export default function SkillBadge({ name, icon, level = 0 }: SkillBadgeProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 
                 transition-colors duration-300"
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      <span>{name}</span>
      {level > 0 && (
        <div className="w-16 h-1 bg-purple-900/20 rounded-full ml-2">
          <div 
            className="h-full bg-purple-400 rounded-full" 
            style={{ width: `${level}%` }}
          />
        </div>
      )}
    </motion.div>
  );
}