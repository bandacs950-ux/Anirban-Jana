import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, ChevronDown, Award, Sparkles, Film } from 'lucide-react';
import { playCameraShutter, playHoverClick } from '../utils/audio';

const slides = [
  {
    image: '/src/assets/images/couple_red_veil_1779785266356.png',
    title: 'THE ART OF HAPPINESS',
    tag: 'ELEGANT WEDDING EXPERIENCE'
  },
  {
    image: '/src/assets/images/bengali_groom_lux_1779785215358.png',
    title: 'CINEMATIC SOUL STORIES',
    tag: 'COUPLE PORTRAITS'
  },
  {
    image: '/src/assets/images/bengali_bride_royal_1779785186925.png',
    title: 'ROYAL BRIDAL ESSENCE',
    tag: 'FASHION & GLAMOUR'
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Soft mouse movement parallax for the floating 3D portrait
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) / (width / 2);
      const y = (e.clientY - top - height / 2) / (height / 2);
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleBookClick = () => {
    playCameraShutter();
    const target = document.querySelector('#booking');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePortfolioClick = () => {
    playHoverClick();
    const target = document.querySelector('#portfolio');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={containerRef}
      id="home"
      className="relative w-full h-screen overflow-hidden bg-[#030303] flex items-center justify-center select-none"
    >
      {/* 1. Fullscreen Zoom Background Slider (Ken Burns Effect) */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          {slides.map((slide, idx) => {
            if (idx !== currentSlide) return null;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 1.15 }}
                animate={{ opacity: 0.45, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 2.2, ease: 'easeOut' }}
                className="absolute inset-0 w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
              />
            );
          })}
        </AnimatePresence>
        
        {/* Deep luxurious lighting gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,#050505_95%)]" />
      </div>

      {/* 2. Content Layout Grid */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-6 md:px-12 h-full flex flex-col justify-center pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Cinematic Storyteller Portion */}
          <div className="lg:col-span-7 flex flex-col text-left">
            {/* Minimal Tagline banner */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="inline-flex items-center gap-2 mb-4 md:mb-6 self-start bg-white/5 border border-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] tracking-[0.3em] text-[#d4af37] font-sans font-semibold uppercase"
            >
              <Award className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>4.8 ★ RATED (132 REVIEWS)</span>
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
            </motion.div>

            {/* Custom display heading */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-extralight text-white leading-[1.1] mb-6 tracking-wide">
              Capturing{' '}
              <span className="block font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-[#d4af37] to-white tracking-normal font-light">
                Moments
              </span>{' '}
              That Last Forever
            </h1>

            {/* Luxurious Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1 }}
              className="font-sans text-sm md:text-base text-gray-300 font-light max-w-lg mb-10 leading-relaxed tracking-wider"
            >
              Luxury Wedding, Portrait &amp; Cinematic Photography Experiences inside Kasba, Kolkata. Tailored lighting, majestic narratives, and hand-bound custom heirloom albums.
            </motion.p>

            {/* Micro details hud parameters */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 1.4, duration: 1 }}
              className="flex items-center gap-8 text-[9px] font-mono text-gray-400 tracking-[0.2em] mb-12"
            >
              <div className="flex items-center gap-1.5">
                <Film className="w-3.5 h-3.5 text-amber-500" />
                <span>SHUTTER: 1/250s</span>
              </div>
              <div><span>APERTURE: f/1.2</span></div>
              <div><span>ISO: 100</span></div>
              <div className="hidden sm:block"><span>LENS: 50MM PRIME F1.2L</span></div>
            </motion.div>

            {/* Button container */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="flex flex-wrap items-center gap-5"
            >
              <button
                onClick={handleBookClick}
                className="group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-amber-500 to-[#d4af37] text-black text-xs font-semibold tracking-[0.3em] uppercase rounded shadow-lg transition-transform duration-300 active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-2">
                  BOOK A SHOOT <Calendar className="w-3.5 h-3.5" />
                </span>
                <span className="absolute inset-0 bg-white opacity-20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              </button>

              <button
                onClick={handlePortfolioClick}
                className="group px-8 py-4 border border-white/20 bg-white/5 backdrop-blur-md rounded text-white text-xs font-semibold tracking-[0.3em] uppercase hover:bg-white hover:text-black hover:border-white transition-all duration-300 transform active:scale-95"
              >
                VIEW PORTFOLIO
              </button>
            </motion.div>
          </div>

          {/* Floating 3D Portrait Mockup Frame (Right Side) */}
          <div className="lg:col-span-5 hidden lg:flex justify-center select-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotateY: mousePos.x * 12,
                rotateX: -mousePos.y * 12,
              }}
              transition={{ type: 'spring', damping: 20, stiffness: 80 }}
              className="relative w-80 h-[420px] rounded-lg bg-[#070707] p-4 shadow-[0_25px_60px_rgba(0,0,0,0.9)] border border-white/10"
              style={{
                perspective: 1000,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Photo component */}
              <div className="relative w-full h-[320px] rounded overflow-hidden mb-4 group">
                {/* Simulated Lens flare overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/40 pointer-events-none z-10" />
                <motion.div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: 'url(/src/assets/images/bengali_bride_glam_1779785247589.png)',
                    transform: `translateX(${mousePos.x * 10}px) translateY(${mousePos.y * 10}px)`,
                  }}
                  transition={{ ease: 'easeOut', duration: 0.4 }}
                />
                
                {/* Grid HUD indicator */}
                <div className="absolute inset-0 border border-white/5 pointer-events-none" />
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 flex items-center justify-between" />
                <div className="absolute left-1/2 top-0 w-[1px] h-full bg-white/5" />
              </div>

              {/* Physical polaroid branding indicator */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="block font-sans text-[10px] tracking-widest text-[#d4af37] font-bold">KOLKATA PHOTO STUDIO</span>
                  <span className="block font-mono text-[8px] text-gray-500">63B, 1P, SWINHOE LN. KASBA 700039</span>
                </div>
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/5">
                  <Sparkles className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" />
                </div>
              </div>

              {/* Decorative side ruler ticks */}
              <div className="absolute top-4 -left-1 flex flex-col gap-1 text-[8px] text-gray-600 font-mono">
                <span>01</span>
                <span>—</span>
                <span>02</span>
                <span>—</span>
                <span>03</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* 3. Slider index bubbles */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:flex items-center gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              playHoverClick();
              setCurrentSlide(idx);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentSlide ? 'w-8 bg-[#d4af37]' : 'w-2 bg-gray-600'
            }`}
          />
        ))}
      </div>

      {/* 4. Elegant Scroll Down Progress Indicator */}
      <div className="absolute bottom-12 right-12 z-10 hidden sm:flex flex-col items-center gap-3 text-gray-400">
        <span className="font-sans text-[9px] tracking-[0.3em] uppercase font-semibold text-gray-400 rotate-90 origin-bottom translate-y-[-20px]">
          SCROLL DOWN
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="cursor-pointer"
          onClick={() => {
            playHoverClick();
            const aboutSec = document.querySelector('#about');
            if (aboutSec) aboutSec.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <ChevronDown className="w-5 h-5 text-[#d4af37]" />
        </motion.div>
      </div>
    </div>
  );
}
