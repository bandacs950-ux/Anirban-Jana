import React from 'react';
import { motion } from 'motion/react';
import { Sliders, Film, Zap, BookOpen, Award, Camera, ShieldCheck, Heart } from 'lucide-react';

const advantages = [
  {
    title: 'Professional Editing',
    description: 'We edit each selected picture by hand, applying customized cinematic color boards and detailed skin-toning, avoiding batch presets.',
    icon: Sliders
  },
  {
    title: 'Cinematic Style',
    description: 'Each photo holds deep atmospheric density and cinematic storytelling, looking like a high-end frame out of an international motion film.',
    icon: Film
  },
  {
    title: 'Fast Delivery',
    description: 'Our digital delivery flow makes previews accessible in just 10 days, followed by fully bound albums compiled to perfection.',
    icon: Zap
  },
  {
    title: 'Luxury Albums',
    description: 'Bespoke hand-crafted storage boxes, premium silk fabrics, and thick archival sheets designed to last generations.',
    icon: BookOpen
  },
  {
    title: 'Experienced Team',
    description: 'We bring a seasoned, polite, respectful, and highly coordinates team of visual directors and light operators to steer your poses.',
    icon: Award
  },
  {
    title: 'High-End Equipment',
    description: 'Using high-resolution full-frame camera systems, f/1.2 L series prime focal lenses, and active gimbal stabilizers.',
    icon: Camera
  },
  {
    title: 'Personalized Shoots',
    description: 'Direct interactive sessions during location scouting, apparel consultations, and timeline synchronization prior to the big day.',
    icon: ShieldCheck
  },
  {
    title: 'Creative Storytelling',
    description: 'Rather than forced portraits, we capture authentic laughter, nervous gazes, and the pure electric joy of your relationships.',
    icon: Heart
  }
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="relative w-full py-24 sm:py-32 bg-[#030303] overflow-hidden z-20">
      
      {/* Visual background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#d4af37]/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="font-sans text-[10px] tracking-[0.4em] text-[#d4af37] font-semibold uppercase mb-3 block">
            THE PLATINUM STANDARD
          </span>
          
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-wide leading-tight mb-6">
            Why Select <span className="italic text-gray-400">Kolkata Photo Studio</span>
          </h2>

          <p className="font-sans text-xs md:text-sm text-gray-400 font-light tracking-widest max-w-lg mx-auto uppercase leading-relaxed">
            COMMITMENT TO DELIVERING WORLD-CLASS MEMORIES WITH SPECTACULAR SERVICE ETHICS AND UNMATCHED EDITING SKILLS.
          </p>
        </div>

        {/* Core items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative bg-[#0a0a0a]/50 border border-white/5 p-8 rounded flex flex-col justify-between transition-all duration-500 hover:border-[#d4af37]/25 hover:bg-[#070707] hover:shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
              >
                {/* Visual Accent Top Line slider */}
                <div className="absolute top-0 left-0 w-0 h-[1.5px] bg-[#d4af37] group-hover:w-full transition-all duration-500" />

                {/* Advantage Card top content */}
                <div>
                  <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-[#d4af37]/10 group-hover:border-[#d4af37] group-hover:scale-105">
                    <Icon className="w-5 h-5 text-[#d4af37] transition-all" />
                  </div>

                  <h3 className="font-serif text-lg font-light text-white mb-3 group-hover:text-[#d4af37] transition-colors">
                    {item.title}
                  </h3>

                  <p className="font-sans text-xs text-gray-400 font-light tracking-wide leading-relaxed group-hover:text-gray-200 transition-colors">
                    {item.description}
                  </p>
                </div>

                {/* Visual HUD grid ticks bottom */}
                <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-8 opacity-40 group-hover:opacity-100 transition-opacity">
                  <span className="font-mono text-[8px] text-gray-500 block">
                    CODE: AP-{String(index + 101).padStart(3, '0')}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-[#d4af37] transition-colors" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
