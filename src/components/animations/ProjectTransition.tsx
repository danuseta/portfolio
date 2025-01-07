'use client';

import { motion } from 'framer-motion';
import LoadingScreen from './LoadingScreen';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProjectTransition() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/projects');
    }, 100);

    return () => clearTimeout(timer);
  }, [router]);

  return <LoadingScreen />;
}
