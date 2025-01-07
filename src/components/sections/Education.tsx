'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Book, Calendar, ArrowRight, Award, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getEducation } from '@/src/lib/api/services';
import type { Education } from '@/src/lib/api/types';
import SectionTitle from '@/src/components/ui/SectionTitle';
import SectionBackground from '../ui/SectionBackground';

const getMonthNumber = (month: string): number => {
  const monthMap: { [key: string]: number } = {
    'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
    'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11,
    'January': 0, 'February': 1, 'March': 2, 'April': 3, 'June': 5,
    'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
  };
  return monthMap[month] || 0;
};

const getStartDateFromPeriod = (period: string): Date => {
  const startDate = period.split('-')[0].trim();
  
  const [month, year] = startDate.split(' ');
  
  return new Date(parseInt(year), getMonthNumber(month));
};

const sortEducation = (a: Education, b: Education): number => {
  const dateA = getStartDateFromPeriod(a.year);
  const dateB = getStartDateFromPeriod(b.year);
  return dateB.getTime() - dateA.getTime(); 
};

export default function Education() {
  const [educations, setEducations] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEducation = async () => {
      try {
        const data = await getEducation();
        const sortedData = [...data].sort(sortEducation);
        setEducations(sortedData);
      } catch (error) {
        console.error('Error loading education:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEducation();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-purple-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-gray-300">Loading education data...</span>
        </div>
      </div>
    );
  }

  return (
    <section className="py-8 md:py-12">
      <SectionBackground variant="purple" density="low" />
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle 
          title="Education" 
          subtitle="My academic journey and qualifications"
        />

        <div className="relative mt-12 md:mt-20">
          {/* Vertical Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-400 via-purple-400/50 to-transparent
                        md:-translate-x-px" />

          {educations.map((edu, index) => (
            <motion.div
              key={edu._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative mb-8 md:mb-20 pl-12 md:pl-0"
            >
              {/* Timeline Dot */}
              <div className={`absolute left-2.5 md:left-1/2 top-0 md:-translate-x-1/2`}>
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="w-4 h-4 rounded-full bg-purple-400 ring-4 ring-purple-400/20"
                />
              </div>

              {/* Content Card */}
              <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:ml-auto md:pl-8' : 'md:mr-auto md:pr-8'}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/5 backdrop-blur-lg rounded-xl p-4 md:p-6 shadow-xl
                           hover:bg-white/10 transition-all duration-300 border border-purple-400/20"
                >
                  {/* School Name with Icon */}
                  <div className="flex items-start md:items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-purple-400/10 shrink-0">
                      <GraduationCap className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-purple-400 tracking-wider">{edu.school}</h3>
                  </div>

                  {/* Info Row: Year and Location */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-gray-300 mb-4 text-sm md:text-base tracking-wide">
  <div className="flex items-center gap-2">
    <Calendar className="w-4 h-4" />
    <span>{edu.year}</span>
  </div>
  {/* 
  {edu.location && (
    <div className="flex items-center gap-2">
      <MapPin className="w-4 h-4" />
      <span>{edu.location}</span>
    </div>
  )}
  */}
</div>

                  {/* Degree */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="shrink-0">
                      <Book className="w-4 h-4 text-purple-400" />
                    </div>
                    <p className="text-purple-400 font-medium tracking-wide text-sm md:text-base">{edu.degree}</p>
                  </div>

                  {/* Score */}
                  {edu.score && edu.featured?.showScore && (
                    <div className="flex items-center gap-2 mb-4 text-purple-400">
                      <Award className="w-4 h-4" />
                      <span className="font-medium tracking-wide text-sm md:text-base">
                        {edu.score.type === 'GPA' 
                          ? `GPA: ${edu.score.value.toFixed(2)}`
                          : `Score: ${edu.score.value.toFixed(2)}`}
                      </span>
                    </div>
                  )}

                  {/* Description */}
                  {edu.description && (
                    <p className="text-gray-300 leading-relaxed tracking-wide text-justify mb-4 text-sm md:text-base">
                      {edu.description}
                    </p>
                  )}

                  {/* Achievements */}
                  {edu.achievements && edu.achievements.length > 0 && (
                    <div className="space-y-2">
                      {edu.achievements.map((achievement, index) => (
                        <div 
                          key={index}
                          className="flex items-start gap-2 text-gray-300"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2" />
                          <span className="tracking-wide text-sm md:text-base">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
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
              ease: "easeInOut"
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
              ease: "easeInOut"
            }}
            className="absolute -left-10 bottom-1/4 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"
          />
        </div>

        {/* View Organization Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mt-8 md:mt-12"
        >
          <Link href="/organizations" className="inline-block">
            <motion.button
              whileHover={{ 
                scale: 1.02,
                x: 5,
                backgroundColor: "rgba(255, 255, 255, 0.1)"
              }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-purple-400 hover:text-purple-300 
                       bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full transition-colors"
            >
              <span className="font-semibold tracking-wide">View Organizations</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}