'use client';

import { motion } from 'framer-motion';
import { ExternalLink, MapPin, Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import SectionBackground from '@/src/components/ui/SectionBackground';
import LoadingScreen from '@/src/components/animations/LoadingScreen';
import { getOrganizations } from '@/src/lib/api/services';
import type { Organization } from '@/src/lib/api/types';

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
  const dates = period.split('-').map(d => d.trim());
  const startDate = dates[0];
  const [month, year] = startDate.split(' ');
  return new Date(parseInt(year), getMonthNumber(month));
};

export default function OrganizationsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const data = await getOrganizations();
        const sortedOrganizations = data.sort((a: Organization, b: Organization) => {
          const dateA = getStartDateFromPeriod(a.period);
          const dateB = getStartDateFromPeriod(b.period);
          return dateB.getTime() - dateA.getTime();
        });
        setOrganizations(sortedOrganizations);
      } catch (err) {
        console.error('Error fetching organizations:', err);
        setError('Failed to load organizations');
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    };

    fetchOrganizations();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1a191d]">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <Link href="/">
            <motion.button
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-purple-400 hover:text-purple-300"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-sm md:text-base">Back to Home</span>
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
              className="mb-6 md:mb-8 flex items-center gap-2 text-purple-400 hover:text-purple-300 tracking-wide"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
              <span className="font-semibold text-sm md:text-base">Back to Home</span>
            </motion.button>
          </Link>

          <div className="mb-8 md:mb-12">
            <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-3 text-purple-400">Organizations</h1>
            <p className="text-gray-300 tracking-wide text-sm md:text-base">My involvement in various organizations and communities</p>
          </div>

          <div className="space-y-8 md:space-y-16">
            {organizations.map((org, index) => (
              <motion.div
                key={org._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="group"
              >
                <div className="bg-white/5 backdrop-blur-lg rounded-xl md:rounded-2xl p-4 md:p-8 relative overflow-hidden
                              hover:bg-white/10 transition-all duration-500">
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex flex-col gap-4 mb-4 md:mb-6">
                      {/* Organization Info */}
                      <div>
                        <h3 className="text-lg md:text-2xl font-bold mb-1 md:mb-2 text-purple-400 group-hover:text-purple-200
                                     transition-colors tracking-wide">{org.role}</h3>
                        <p className="text-base md:text-lg text-gray-300 tracking-wide">{org.name}</p>
                      </div>

                      {/* Period and Location */}
                      <div className="flex flex-wrap gap-3 md:gap-4 text-gray-300 tracking-wide text-sm md:text-base">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
                          <span>{org.period}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
                          <span>{org.city}</span>
                        </div>
                      </div>
                    </div>

                    {/* Highlights */}
                    <ul className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                      {org.highlights.map((highlight, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-2 md:gap-3"
                        >
                          <span className="text-purple-400 shrink-0 mt-1.5">•</span>
                          <span className="text-gray-300 text-justify tracking-wide text-sm md:text-base">{highlight}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Link */}
                    {org.link && (
                      <div className="flex items-center justify-end border-t border-purple-500/10 pt-4">
                        <Link href={org.link} target="_blank" rel="noopener noreferrer">
                          <motion.button
                            whileHover={{ x: 5 }}
                            className="flex items-center gap-1.5 md:gap-2 text-purple-400 hover:text-purple-300 tracking-wide text-sm md:text-base"
                          >
                            <span>Visit Organization</span>
                            <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
                          </motion.button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}