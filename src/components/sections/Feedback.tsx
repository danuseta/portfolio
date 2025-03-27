'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { submitFeedback } from '@/src/lib/api/services';
import SectionTitle from '../ui/SectionTitle';
import SectionBackground from '../ui/SectionBackground';

export default function Feedback() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await submitFeedback(formData);
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setLoading(false);
    }
  };

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
    <section className="py-12 md:py-20 relative">
      <SectionBackground variant="purple" density="medium" />
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <SectionTitle title="Feedback" subtitle="Share your thoughts to help me improve" />
          </motion.div>

          <motion.div variants={containerVariants} className="max-w-2xl mx-auto">
            <motion.div
              variants={itemVariants}
              className="bg-white/5 backdrop-blur-lg rounded-xl md:rounded-2xl p-4 md:p-8 relative overflow-hidden
                        hover:bg-white/10 transition-all duration-500"
            >
              {/* Background Gradient */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />

              <form onSubmit={handleSubmit} className="relative z-10 space-y-4 md:space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5 md:mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 md:px-4 py-2 md:py-3 bg-white/5 border border-purple-500/20 rounded-lg 
                             focus:ring-2 focus:ring-purple-500/50 focus:border-transparent
                             text-sm md:text-base text-gray-200 placeholder-gray-400
                             transition-colors duration-200"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5 md:mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 md:px-4 py-2 md:py-3 bg-white/5 border border-purple-500/20 rounded-lg 
                             focus:ring-2 focus:ring-purple-500/50 focus:border-transparent
                             text-sm md:text-base text-gray-200 placeholder-gray-400
                             transition-colors duration-200"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5 md:mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 md:px-4 py-2 md:py-3 bg-white/5 border border-purple-500/20 rounded-lg 
                             focus:ring-2 focus:ring-purple-500/50 focus:border-transparent
                             text-sm md:text-base text-gray-200 placeholder-gray-400
                             transition-colors duration-200"
                    placeholder="Your message..."
                  />
                </div>

                <div className="flex justify-center pt-2 md:pt-4">
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{
                      scale: 1.02,
                      x: 5,
                      backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 text-purple-400 hover:text-purple-300 
                             bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full transition-colors
                             disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="font-semibold tracking-wide">
                      {loading ? 'Sending...' : 'Send Feedback'}
                    </span>
                    <Send className="w-4 h-4 md:w-5 md:h-5" />
                  </motion.button>
                </div>

                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-sm md:text-base text-green-400 bg-green-400/10 rounded-lg p-3 md:p-4"
                  >
                    Thank you for your feedback!
                  </motion.div>
                )}
              </form>
            </motion.div>
          </motion.div>

          {/* Decorative Elements */}
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
            className="absolute -right-10 top-1/4 w-24 md:w-32 h-24 md:h-32 bg-purple-500/10 rounded-full blur-3xl"
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
            className="absolute -left-10 bottom-1/4 w-32 md:w-40 h-32 md:h-40 bg-blue-500/10 rounded-full blur-3xl"
          />
        </motion.div>
      </div>
    </section>
  );
}