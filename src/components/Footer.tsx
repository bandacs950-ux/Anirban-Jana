import React from 'react';
import { Camera, Mail, Phone, MapPin, Clock, ArrowUp, Instagram, Facebook, Youtube } from 'lucide-react';
import { playHoverClick, playCameraShutter } from '../utils/audio';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollTop = () => {
    playCameraShutter();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickLink = (href: string) => {
    playHoverClick();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative w-full bg-[#030303] text-gray-400 overflow-hidden z-20 font-sans border-t border-white/5">
      {/* Decorative linear lines */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent" />

      {/* Primary Footer Content Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Column 1: Grand Brand Summary */}
          <div className="lg:col-span-4 text-left">
            <div className="flex items-center gap-3 mb-6 select-none cursor-pointer" onClick={() => handleQuickLink('#home')}>
              <div className="relative">
                <Camera className="w-8 h-8 text-[#d4af37]" />
                <span className="absolute -inset-1 rounded-full bg-[#d4af37]/20 blur-md pointer-events-none" />
              </div>
              <div>
                <span className="block font-sans text-sm tracking-[0.2em] font-semibold text-white">
                  KOLKATA PHOTO
                </span>
                <span className="block font-sans text-[9px] tracking-[0.15em] text-gray-500 uppercase font-light">
                  Photography Studio
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-400 font-light leading-relaxed mb-8 max-w-sm">
              We compile light waves and emotional expressions into gorgeous, premium photographic memories. Dedicated to crafting luxury masterpieces that are cherished for generations.
            </p>

            {/* Premium Social media icons link circles */}
            <div className="flex items-center gap-3.5">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                onClick={playHoverClick}
                className="w-10 h-10 rounded-full border border-white/5 bg-white/[0.02] hover:bg-[#d4af37]/10 hover:border-[#d4af37] text-gray-400 hover:text-[#d4af37] transition-all flex items-center justify-center"
                aria-label="Facebook Link"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                onClick={playHoverClick}
                className="w-10 h-10 rounded-full border border-white/5 bg-white/[0.02] hover:bg-[#d4af37]/10 hover:border-[#d4af37] text-gray-400 hover:text-[#d4af37] transition-all flex items-center justify-center"
                aria-label="Instagram Link"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                onClick={playHoverClick}
                className="w-10 h-10 rounded-full border border-white/5 bg-white/[0.02] hover:bg-[#d4af37]/10 hover:border-[#d4af37] text-gray-400 hover:text-[#d4af37] transition-all flex items-center justify-center"
                aria-label="Youtube Link"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links list */}
          <div className="lg:col-span-2 text-left">
            <h4 className="font-sans text-[11px] font-semibold tracking-[0.25em] text-white uppercase mb-6 pb-2 border-b border-white/5">
              QUICK ROADS
            </h4>
            <ul className="space-y-3.5 text-xs font-light">
              {[
                { label: 'HOME PORTAL', href: '#home' },
                { label: 'ABOUT HERITAGE', href: '#about' },
                { label: 'STUDIO GENRES', href: '#services' },
                { label: 'PHOTO ARCHIVES', href: '#portfolio' },
                { label: 'WHY CHOOSE US', href: '#why-us' },
                { label: 'BOOKING PORTAL', href: '#booking' }
              ].map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleQuickLink(link.href)}
                    className="hover:text-[#d4af37] transition-colors uppercase tracking-wider"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Fine Specialties list */}
          <div className="lg:col-span-3 text-left">
            <h4 className="font-sans text-[11px] font-semibold tracking-[0.25em] text-white uppercase mb-6 pb-2 border-b border-white/5">
              PRESTIGE GENRES
            </h4>
            <ul className="space-y-3.5 text-xs font-light">
              {[
                'Wedding Chronicles',
                'Bridal Close-Ups',
                'Sunset Couple Shoots',
                'High Fashion & Glamour',
                'Corporate PR Headshots',
                'Old Photo Restorations',
                'Fine Framing & Albums'
              ].map((srv) => (
                <li key={srv}>
                  <button
                    onClick={() => handleQuickLink('#services')}
                    className="hover:text-white transition-colors"
                  >
                    {srv}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Bio Information */}
          <div className="lg:col-span-3 text-left space-y-4">
            <h4 className="font-sans text-[11px] font-semibold tracking-[0.25em] text-white uppercase mb-6 pb-2 border-b border-white/5">
              CONTACT DESK
            </h4>
            
            <div className="flex gap-3 text-xs leading-relaxed">
              <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
              <p className="font-light">
                63B, 1P, Swinhoe Ln.,<br />
                Post, Kasba, Kolkata,<br />
                West Bengal 700039
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <Phone className="w-4 h-4 text-[#d4af37]" />
              <a href="tel:09330794021" className="text-white hover:text-[#d4af37] font-mono tracking-wider">
                093307 94021
              </a>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <Clock className="w-4 h-4 text-[#d4af37]" />
              <p className="font-light">Open 24 Hours</p>
            </div>
          </div>

        </div>

        {/* Bottom copyright details bar */}
        <div className="mt-16 md:mt-24 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
              &copy; {currentYear} KOLKATA PHOTOGRAPHY STUDIO. ALL RIGHTS PRESERVED.
            </p>
            <p className="text-[9px] text-gray-600 font-sans mt-1">
              Handcrafted in Kolkata to deliver award-winning premium cinematic memories.
            </p>
          </div>

          {/* Scroll back to top floating */}
          <button
            onClick={handleScrollTop}
            className="flex items-center gap-2 px-4 py-2 border border-white/5 bg-white/[0.01] hover:bg-[#d4af37]/10 hover:border-[#d4af37] text-xs font-semibold tracking-widest uppercase transition-colors rounded group"
            title="Scroll back to Top"
          >
            <span>SCROLL TO CEILING</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-1" />
          </button>
        </div>

      </div>
    </footer>
  );
}
