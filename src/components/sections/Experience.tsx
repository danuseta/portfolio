'use client';

import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getExperience } from '@/src/lib/api/services';
import type { Experience } from '@/src/lib/api/types';
import SectionTitle from '@/src/components/ui/SectionTitle';
import TechStack from '@/src/components/ui/TechStack';
import SectionBackground from '@/src/components/ui/SectionBackground';

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
  const startDate = period.split('-')[0].trim();

  const [month, year] = startDate.split(' ');

  return new Date(parseInt(year), getMonthNumber(month));
};

const sortExperience = (a: Experience, b: Experience): number => {
  const dateA = getStartDateFromPeriod(a.period);
  const dateB = getStartDateFromPeriod(b.period);
  return dateB.getTime() - dateA.getTime();
};

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadExperience = async () => {
      try {
        const data = await getExperience();
        const sortedData = [...data].sort(sortExperience);
        setExperiences(sortedData);
      } catch (error) {
        console.error('Error loading experience:', error);
      } finally {
        setLoading(false);
      }
    };

    loadExperience();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-purple-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-gray-300">Loading experience data...</span>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 md:py-20">
      <SectionBackground variant="mixed" density="medium" />
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle title="Experience" subtitle="My professional journey in the tech industry" />

        <div className="space-y-8 md:space-y-16">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="group"
            >
              <div
                className="bg-white/5 backdrop-blur-lg rounded-xl md:rounded-2xl p-4 md:p-8 relative overflow-hidden
                            hover:bg-white/10 transition-all duration-500"
              >
                {/* Background Gradient */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex flex-col gap-3 md:gap-4 mb-4 md:mb-6">
                    {/* Title & Company */}
                    <div className="space-y-1">
                      <div className="flex items-start md:items-center gap-3 mb-2">
                        <div className="shrink-0 p-2 rounded-lg bg-purple-400/10">
                          <Briefcase className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
                        </div>
                        <h3
                          className="text-lg md:text-2xl font-bold text-purple-400 group-hover:text-purple-200
                                     transition-colors tracking-wide"
                        >
                          {experience.title}
                        </h3>
                      </div>
                      <p className="text-base md:text-lg text-gray-300 tracking-wide">
                        {experience.company}
                      </p>
                    </div>

                    {/* Period */}
                    <div className="flex items-center space-x-2 text-gray-300 tracking-wide text-sm md:text-base">
                      <Calendar className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
                      <span>{experience.period}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 mb-4 md:mb-6 leading-relaxed tracking-wide text-justify text-sm md:text-base">
                    {experience.description}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                    {experience.highlights.map((highlight, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-2 md:gap-3"
                      >
                        <span className="text-purple-400 mt-1.5 shrink-0">•</span>
                        <span className="text-gray-300 text-justify tracking-wide text-sm md:text-base">
                          {highlight}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <TechStack
                    technologies={experience.technologies}
                    size="sm"
                    className="gap-1.5 md:gap-2"
                  />
                </div>

                {/* Decorative Elements */}
                <div
                  className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500/5 rounded-full blur-2xl
                             group-hover:bg-purple-500/10 transition-colors duration-500"
                />
                <div
                  className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/5 rounded-full blur-2xl
                             group-hover:bg-blue-500/10 transition-colors duration-500"
                />
              </div>
            </motion.div>
          ))}

          {/* Decorative elements */}
          <motion.div
            animate={{
              y: [-10, 10, -10],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute -right-10 top-1/4 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              y: [10, -10, 10],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute -left-10 bottom-1/4 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"
          />
        </div>
      </div>
    </section>
  );
}
