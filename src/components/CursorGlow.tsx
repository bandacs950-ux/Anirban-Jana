import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { playHoverClick } from '../utils/audio';

export default function CursorGlow() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Position for the main ring/aura
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs for high-end feel
  const springConfig = { damping: 25, stiffness: 220, mass: 0.8 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device supports fine hover interactions (exclude mobile touch)
    const mediaQuery = window.matchMedia('(any-hover: hover)');
    if (!mediaQuery.matches) {
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeaveWindow = () => setIsVisible(false);
    const handleMouseEnterWindow = () => setIsVisible(true);

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Event listeners for automatic hover detection on luxury interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.classList.contains('interactive-hover')
      ) {
        setIsHovered(true);
        // Play minimal luxurious tick
        playHoverClick();
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.classList.contains('interactive-hover')
      ) {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* 1. Large Ambient Aura Light Background (Cursor Spotlight) */}
      <motion.div
        id="cursor-ambient"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 1.5 : 1,
          opacity: isHovered ? 0.2 : 0.08,
        }}
        className="fixed top-0 left-0 w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.3)_0%,rgba(0,0,0,0)_70%)] pointer-events-none z-[10] mix-blend-screen"
      />

      {/* 2. Precision Pointer Camera Lens/Aperture Crosshair Ring */}
      <motion.div
        id="cursor-ring"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovered ? 1.4 : 1,
          borderColor: isHovered ? 'rgba(212,175,55,1)' : 'rgba(255,255,255,0.4)',
          borderWidth: isHovered ? '1.5px' : '1px',
        }}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/40 pointer-events-none z-[1000] flex items-center justify-center mix-blend-difference"
      >
        {/* Cinematic central focus indicator dots */}
        <motion.div
          animate={{
            scale: isHovered ? 0 : 1,
          }}
          className="w-1.5 h-1.5 rounded-full bg-white"
        />
        {/* Subtle camera frame corners shown when hovered */}
        {isHovered && (
          <div className="absolute inset-[-4px] opacity-100 flex items-center justify-center">
            <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-[#d4af37]" />
            <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-[#d4af37]" />
            <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-[#d4af37]" />
            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-[#d4af37]" />
          </div>
        )}
      </motion.div>
    </>
  );
}
