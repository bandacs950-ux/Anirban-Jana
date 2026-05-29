import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Eye } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const loadingTexts = [
    'CALIBRATING APERTURE...',
    'CAPTURING LIGHT SPECTRUMS...',
    'CINEMATIC MODE ACTIVE...',
    'RENDER GOLDEN MOMENTS...'
  ];

  useEffect(() => {
    // Dynamic text cycle
    const textTimer = setInterval(() => {
      setTextIndex((prev) => (prev < loadingTexts.length - 1 ? prev + 1 : prev));
    }, 800);

    // Dynamic progress loader
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          clearInterval(textTimer);
          setTimeout(() => {
            onComplete();
          }, 600);
          return 100;
        }
        // Random elegant jump
        const increment = Math.floor(Math.random() * 12) + 5;
        return Math.min(prev + increment, 100);
      });
    }, 120);

    return () => {
      clearInterval(progressTimer);
      clearInterval(textTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      id="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 bg-[#070707] z-[9999] flex flex-col items-center justify-center text-white"
    >
      {/* Subtle geometric lens grid backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08),rgba(0,0,0,0))] pointer-events-none" />
      
      <div className="text-center relative z-10 max-w-md px-6">
        {/* Modern rotating aperture logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative inline-flex items-center justify-center p-5 mb-8"
        >
          <div className="absolute inset-0 rounded-full border border-[rgba(212,175,55,0.2)] animate-pulse" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
            className="w-16 h-16 rounded-full border-2 border-dashed border-[#d4af37] flex items-center justify-center"
          >
            <Camera className="w-8 h-8 text-[#d4af37]" />
          </motion.div>
        </motion.div>

        {/* Brand Name reveal */}
        <motion.h1
          initial={{ letterSpacing: '0.2em', opacity: 0, y: 15 }}
          animate={{ letterSpacing: '0.4em', opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="font-sans text-xs uppercase tracking-[0.4em] font-medium text-gray-400 mb-2"
        >
          KOLKATA PHOTO
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="font-serif text-2xl md:text-3xl font-light text-white tracking-wide mb-8"
        >
          Photography Studio
        </motion.h2>

        {/* Calibration HUD Indicator */}
        <div className="w-64 h-[1px] bg-gray-800 relative overflow-hidden mx-auto rounded mb-4">
          <motion.div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-transparent via-[#d4af37] to-white"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut' }}
          />
        </div>

        {/* HUD Info */}
        <div className="flex items-center justify-between font-mono text-[10px] text-gray-500 uppercase tracking-widest px-1">
          <AnimatePresence mode="wait">
            <motion.span
              key={textIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-[#d4af37]"
            >
              {loadingTexts[textIndex]}
            </motion.span>
          </AnimatePresence>
          <span className="text-white tabular-nums font-semibold">{progress}%</span>
        </div>
      </div>

      {/* Decorative calibration corner grids */}
      <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-gray-800 opacity-45 pointer-events-none" />
      <div className="absolute top-8 right-8 w-12 h-12 border-t border-r border-gray-800 opacity-45 pointer-events-none" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-b border-l border-gray-800 opacity-45 pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-gray-800 opacity-45 pointer-events-none" />
    </motion.div>
  );
}
