'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import Sidebar from './Sidebar';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50  backdrop-blur-md "
      >
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/" className="text-2xl font-bold">
                DS
              </Link>
            </motion.div>

            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className="text-2xl font-light"
                aria-label="Toggle menu"
              >
                =
              </motion.button>
            </div>
          </div>
        </nav>
      </motion.header>

      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}