'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { SocialIcon } from '../ui/SocialIcons';
import { useState, useEffect } from 'react';
import type { Profile } from '@/src/lib/api/types';
import { getProfile } from '@/src/lib/api/services';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    };

    loadProfile();
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    onClose();
    setTimeout(() => {
      if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    }, 300);
  };

  const sidebarVariants = {
    initial: {
      x: '100%',
      opacity: 0,
      skewX: -5
    },
    open: {
      x: '0%',
      opacity: 1,
      skewX: 0,
      transition: {
        type: 'spring',
        stiffness: 70,
        damping: 20,
        mass: 1,
        when: 'beforeChildren',
        staggerChildren: 0.1
      }
    },
    closed: {
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
        when: 'afterChildren',
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const menuItemVariants = {
    initial: {
      x: 100,
      opacity: 0,
      skewX: -10
    },
    open: {
      x: 0,
      opacity: 1,
      skewX: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        mass: 1
      }
    },
    closed: {
      x: 50,
      opacity: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40
      }
    }
  };

  const backdropVariants = {
    initial: {
      opacity: 0,
      scale: 0.9
    },
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    closed: {
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  const socialIconVariants = {
    initial: {
      scale: 0,
      opacity: 0,
      rotate: -180
    },
    open: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15
      }
    },
    closed: {
      scale: 0,
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  const menuItems = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Certificate', href: '/certificates' },
    { name: 'Organizations', href: '/organizations' },
    { name: 'Experience', id: 'experience' },
    { name: 'Projects', id: 'projects' }
  ];

  const availableSocialLinks =
    profile?.socialLinks
      .filter((link) => link.isActive)
      .map((link) => ({
        platform: link.platform.toLowerCase(),
        link: link.url
      })) || [];

  if (profile?.email) {
    availableSocialLinks.push({
      platform: 'email',
      link: `mailto:${profile.email}`
    });
  }

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            initial="initial"
            animate="open"
            exit="closed"
            variants={backdropVariants}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />

          <motion.div
            initial="initial"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            className="fixed right-0 top-0 bottom-0 w-full max-w-[500px] bg-[#1a191d]/95 backdrop-blur-lg z-50 font-serif"
          >
            {/* Header with 3D effect */}
            <motion.div
              variants={menuItemVariants}
              className="flex justify-between items-center p-8 relative"
              style={{
                perspective: '1000px'
              }}
            >
              <motion.h2
                className="text-xl font-medium text-gray-100 font-heading tracking-wide"
                whileHover={{
                  rotateX: [0, 15, 0],
                  transition: { duration: 0.5 }
                }}
              >
                Navigation
              </motion.h2>

              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="rounded-full bg-white/10 p-2 text-gray-100"
              >
                <X size={20} />
              </motion.button>
            </motion.div>

            {/* Menu Items with slide and fade effect */}
            <nav className="px-8 py-4">
              <div className="space-y-4">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.id || item.href}
                    custom={index}
                    variants={menuItemVariants}
                    whileHover={{ x: 10 }}
                    className="overflow-hidden"
                  >
                    <a
                      href={item.href || `#${item.id}`}
                      onClick={(e) => (item.href ? onClose() : handleLinkClick(e, item.id))}
                      className="text-2xl font-heading tracking-wider text-gray-100 hover:text-purple-400 transition-colors block relative"
                    >
                      <span className="relative z-10">{item.name}</span>
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-white/5 origin-left"
                      />
                    </a>
                  </motion.div>
                ))}
              </div>
            </nav>

            {/* Bottom Section with stagger effect */}
            <motion.div
              variants={menuItemVariants}
              className="absolute bottom-0 left-0 right-0 p-8 space-y-8"
            >
              <div className="space-y-4">
                <motion.h2
                  variants={menuItemVariants}
                  className="text-2xl font-heading tracking-wide text-gray-100"
                  whileHover={{
                    x: 5,
                    transition: { duration: 0.2 }
                  }}
                >
                  Get In Touch
                </motion.h2>
                <motion.div variants={menuItemVariants} className="space-y-2">
                  {profile?.email && (
                    <motion.a
                      href={`mailto:${profile.email}`}
                      className="text-sm text-gray-300 hover:text-purple-400 transition-colors tracking-wide block"
                      whileHover={{ x: 5 }}
                    >
                      {profile.email}
                    </motion.a>
                  )}
                  {profile?.location && (
                    <p className="text-sm text-gray-300 tracking-wide">{profile.location}</p>
                  )}
                </motion.div>
              </div>

              {/* Social Icons with rotating entry */}
              <motion.div variants={menuItemVariants} className="flex flex-wrap gap-4">
                {availableSocialLinks.map(({ platform, link }, index) => (
                  <motion.a
                    key={platform}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={socialIconVariants}
                    whileHover={{
                      scale: 1.2,
                      rotate: 360,
                      transition: { duration: 0.5 }
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    <SocialIcon platform={platform} size={24} />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
