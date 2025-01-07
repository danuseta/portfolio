'use client';

import { motion } from 'framer-motion';
import { BriefcaseIcon, CheckCircleIcon } from 'lucide-react';

interface ExperienceCardProps {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
  highlights: string[];
}

export default function ExperienceCard({
  title,
  company,
  period,
  description,
  technologies,
  highlights
}: ExperienceCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-white/5 dark:bg-white/5 backdrop-blur-lg 
                 rounded-lg p-6 overflow-hidden transition-all duration-300
                 hover:bg-white/10 dark:hover:bg-white/10"
    >
      {/* Background Gradient Effect */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 
                    group-hover:opacity-100 transition-opacity duration-300"
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-purple-300">{title}</h3>
            <p className="text-gray-400">{company}</p>
          </div>
          <div className="flex items-center space-x-2 text-gray-400">
            <BriefcaseIcon className="w-4 h-4" />
            <span>{period}</span>
          </div>
        </div>

        <p className="text-gray-300 mb-4">{description}</p>

        {/* Highlights */}
        <div className="space-y-2 mb-4">
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-2"
            >
              <CheckCircleIcon className="w-4 h-4 text-purple-400" />
              <span className="text-gray-300">{highlight}</span>
            </motion.div>
          ))}
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mt-4">
          {technologies.map((tech, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="px-3 py-1 rounded-full text-sm bg-purple-500/10 
                       text-purple-300 hover:bg-purple-500/20 transition-colors"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
