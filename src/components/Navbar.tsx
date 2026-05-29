import React, { useState, useEffect } from 'react';
import { Camera, Menu, X, Phone, CalendarRange } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { playHoverClick, playCameraShutter } from '../utils/audio';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'HOME', href: '#home' },
    { label: 'ABOUT & WORK', href: '#about' },
    { label: 'SERVICES', href: '#services' },
    { label: 'GALLERY', href: '#portfolio' },
    { label: 'WHY US', href: '#why-us' },
    { label: 'REVIEWS', href: '#testimonials' },
    { label: 'BOOKING', href: '#booking' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    playHoverClick();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const triggerCallToAction = () => {
    playCameraShutter();
    const bookingSec = document.querySelector('#booking');
    if (bookingSec) {
      bookingSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#050505]/80 backdrop-blur-md py-4 border-b border-gold-500/10 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div 
            onClick={() => handleLinkClick('#home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="relative">
              <Camera className="w-8 h-8 text-[#d4af37] transition-transform duration-500 group-hover:rotate-[360deg]" />
              <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-yellow-600 to-amber-400 opacity-20 blur-md group-hover:opacity-40 transition-opacity" />
            </div>
            <div>
              <span className="block font-sans text-xs sm:text-sm tracking-[0.1em] sm:tracking-[0.2em] font-semibold text-white group-hover:text-[#d4af37] transition-colors">
                KOLKATA PHOTO
              </span>
              <span className="block font-sans text-[9px] tracking-[0.15em] text-gray-400 uppercase font-light">
                Photography Studio
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/[0.04] border border-white/5 text-[9px] text-[#d4af37] font-mono leading-none ml-1">
              <span>4.8 ★</span>
              <span className="text-gray-500 font-sans">•</span>
              <span className="text-gray-400 font-sans font-light">(132)</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="relative text-[11px] font-sans tracking-[0.25em] text-gray-300 hover:text-[#d4af37] py-2 transition-colors duration-300 before:absolute before:bottom-0 before:left-0 before:w-full before:h-[1px] before:bg-[#d4af37] before:scale-x-0 hover:before:scale-x-100 before:origin-right hover:before:origin-left before:transition-transform before:duration-300 font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Call to action CTAs */}
          <div className="hidden sm:flex items-center gap-4">
            <a 
              href="tel:09330794021"
              onClick={playHoverClick}
              className="flex items-center gap-2 text-[11px] font-sans font-medium tracking-widest text-[#d4af37] border border-[#d4af37]/20 bg-[#d4af37]/5 px-4 py-2 rounded hover:bg-[#d4af37]/20 transition-all font-mono"
            >
              <Phone className="w-3 h-3 text-[#d4af37]" />
              <span>093307 94021</span>
            </a>
            
            <button
              onClick={triggerCallToAction}
              className="relative px-5 py-2.5 bg-gradient-to-r from-amber-500 to-[#d4af37] text-black text-[11px] font-sans font-bold tracking-[0.25em] uppercase rounded shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.45)] hover:scale-[1.02] active:scale-95 transition-all outline-none"
            >
              BOOK SHOOT
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center gap-4">
            <button
              onClick={() => {
                playHoverClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="text-white hover:text-[#d4af37] focus:outline-none p-1"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </motion.nav>

      {/* Mobile Sidebar Panel Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-80 bg-[#070707]/95 border-l border-white/5 backdrop-blur-xl z-[48] p-8 flex flex-col justify-between pt-28 shadow-2xl"
          >
            {/* Nav links list */}
            <div className="flex flex-col gap-6">
              <span className="font-sans text-[10px] tracking-[0.40em] text-gray-500 font-bold uppercase block border-b border-white/5 pb-2">
                NAVIGATION
              </span>
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className="text-white text-sm tracking-[0.2em] font-light hover:text-[#d4af37] transition-colors py-1 block"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Micro Details contact details inside sidebar */}
            <div className="flex flex-col gap-4 border-t border-white/5 pt-8">
              <div className="text-gray-400 font-mono text-[10px] space-y-1">
                <span className="block font-semibold text-white tracking-widest text-[11px] mb-2 uppercase">
                  CONTACT STUDIO
                </span>
                <p>📍 Swinhoe Ln., Kasba,</p>
                <p>Kolkata, West Bengal 700039</p>
                <p className="text-[#d4af37] mt-1 font-sans font-medium text-xs">
                  📞 093307 94021
                </p>
              </div>

              <button
                onClick={triggerCallToAction}
                className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-amber-500 to-[#d4af37] text-black text-xs font-bold tracking-widest uppercase rounded shadow-lg"
              >
                <CalendarRange className="w-4 h-4" />
                <span>BOOK SESSION NOW</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
