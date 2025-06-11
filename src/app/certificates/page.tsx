'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Image as ImageIcon, ArrowLeft, Calendar, X } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getCertificates } from '@/src/lib/api/services';
import type { Certificate } from '@/src/lib/api/types';
import SectionBackground from '@/src/components/ui/SectionBackground';
import LoadingScreen from '@/src/components/animations/LoadingScreen';
import Image from 'next/image';

export default function CertificatesPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const data = await getCertificates();
        const sortedData = data.sort(
          (a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime()
        );
        setCertificates(sortedData);
      } catch (err) {
        console.error('Error fetching certificates:', err);
        setError('Failed to load certificates');
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    };

    fetchCertificates();
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
              className="flex items-center gap-1.5 md:gap-2 text-purple-400 hover:text-purple-300 text-sm md:text-base"
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
              className="mb-6 md:mb-8 flex items-center gap-1.5 md:gap-2 text-purple-400 hover:text-purple-300 tracking-wide text-sm md:text-base"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
              <span className="font-semibold">Back to Home</span>
            </motion.button>
          </Link>

          <div className="mb-8 md:mb-12">
            <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-3 text-purple-400">
              All Certificates
            </h1>
            <p className="text-gray-300 tracking-wide text-sm md:text-base">
              Browse through my professional certifications and achievements
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {certificates.map((certificate, index) => (
              <motion.div
                key={certificate._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: 'easeOut',
                  delay: index * 0.1
                }}
                className="group relative bg-white/5 backdrop-blur-lg rounded-lg md:rounded-xl overflow-hidden
                          hover:bg-white/10 transition-all duration-700 flex flex-col h-full"
              >
                {/* Certificate Image/Preview */}
                <div className="aspect-video relative overflow-hidden">
                  {certificate.certificateFile && (
                    <>
                      <Image
                        src={certificate.certificateFile.url}
                        alt={certificate.title}
                        fill
                        unoptimized
                        loading="lazy"
                        className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => setSelectedImage(certificate.certificateFile.url)}
                        className="absolute top-2 right-2 p-2 rounded-full bg-black/50 text-white/80 
                                 hover:text-white hover:bg-black/70 transition-all z-10"
                      >
                        <ImageIcon className="w-4 h-4" />
                      </motion.button>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 md:p-6 flex flex-col flex-grow">
                  <div className="flex-grow space-y-2 md:space-y-3">
                    <h3
                      className="text-lg md:text-xl font-bold text-purple-400 group-hover:text-purple-200
                                 transition-colors tracking-wide line-clamp-2"
                    >
                      {certificate.title}
                    </h3>

                    <p className="text-gray-300 text-sm md:text-base line-clamp-2 tracking-wide">
                      {certificate.issuer}
                    </p>

                    {certificate.credentialId && (
                      <p className="text-gray-400 text-xs md:text-sm">
                        Credential ID: {certificate.credentialId}
                      </p>
                    )}

                    <div className="flex items-center gap-1.5 md:gap-2 text-gray-400 text-xs md:text-sm">
                      <Calendar className="w-3 h-3 md:w-4 md:h-4 shrink-0" />
                      <span>
                        {new Date(certificate.issueDate).toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                    </div>

                    {certificate.expiryDate && (
                      <div className="flex items-center gap-1.5 md:gap-2 text-gray-400 text-xs md:text-sm">
                        <span className="shrink-0">Expires:</span>
                        <span>
                          {new Date(certificate.expiryDate).toLocaleDateString('en-US', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-purple-500/10">
                    <Link
                      href={certificate.certificateFile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <motion.button
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-1.5 md:gap-2 text-purple-400 hover:text-purple-300 tracking-wide text-sm md:text-base"
                      >
                        <span>View Certificate</span>
                        <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
                      </motion.button>
                    </Link>
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
                alt="Certificate Preview"
                fill
                className="object-contain"
                sizes="100vw"
                priority
                unoptimized
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}