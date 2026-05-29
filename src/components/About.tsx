import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { Star, Users, Camera, Sparkles, Sliders, Play, Trash } from 'lucide-react';
import { playHoverClick, playCameraShutter } from '../utils/audio';

// Dynamic Stats data
const statsData = [
  { value: 4.9, suffix: ' ★', text: 'Google Studio Rating', sub: 'From 7 verified local reviews' },
  { value: 500, suffix: '+', text: 'Happy Couples & Clients', sub: 'Indian Weddings & Portraits' },
  { value: 10000, suffix: '+', text: 'Exquisite Photos Shared', sub: 'High-res memory delivery' },
  { value: 21, suffix: '+', text: 'Unique Premium Services', sub: 'Restoration, Live & Printing' }
];

export default function About() {
  // Before/After comparison slider percentage
  const [sliderPos, setSliderPos] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isSliding, setIsSliding] = useState(false);

  // Animated Count-Up Logic when scrolled in view
  const statsSectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(statsSectionRef, { once: true, amount: 0.2 });
  const [animatedStats, setAnimatedStats] = useState([0, 0, 0, 0]);

  useEffect(() => {
    if (isInView) {
      const duration = 2000; // 2s
      const steps = 60;
      const stepTime = duration / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        setAnimatedStats(() => {
          return statsData.map((stat) => {
            const progress = currentStep / steps;
            const currentVal = progress * stat.value;
            // Round nicely
            if (stat.value % 1 === 0) {
              return Math.floor(currentVal);
            } else {
              return Math.round(currentVal * 10) / 10;
            }
          });
        });

        if (currentStep >= steps) {
          clearInterval(timer);
          // Set to final correct numbers
          setAnimatedStats(statsData.map(s => s.value));
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isInView]);

  // Handle Before After Slider mouse movement
  const handleMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isSliding) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <section id="about" className="relative w-full py-24 sm:py-32 bg-[#050505] overflow-hidden z-20">
      {/* Visual top dividers */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Brand Bio and Equipment Details */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            <span className="font-sans text-[10px] tracking-[0.4em] text-[#d4af37] font-semibold uppercase mb-3 block">
              OUR LUXURY HERITAGE
            </span>
            
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white leading-tight tracking-wide mb-8">
              Documenting Love, <span className="italic text-gray-400">Atmosphere</span> &amp; Cinematic Depth
            </h2>

            <div className="space-y-6 text-gray-300 font-sans text-sm font-light tracking-wide leading-relaxed">
              <p>
                Founded near the cultural pulse of Kolkata, West Bengal, <strong>Kolkata Photography Studio</strong> has spent years translating moments into breathtaking, premium visual legacies. Our philosophy rejects standard snapshots in favor of cinematic lighting, intense color harmony, and raw, genuine emotional storytelling.
              </p>
              <p>
                From glamorous bridal close-ups to sprawling wedding events, each shoot utilizes heavy-caliber professional equipment, state-of-the-art focal lenses, and an unmatched custom key-light design.
              </p>
            </div>

            {/* Quality credentials lists */}
            <div className="grid grid-cols-2 gap-6 mt-10">
              <div className="flex gap-3">
                <div className="w-10 h-10 shrink-0 rounded-full border border-[#d4af37]/20 bg-[#d4af37]/5 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#d4af37]" />
                </div>
                <div>
                  <h4 className="font-sans text-xs font-semibold text-white uppercase tracking-widest mb-1">CINEMATIC STYLING</h4>
                  <p className="text-[11px] text-gray-400 leading-normal">Bespoke color-grading with dramatic lighting patterns.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-10 h-10 shrink-0 rounded-full border border-[#d4af37]/20 bg-[#d4af37]/5 flex items-center justify-center">
                  <Camera className="w-4 h-4 text-[#d4af37]" />
                </div>
                <div>
                  <h4 className="font-sans text-xs font-semibold text-white uppercase tracking-widest mb-1">ELITE GEAR SELECTION</h4>
                  <p className="text-[11px] text-gray-400 leading-normal">Native F/1.2 primes, high-end full-frame SLR cameras.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Before/After Color Grading Comparison */}
          <div className="lg:col-span-6 flex flex-col items-center">
            
            <div className="w-full text-center lg:text-left mb-6">
              <span className="inline-flex items-center gap-1.5 text-[9px] font-mono tracking-[0.25em] text-gray-400 uppercase bg-white/5 border border-white/5 px-3 py-1 rounded">
                <Sliders className="w-3 h-3 text-[#d4af37]" />
                Interactive Enhancement Calibration
              </span>
            </div>

            {/* Before After Box Container Wrapper */}
            <div
              ref={sliderRef}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              onMouseUp={() => setIsSliding(false)}
              onMouseLeave={() => setIsSliding(false)}
              onTouchEnd={() => setIsSliding(false)}
              className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] cursor-ew-resize select-none"
            >
              {/* After Layer (Vibrant, high contrast, warm cinematic grade) */}
              <div className="absolute inset-0 z-0">
                <img
                  src="/src/assets/images/bride_vermilion_lux_1779785318869.png"
                  alt="After Grade"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* HUD Overlay Label AFTER */}
                <span className="absolute bottom-4 right-4 z-10 text-[10px] font-mono tracking-widest bg-black/70 backdrop-blur border border-white/10 px-3 py-1 text-[#d4af37] font-semibold uppercase rounded">
                  AFTER: CINEMATIC RESTORATION
                </span>
              </div>

              {/* Before Layer (Desaturated, blurred, dull grey) */}
              <div
                className="absolute inset-0 z-10 overflow-hidden"
                style={{ width: `${sliderPos}%` }}
              >
                <img
                  src="/src/assets/images/bride_vermilion_lux_1779785318869.png"
                  alt="Before Raw"
                  className="absolute inset-0 w-full h-[400px] object-cover max-w-none grayscale opacity-75 blur-[2.5px] brightness-75 filter"
                  style={{ width: sliderRef.current?.offsetWidth || '100%', height: '100%' }}
                  referrerPolicy="no-referrer"
                />

                {/* HUD Overlay Label BEFORE */}
                <span className="absolute bottom-4 left-4 z-10 text-[10px] font-mono tracking-widest bg-black/70 backdrop-blur border border-white/10 px-3 py-1 text-gray-400 font-semibold uppercase rounded">
                  BEFORE: PASSIVE EDIT
                </span>
              </div>

              {/* Slider boundary Bar Handle */}
              <div
                className="absolute top-0 bottom-0 z-20 w-[2px] bg-[#d4af37] shadow-[0_0_15px_#d4af37]"
                style={{ left: `${sliderPos}%` }}
                onMouseDown={() => {
                  playHoverClick();
                  setIsSliding(true);
                }}
                onTouchStart={() => {
                  playHoverClick();
                  setIsSliding(true);
                }}
              >
                {/* Trigger circular icon dial */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#111] border-2 border-[#d4af37] flex items-center justify-center shadow-lg cursor-pointer">
                  <Sliders className="w-3.5 h-3.5 text-[#d4af37]" />
                </div>
              </div>

              {/* Instruction banner overlay */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none bg-black/60 px-4 py-1.5 rounded-full border border-white/5 animate-pulse">
                <span className="text-[9px] text-[#e2e8f0] font-sans tracking-widest uppercase font-semibold">
                  DRAG GOLD SLIDER TO REVEAL TRANSFORMATION
                </span>
              </div>
            </div>

            <p className="mt-4 text-xs text-gray-500 font-mono text-center max-w-sm">
              Demonstrating our professional <strong>Photo Restoration</strong> &amp; <strong>Color Enhancement Workflows</strong>.
            </p>

          </div>

        </div>

        {/* Highlight Stats Panels */}
        <div
          ref={statsSectionRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 border-t border-white/5 pt-16 mt-20"
        >
          {statsData.map((stat, idx) => (
            <div key={idx} className="flex flex-col text-left group">
              <span className="font-serif text-3xl sm:text-5xl font-light text-white group-hover:text-[#d4af37] transition-all duration-300">
                {animatedStats[idx]}
                <span className="text-[#d4af37]">{stat.suffix}</span>
              </span>
              <span className="font-sans text-[11px] font-semibold text-gray-300 tracking-[0.1em] mt-3 uppercase">
                {stat.text}
              </span>
              <span className="font-mono text-[9px] text-gray-500 tracking-wider mt-1 block">
                {stat.sub}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
