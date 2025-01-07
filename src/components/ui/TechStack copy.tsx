'use client';

import { motion } from 'framer-motion';
import {
  SiReact,
  SiFigma,
  SiAdobexd,
  SiSketch,
  SiNextdotjs,
  SiTailwindcss,
  SiFirebase,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiMongodb,
  SiPostgresql,
  SiPython,
  SiDjango,
  SiDocker,
  SiGit,
  SiAngular,
  SiVueDotJs,
  SiSass,
  SiWebpack,
  SiVite,
  SiRuby,
  SiRubyonrails,
  SiGo,
  SiKubernetes,
  SiTerraform,
  SiGraphql,
  SiLinux,
  SiHtml5,
  SiCss3,
  SiCplusplus,
  SiCsharp,
  SiJava,
  SiPhp,
  SiLaravel,
  SiSpring,
  SiFlutter,
  SiKotlin,
  SiSwift,
  SiMysql,
  SiRedis,
  SiUbuntu
} from 'react-icons/si';

const iconComponents = {
  React: SiReact,
  Figma: SiFigma,
  'Adobe XD': SiAdobexd,
  Sketch: SiSketch,
  'Next.js': SiNextdotjs,
  Tailwind: SiTailwindcss,
  Firebase: SiFirebase,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  'Node.js': SiNodedotjs,
  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  Python: SiPython,
  Django: SiDjango,
  Docker: SiDocker,
  Git: SiGit,
  Angular: SiAngular,
  'Vue.js': SiVueDotJs,
  SASS: SiSass,
  Webpack: SiWebpack,
  Vite: SiVite,
  Ruby: SiRuby,
  'Ruby on Rails': SiRubyonrails,
  Go: SiGo,
  Kubernetes: SiKubernetes,
  Terraform: SiTerraform,
  GraphQL: SiGraphql,
  Linux: SiLinux,
  HTML5: SiHtml5,
  CSS3: SiCss3,
  'C++': SiCplusplus,
  'C#': SiCsharp,
  Java: SiJava,
  PHP: SiPhp,
  Laravel: SiLaravel,
  Spring: SiSpring,
  Flutter: SiFlutter,
  Kotlin: SiKotlin,
  Swift: SiSwift,
  MySQL: SiMysql,
  Redis: SiRedis,
  Ubuntu: SiUbuntu
};

const iconColors = {
  React: 'text-cyan-400',
  Figma: 'text-purple-400',
  'Adobe XD': 'text-pink-500',
  Sketch: 'text-amber-400',
  'Next.js': 'text-white',
  Tailwind: 'text-cyan-300',
  Firebase: 'text-orange-500',
  TypeScript: 'text-blue-400',
  JavaScript: 'text-yellow-300',
  'Node.js': 'text-green-500',
  MongoDB: 'text-green-400',
  PostgreSQL: 'text-blue-300',
  Python: 'text-yellow-400',
  Django: 'text-green-600',
  Docker: 'text-blue-400',
  Git: 'text-red-400',
  Angular: 'text-red-600',
  'Vue.js': 'text-green-400',
  SASS: 'text-pink-400',
  Webpack: 'text-blue-500',
  Vite: 'text-purple-500',
  Ruby: 'text-red-400',
  'Ruby on Rails': 'text-red-500',
  Go: 'text-cyan-500',
  Kubernetes: 'text-blue-500',
  Terraform: 'text-purple-600',
  GraphQL: 'text-pink-400',
  Linux: 'text-yellow-500',
  HTML5: 'text-orange-500',
  CSS3: 'text-blue-400',
  'C++': 'text-blue-500',
  'C#': 'text-green-500',
  Java: 'text-red-600',
  PHP: 'text-violet-600',
  Laravel: 'text-red-500',
  Spring: 'text-green-500',
  Flutter: 'text-blue-400',
  Kotlin: 'text-purple-400',
  Swift: 'text-orange-400',
  MySQL: 'text-blue-400',
  Redis: 'text-red-600',
  Ubuntu: 'text-orange-500'
};

interface TechStackProps {
  technologies: string[];
  className?: string;
}

export default function TechStack({ technologies, className = '' }: TechStackProps) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {technologies.map((tech, index) => {
        const Icon = iconComponents[tech] || SiReact;
        const color = iconColors[tech] || 'text-gray-400';

        return (
          <motion.div
            key={tech}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center gap-2 px-3 py-2 rounded-full 
                       bg-white/5 backdrop-blur-sm ${color} hover:bg-white/10 
                       transition-all duration-300`}
          >
            <Icon className="w-4 h-4" />
            <span className="text-sm font-medium">{tech}</span>
          </motion.div>
        );
      })}
    </div>
  );
}
