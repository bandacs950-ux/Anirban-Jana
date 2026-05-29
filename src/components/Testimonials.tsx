import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote, MessageSquare } from 'lucide-react';
import { playHoverClick } from '../utils/audio';

const testimonialsData = [
  {
    id: 'rev-1',
    name: 'Anirudh & Ritika Sen',
    role: 'Grand Wedding Couple',
    text: 'Amazing photography and cinematic editing quality! Kartik and his team captured our traditional Bengali wedding with sheer patience and artistry. The hand-bound heritage leather album is a pure family treasure. Highly recommend their live stream videography!',
    rating: 5,
    date: 'January 2026',
    avatar: 'A'
  },
  {
    id: 'rev-2',
    name: 'Priyanka Mukhopadhyay',
    role: 'Bridal Portrait Series',
    text: 'Captured our wedding beautifully. I was extremely nervous during my individual bridal shoots, but the team gave such polite directions and adjusted optimal key lighting. The final photos feel like high-fashion cinematic moments rather than dull snapshots. Unbelievable precision!',
    rating: 5,
    date: 'March 2026',
    avatar: 'P'
  },
  {
    id: 'rev-3',
    name: 'Sayantan & Debalina',
    role: 'Sunset Pre-Wedding Shoot',
    text: 'Professional service and premium results. We did an outdoor golden hour couple shoot at Midnapore. Kartik came equipped with heavy prime lenses, generating gorgeous bokeh backgrounds without any artificial filter feel. The turnaround delivery was incredibly fast!',
    rating: 5,
    date: 'December 2025',
    avatar: 'S'
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevReview = () => {
    playHoverClick();
    setActiveIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const nextReview = () => {
    playHoverClick();
    setActiveIndex((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="relative w-full py-24 sm:py-32 bg-[#050505] overflow-hidden z-20">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-sans text-[10px] tracking-[0.4em] text-[#d4af37] font-semibold uppercase mb-3 block">
            VERIFIED CLIENT LOVE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-wide">
            Client <span className="italic text-gray-400">Testimonials</span>
          </h2>
          <p className="mt-3 font-sans text-[11px] text-[#d4af37] font-mono tracking-widest uppercase">
            AVERAGE RATING: 4.9 ⭐ (7 LOCAL VERIFIED REVIEWS)
          </p>
        </div>

        {/* Carousel Slider Card (Glassmorphic) */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="relative p-8 md:p-14 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-md rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-10 text-left"
            >
              {/* Massive back Quote watermark */}
              <Quote className="absolute top-8 right-8 w-24 h-24 text-white/[0.02] pointer-events-none" />

              {/* Five Star indicator */}
              <div className="flex items-center gap-1 mb-8">
                {[...Array(testimonialsData[activeIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#d4af37] text-[#d4af37]" />
                ))}
                <span className="text-xs font-mono text-gray-500 uppercase tracking-widest ml-3">
                  {testimonialsData[activeIndex].date}
                </span>
              </div>

              {/* Opinion text */}
              <p className="font-serif text-lg md:text-xl font-light text-white leading-relaxed mb-8 select-all">
                &ldquo;{testimonialsData[activeIndex].text}&rdquo;
              </p>

              {/* Author biographical metadata block */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 flex items-center justify-center font-serif text-lg text-[#d4af37] font-semibold select-none">
                  {testimonialsData[activeIndex].avatar}
                </div>
                <div>
                  <h4 className="font-sans text-xs font-semibold text-white uppercase tracking-wider">
                    {testimonialsData[activeIndex].name}
                  </h4>
                  <p className="font-mono text-[9px] text-[#d4af37] tracking-widest uppercase mt-0.5">
                    {testimonialsData[activeIndex].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Left / Right floating Slider controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Index Bullet Indicators */}
            <div className="flex items-center gap-2">
              {testimonialsData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    playHoverClick();
                    setActiveIndex(idx);
                  }}
                  className={`h-1 cursor-pointer transition-all duration-300 ${
                    idx === activeIndex ? 'w-6 bg-[#d4af37]' : 'w-2 bg-gray-700'
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={prevReview}
                className="p-3 border border-white/5 rounded bg-white/[0.01] hover:bg-white/5 text-gray-400 hover:text-white transition-all transform active:scale-95"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextReview}
                className="p-3 border border-white/5 rounded bg-white/[0.01] hover:bg-white/5 text-gray-400 hover:text-white transition-all transform active:scale-95"
                aria-label="Next review"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
