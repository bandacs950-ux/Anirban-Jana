import React from 'react';
import { motion } from 'motion/react';
import {
  Heart,
  Sparkles,
  Users,
  Music,
  Smile,
  ShoppingBag,
  Briefcase,
  Video,
  Baby,
  Flame,
  ArrowRight
} from 'lucide-react';
import { playCameraShutter, playHoverClick } from '../utils/audio';

// Elegant data mapping
const servicesData = [
  {
    id: 'wedding',
    title: 'Wedding Photography',
    iconName: 'Heart',
    image: '/src/assets/images/couple_red_veil_1779785266356.png',
    description: 'Immortalizing grand Indian ceremonies, candid laughs, ritual details, and the majestic flow of your royal wedding narrative.'
  },
  {
    id: 'bridal',
    title: 'Bridal Photography',
    iconName: 'Sparkles',
    image: '/src/assets/images/bengali_bride_royal_1779785186925.png',
    description: 'Savoring the intricate elegance of traditional jewelry, fine couture, emotional reflections, and breathtaking individual portraits.'
  },
  {
    id: 'couple',
    title: 'Couple Shoots',
    iconName: 'Users',
    image: '/src/assets/images/bride_betel_leave_1779785283467.png',
    description: 'Artistic pre-wedding and post-wedding outdoor chronicles captured during golden hour across beautiful scenic landscapes.'
  },
  {
    id: 'events',
    title: 'Events & Parties',
    iconName: 'Music',
    image: '/src/assets/images/bengali_groom_lux_1779785215358.png',
    description: 'High-energy celebration coverage, capturing the atmosphere, live lighting, candid interactions, and memories of your guests.'
  },
  {
    id: 'portrait',
    title: 'Portrait Photography',
    iconName: 'Smile',
    image: '/src/assets/images/bride_mudra_pose_1779785300716.png',
    description: 'Fine art studio headshots, dramatic silhouette angles, and clean, high-contrast personality chronicles.'
  },
  {
    id: 'commercial',
    title: 'Commercial Photography',
    iconName: 'ShoppingBag',
    image: '/src/assets/images/goddess_lotus_sari_1779785363244.png',
    description: 'Crisp high-caliber styling photos for labels, fine jewelry products, editorial print magazines, and elite advertising.'
  },
  {
    id: 'corporate',
    title: 'Corporate Photography',
    iconName: 'Briefcase',
    image: '/src/assets/images/bride_sindoor_veil_1779785335728.png',
    description: 'Distinguished master portfolio pieces, executive PR headshots, corporate summits, and annual showcase albums.'
  },
  {
    id: 'videography',
    title: 'Videography Services',
    iconName: 'Video',
    image: '/src/assets/images/bengali_bride_glam_1779785247589.png',
    description: 'Grand 4K cinematic teasers, emotional wedding recap trailers, drone-angled perspectives, and multi-camera live video.'
  },
  {
    id: 'baby',
    title: 'Baby Photography',
    iconName: 'Baby',
    image: '/src/assets/images/baby_umbrella_smile_1779785231221.png',
    description: 'Heartwarming snapshots of newborn fine moments, toddler expressions, and cozy thematic seasonal settings.'
  },
  {
    id: 'glamour',
    title: 'Glamour Photography',
    iconName: 'Flame',
    image: '/src/assets/images/bride_vermilion_lux_1779785318869.png',
    description: 'Dramatic close-up beauty spreads, high-end fashion portfolios, sophisticated lighting ratios, and luxury poses.'
  }
];

// Helper to render lucide icon component dynamically
const IconComponent = ({ name, className }: { name: string; className: string }) => {
  switch (name) {
    case 'Heart': return <Heart className={className} />;
    case 'Sparkles': return <Sparkles className={className} />;
    case 'Users': return <Users className={className} />;
    case 'Music': return <Music className={className} />;
    case 'Smile': return <Smile className={className} />;
    case 'ShoppingBag': return <ShoppingBag className={className} />;
    case 'Briefcase': return <Briefcase className={className} />;
    case 'Video': return <Video className={className} />;
    case 'Baby': return <Baby className={className} />;
    case 'Flame': return <Flame className={className} />;
    default: return <Heart className={className} />;
  }
};

export default function Services() {
  const handleBookNow = (serviceTitle: string) => {
    // Sound confirmation
    playCameraShutter();
    // Dispatch custom event to let the booking component fill the category
    const event = new CustomEvent('prefill-booking', { detail: serviceTitle });
    window.dispatchEvent(event);

    // Scroll smoothly to contact/booking form
    const bookingSec = document.querySelector('#booking');
    if (bookingSec) {
      bookingSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="relative w-full py-24 sm:py-32 bg-[#030303] overflow-hidden z-20">
      {/* Decorative vertical lens track ticks in background */}
      <div className="absolute top-0 bottom-0 left-12 w-px bg-white/5 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-12 w-px bg-white/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center md:text-left mb-16 md:mb-24 flex flex-col md:flex-row items-end justify-between gap-6">
          <div className="max-w-xl text-left">
            <span className="font-sans text-[10px] tracking-[0.4em] text-[#d4af37] font-semibold uppercase mb-3 block">
              OUR SPECIALTIES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-wide">
              Selected Fine Art <span className="italic text-gray-400">Photography Genres</span>
            </h2>
          </div>
          <div className="text-left md:text-right font-sans text-xs text-gray-400 max-w-xs uppercase tracking-widest leading-relaxed">
            CUSTOMIZABLE PACKAGES EQUIPPED WITH LUXURY HEIRLOOM ALBUMS AND STUNNING 4K FILM TRAILERS.
          </div>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="group relative h-96 rounded-lg overflow-hidden border border-white/5 bg-[#0a0a0a]/40 shadow-2xl flex flex-col justify-end p-6 transition-all duration-500 hover:border-[#d4af37]/30 hover:shadow-[0_15px_40px_rgba(212,175,55,0.06)]"
            >
              {/* Backing Image background with overlay zoom */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-25 group-hover:scale-110 group-hover:opacity-40 transition-all duration-700 pointer-events-none" 
                style={{ backgroundImage: `url(${service.image})` }}
                referrerPolicy="no-referrer"
              />
              
              {/* Grand glassmorphic fade to dark in the bottom overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-[#070707]/80 to-transparent pointer-events-none" />

              {/* Top-Right icon floating trigger */}
              <div className="absolute top-6 right-6 w-12 h-12 rounded-full border border-white/10 bg-black/60 backdrop-blur flex items-center justify-center transition-all duration-500 group-hover:border-[#d4af37] group-hover:bg-[#d4af37]/10">
                <IconComponent name={service.iconName} className="w-5 h-5 text-gray-400 group-hover:text-[#d4af37] transition-colors" />
              </div>

              {/* Service text content bottom */}
              <div className="relative z-10 flex flex-col text-left">
                <span className="font-mono text-[9px] text-[#d4af37] tracking-[0.25em] font-medium uppercase mb-2">
                  CATEGORY {String(index + 1).padStart(2, '0')}
                </span>
                
                <h3 className="font-serif text-xl font-light text-white mb-3 group-hover:text-[#d4af37] transition-colors">
                  {service.title}
                </h3>
                
                <p className="font-sans text-xs text-gray-400 font-light tracking-wide leading-relaxed mb-6 group-hover:text-gray-200 transition-colors">
                  {service.description}
                </p>

                {/* Micro Action Button */}
                <button
                  onClick={() => handleBookNow(service.title)}
                  className="interactive-hover self-start inline-flex items-center gap-1.5 text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-[#d4af37] group-hover:text-white transition-colors py-1 group/btn"
                >
                  <span>BOOK GENRE_</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </button>
              </div>

              {/* Small sleek golden corner accent line */}
              <div className="absolute top-0 left-0 w-4 h-[1px] bg-white/10 transition-colors group-hover:bg-[#d4af37]" />
              <div className="absolute top-0 left-0 w-[1px] h-4 bg-white/10 transition-colors group-hover:bg-[#d4af37]" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
