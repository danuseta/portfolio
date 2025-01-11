import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Github, Image as ImageIcon, X } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getProjects } from '@/src/lib/api/services';
import type { Project } from '@/src/lib/api/types';
import SectionTitle from '@/src/components/ui/SectionTitle';
import TechStack from '@/src/components/ui/TechStack';
import SectionBackground from '@/src/components/ui/SectionBackground';
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

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getProjects();
        const sortedProjects = data.sort((a: Project, b: Project) => {
          const dateA = getStartDateFromPeriod(a.period);
          const dateB = getStartDateFromPeriod(b.period);
          return dateB.getTime() - dateA.getTime();
        });
        setProjects(sortedProjects);
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-purple-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-gray-300">Loading projects...</span>
        </div>
      </div>
    );

  const featuredProjects = projects
    .filter((p) => p.featured)
    .slice(0, 4)
    .map((project) => ({
      ...project,
      image: project.image?.url || project.image
    }));

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  return (
    <section className="py-12 md:py-20 relative bg-[#1a191d] overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0">
        <SectionBackground variant="blue" density="high" />
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <SectionTitle title="Projects" subtitle="Some of my best works and side projects" />
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-16"
          >
            {featuredProjects.map((project) => (
              <motion.div
                key={project._id}
                variants={itemVariants}
                className="group relative bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden
                          hover:bg-white/10 transition-all duration-500 flex flex-col h-full"
              >
                {/* Project Image/Preview */}
                <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-purple-500/10 to-blue-500/10">
                  {project.image && (
                    <>
                      <div className="relative w-full h-full">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => setSelectedImage(project.image)}
                        className="absolute top-2 right-2 p-2 rounded-full bg-black/50 text-white/80 
                                 hover:text-white hover:bg-black/70 transition-all z-10"
                      >
                        <ImageIcon className="w-4 h-4" />
                      </motion.button>
                    </>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                {/* Project Content */}
                <div className="p-4 md:p-6 relative flex flex-col flex-grow">
                  <div className="flex-grow">
                    <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-purple-400 group-hover:text-purple-200
                                transition-colors tracking-wide line-clamp-1">
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
                  </div>

                  <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-purple-500/10">
                    <Link href={project.link || '#'} target="_blank" rel="noopener noreferrer">
                      <motion.button
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-1.5 md:gap-2 text-purple-400 hover:text-purple-300 tracking-wide text-sm md:text-base"
                      >
                        <span>View Project</span>
                        <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
                      </motion.button>
                    </Link>

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
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-center">
            <Link href="/projects" className="inline-block">
              <motion.button
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-purple-400 hover:text-purple-300 
                         bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full transition-colors"
              >
                <span className="font-semibold tracking-wide">View All Projects</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Image Preview Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="relative max-w-4xl w-full max-h-[90vh] rounded-xl overflow-hidden"
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              className="absolute top-2 right-2 z-10 p-2 rounded-full bg-black/50 text-white/80 hover:text-white hover:bg-black/70 transition-all"
            >
              <X className="w-5 h-5" />
            </motion.button>

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
    </section>
  );
}