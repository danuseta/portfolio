'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, Image as ImageIcon, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getProjects } from '@/src/lib/api/services';
import type { Project } from '@/src/lib/api/types';
import TechStack from '@/src/components/ui/TechStack';
import SectionBackground from '@/src/components/ui/SectionBackground';
import LoadingScreen from '@/src/components/animations/LoadingScreen';
import Image from 'next/image';

const getMonthNumber = (month: string): number => {
  const monthMap: { [key: string]: number } = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11
  };
  return monthMap[month] || 0;
};

const getStartDateFromPeriod = (period: string): Date => {
  const dates = period.split('-').map((d) => d.trim());
  const startDate = dates[0];
  const [month, year] = startDate.split(' ');
  return new Date(parseInt(year), getMonthNumber(month));
};

export default function ProjectsPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        const sortedProjects = data.sort((a: Project, b: Project) => {
          const dateA = getStartDateFromPeriod(a.period);
          const dateB = getStartDateFromPeriod(b.period);
          return dateB.getTime() - dateA.getTime();
        });
        setProjects(sortedProjects);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects');
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    };

    fetchProjects();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1a191d]">
        <div className="text-center">
          <p className="text-red-400 mb-4 text-sm md:text-base">{error}</p>
          <Link href="/">
            <motion.button
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm md:text-base"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
              <span>Back to Home</span>
            </motion.button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen relative bg-[#1a191d] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <SectionBackground variant="blue" density="high" />
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative pt-8 md:pt-12 pb-16 md:pb-20">
        <div className="container mx-auto px-4 md:px-6">
          {/* Back Button */}
          <Link href="/">
            <motion.button
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
              className="mb-6 md:mb-8 flex items-center gap-1.5 md:gap-2 text-purple-400 hover:text-purple-300 tracking-wide"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
              <span className="font-semibold text-sm md:text-base">Back to Home</span>
            </motion.button>
          </Link>

          <div className="mb-8 md:mb-12">
            <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-3 text-purple-400">
              All Projects
            </h1>
            <p className="text-gray-300 tracking-wide text-sm md:text-base">
              Explore all my projects and works
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: 'easeOut',
                  delay: index * 0.1
                }}
                className="group relative bg-white/5 backdrop-blur-lg rounded-lg md:rounded-xl overflow-hidden
                          hover:bg-white/10 transition-all duration-700 h-full"
              >
                {/* Project Image/Preview */}
                <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-purple-500/10 to-blue-500/10">
                  {project.image && (
                    <>
                      <div className="relative w-full h-full">
                        <Image
                          src={project.image.url}
                          alt={project.title}
                          fill
                          className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => setSelectedImage(project.image.url)}
                        className="absolute top-2 right-2 md:top-3 md:right-3 p-2 rounded-full bg-black/50 text-white 
                  hover:bg-black/70 transition-all z-10"
                      >
                        <ImageIcon className="w-3 h-3 md:w-4 md:h-4" />
                      </motion.button>
                    </>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-4 md:p-6 relative">
                  <h3
                    className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-purple-400 group-hover:text-purple-200
                               transition-colors tracking-wide line-clamp-1"
                  >
                    {project.title}
                  </h3>

                  <p className="text-gray-300 text-sm md:text-base mb-3 md:mb-4 line-clamp-3 tracking-wide text-justify">
                    {project.description}
                  </p>

                  <TechStack
                    technologies={project.technologies}
                    size="sm"
                    className="mb-3 md:mb-4 gap-1.5"
                  />

                  <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-purple-500/10">
                    {project.link && (
                      <Link href={project.link} target="_blank" rel="noopener noreferrer">
                        <motion.button
                          whileHover={{ x: 5 }}
                          className="flex items-center gap-1.5 md:gap-2 text-purple-400 hover:text-purple-300 tracking-wide text-sm md:text-base"
                        >
                          <span>View Project</span>
                          <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
                        </motion.button>
                      </Link>
                    )}

                    {project.github && (
                      <Link href={project.github} target="_blank" rel="noopener noreferrer">
                        <motion.button
                          whileHover={{ y: -2 }}
                          className="text-gray-300 hover:text-white"
                        >
                          <Github className="w-4 h-4 md:w-5 md:h-5" />
                        </motion.button>
                      </Link>
                    )}
                  </div>
                </div>

                {/* Hover Gradient */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10 
                             opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="relative max-w-4xl w-full max-h-[90vh] rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[80vh]">
              <Image
                src={selectedImage}
                alt="Project Preview"
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
