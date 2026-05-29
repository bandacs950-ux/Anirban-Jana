import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Film, Camera } from 'lucide-react';
import { playCameraShutter, playHoverClick } from '../utils/audio';

// Elegant curated portfolio items list
const portfolioItems = [
  {
    id: 'pt-1',
    title: 'THE ROYAL BENGAL BRIDE',
    category: 'bridal',
    categoryLabel: 'BRIDAL SHOOTS',
    image: '/src/assets/images/bengali_bride_royal_1779785186925.png',
    location: 'Swinhoe Ln, Kolkata',
    tags: ['Aesthetic Chandan', 'Banarasi Silk', 'Traditional Gold']
  },
  {
    id: 'pt-2',
    title: 'THE GOLDEN GARLAND GROOM',
    category: 'weddings',
    categoryLabel: 'WEDDINGS',
    image: '/src/assets/images/bengali_groom_lux_1779785215358.png',
    location: 'Kasba, Kolkata',
    tags: ['Sherwani Heritage', 'Bokeh Candid', 'Garland Vows']
  },
  {
    id: 'pt-3',
    title: 'RAINBOW UMBRELLA SPELL',
    category: 'events',
    categoryLabel: 'EVENTS',
    image: '/src/assets/images/baby_umbrella_smile_1779785231221.png',
    location: 'Studio Heritage, Midnapore',
    tags: ['Baby Shoot', 'Joyous Smiles', 'Pure Canvas']
  },
  {
    id: 'pt-4',
    title: 'GLAMOUR TEMPLE CHRONICLES',
    category: 'bridal',
    categoryLabel: 'BRIDAL SHOOTS',
    image: '/src/assets/images/bengali_bride_glam_1779785247589.png',
    location: 'Kolkata Palace',
    tags: ['Temple Jewelry', 'Moody Jasmine', 'Aperture f/1.2']
  },
  {
    id: 'pt-5',
    title: 'CANOPY OF CHARM',
    category: 'couple',
    categoryLabel: 'COUPLE PORTRAITS',
    image: '/src/assets/images/couple_red_veil_1779785266356.png',
    location: 'Emerald Lawn, West Bengal',
    tags: ['Candid Laughs', 'Gajra Vibe', 'Red Veil Bliss']
  },
  {
    id: 'pt-6',
    title: 'THE SHUBHO DRISHTI RITUAL',
    category: 'bridal',
    categoryLabel: 'BRIDAL SHOOTS',
    image: '/src/assets/images/bride_betel_leave_1779785283467.png',
    location: 'Art Center Venue, Midnapore',
    tags: ['Betel Leaf Peek', 'Floral Mukut', 'Authentic Vibe']
  },
  {
    id: 'pt-7',
    title: 'MUDRA REFLECTIONS',
    category: 'fashion',
    categoryLabel: 'GLAMOUR & FASHION',
    image: '/src/assets/images/bride_mudra_pose_1779785300716.png',
    location: 'Studio Platinum, Kolkata',
    tags: ['Hand Mudra', 'Gold Bangles', 'Cinematic Blur']
  },
  {
    id: 'pt-8',
    title: 'GACH KOUTO LEGACY',
    category: 'weddings',
    categoryLabel: 'WEDDINGS',
    image: '/src/assets/images/bride_vermilion_lux_1779785318869.png',
    location: 'Heritage Mansion, Kolkata',
    tags: ['Vermilion Vessel', 'White Mukut', 'Grand Entrance']
  },
  {
    id: 'pt-9',
    title: 'SOULFUL SINDOOR GLARE',
    category: 'bridal',
    categoryLabel: 'BRIDAL SHOOTS',
    image: '/src/assets/images/bride_sindoor_veil_1779785335728.png',
    location: 'Swinhoe Ln. Mansion',
    tags: ['Confident Eyes', 'Macro Detail', 'Sindoor Vermilion']
  },
  {
    id: 'pt-10',
    title: 'DIVINE LOTUS SANCTUARY',
    category: 'fashion',
    categoryLabel: 'GLAMOUR & FASHION',
    image: '/src/assets/images/goddess_lotus_sari_1779785363244.png',
    location: 'Lake Gardens, West Bengal',
    tags: ['Goddess Avatar', 'Sanskrit Saree', 'Pink Lotus Spark']
  },
  {
    id: 'pt-11',
    title: 'CHRONICLE SILHOUETTE',
    category: 'bw',
    categoryLabel: 'BLACK & WHITE',
    image: '/src/assets/images/bride_sindoor_veil_1779785335728.png',
    location: 'Studio Heritage, Art',
    tags: ['Monochrome Classic', 'Fine Art', 'High Contrast'],
    isBW: true
  },
  {
    id: 'pt-12',
    title: 'RESTORED VINTAGE MEMORY',
    category: 'bw',
    categoryLabel: 'BLACK & WHITE',
    image: '/src/assets/images/bride_vermilion_lux_1779785318869.png',
    location: 'Studio Kasba, Kolkata',
    tags: ['Side Light', 'Dreamy Light', 'Retro Grain'],
    isBW: true
  }
];

const categories = [
  { id: 'all', label: 'ALL CRITICAL WORK' },
  { id: 'weddings', label: 'WEDDINGS' },
  { id: 'bridal', label: 'BRIDAL SHOOTS' },
  { id: 'couple', label: 'COUPLE PORTRAITS' },
  { id: 'events', label: 'EVENTS' },
  { id: 'bw', label: 'BLACK & WHITE' },
  { id: 'fashion', label: 'GLAMOUR & FASHION' },
  { id: 'cinematic', label: 'CINEMATIC VIDEOGRAPHY' }
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [zoomScale, setZoomScale] = useState(1);

  const filteredItems = activeCategory === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeCategory);

  const openLightbox = (index: number) => {
    playCameraShutter();
    // find correct index mapping inside filtered list
    setLightboxIndex(index);
    setZoomScale(1);
  };

  const closeLightbox = () => {
    playHoverClick();
    setLightboxIndex(null);
  };

  const nextSlide = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (lightboxIndex === null) return;
    playHoverClick();
    setLightboxIndex((prev) => (prev! + 1) % filteredItems.length);
    setZoomScale(1);
  };

  const prevSlide = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (lightboxIndex === null) return;
    playHoverClick();
    setLightboxIndex((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length);
    setZoomScale(1);
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems]);

  return (
    <section id="portfolio" className="relative w-full py-24 sm:py-32 bg-[#050505] overflow-hidden z-20">
      
      {/* Decorative calibration grids */}
      <div className="absolute top-12 left-12 w-8 h-8 border-t border-l border-white/10" />
      <div className="absolute top-12 right-12 w-8 h-8 border-t border-r border-white/10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Gallery Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="font-sans text-[10px] tracking-[0.4em] text-[#d4af37] font-semibold uppercase mb-3 block">
            GALLERY ARCHIVES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-wide mb-6">
            Luxury Portfolio <span className="italic text-gray-400">&amp; Masterpieces</span>
          </h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-[#d4af37] to-amber-500 mx-auto" />
        </div>

        {/* Filter Navigation Menu */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16 max-w-5xl mx-auto border-b border-white/5 pb-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                playHoverClick();
                setActiveCategory(cat.id);
              }}
              className={`px-4 py-2 text-[10px] font-sans tracking-[0.2em] font-semibold uppercase transition-all duration-300 rounded-sm hover:text-[#d4af37] ${
                activeCategory === cat.id
                  ? 'bg-[#d4af37] text-black shadow-lg shadow-[#d4af37]/15'
                  : 'bg-white/5 text-gray-300 border border-white/5 hover:bg-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry-like dynamic Photo Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                onClick={() => openLightbox(index)}
                className="group relative cursor-pointer bg-[#0c0c0c] rounded overflow-hidden aspect-[4/5] border border-white/5 shadow-xl shadow-black/80"
              >
                {/* Visual HUD coordinate tags on frame edge */}
                <div className="absolute top-4 left-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <span className="text-[8px] font-mono tracking-widest text-[#d4af37] bg-black/80 backdrop-blur-md px-2 py-0.5 border border-[#d4af37]/20 uppercase">
                    LOC: {item.location}
                  </span>
                </div>

                {/* Main Photo Asset with heavy Zoom effect */}
                <div className="w-full h-full overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-cover transition-all duration-700 ease-out scale-100 group-hover:scale-110 group-hover:rotate-1 ${
                      item.isBW ? 'grayscale contrast-125' : ''
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 opacity-40 group-hover:opacity-85 transition-opacity duration-500" />
                </div>

                {/* Overlap Text Box content */}
                <div className="absolute bottom-0 left-0 w-full p-6 text-left transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500 z-10">
                  <span className="font-mono text-[9px] text-[#d4af37] tracking-[0.25em] font-medium uppercase mb-1.5 block">
                    {item.categoryLabel}
                  </span>
                  
                  <h3 className="font-serif text-lg font-light text-white tracking-wide mb-3 uppercase group-hover:text-[#d4af37] transition-colors">
                    {item.title}
                  </h3>

                  {/* Badges tags */}
                  <div className="flex flex-wrap gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-[8px] font-mono tracking-wider text-gray-400 border border-white/10 bg-white/5 px-2 py-0.5 uppercase">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Central Hover Maximizer icon trigger */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-12 h-12 rounded-full border border-[#d4af37] bg-black/60 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-xl">
                    <Maximize2 className="w-4 h-4 text-[#d4af37]" />
                  </div>
                </div>

                {/* Tiny framing corner dashes */}
                <div className="absolute top-2 right-2 w-3 h-[1px] bg-white/10 group-hover:bg-[#d4af37] transition-colors" />
                <div className="absolute top-2 right-2 w-[1px] h-3 bg-white/10 group-hover:bg-[#d4af37] transition-colors" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* --- PREMIUM COMPREHENSIVE LIGHTBOX DIAL --- */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-black/98 backdrop-blur-xl z-[900] flex flex-col justify-between p-6 sm:p-10 select-none overflow-hidden"
          >
            {/* Ambient matching halo color bleed in behind lightbox */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06),transparent_70%)] pointer-events-none" />

            {/* Lightbox Top HUD Control Bar */}
            <div className="relative z-10 w-full flex items-center justify-between border-b border-white/5 pb-4">
              <div className="text-left font-mono">
                <span className="block text-[8px] tracking-widest text-[#d4af37] uppercase">KOLKATA PHOTO STUDIO DIGITAL ALIGNMENT</span>
                <span className="block text-gray-500 text-[10px] tracking-widest mt-1">
                  PREVIEW {lightboxIndex + 1} OF {filteredItems.length} | LOC: {filteredItems[lightboxIndex].location}
                </span>
              </div>

              {/* Utility Zoom and close */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    playHoverClick();
                    setZoomScale((prev) => Math.max(1, prev - 0.25));
                  }}
                  className="p-2 border border-white/5 rounded hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    playHoverClick();
                    setZoomScale((prev) => Math.min(2.5, prev + 0.25));
                  }}
                  className="p-2 border border-white/5 rounded hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={closeLightbox}
                  className="p-2 border border-white/10 rounded-full bg-white/5 hover:bg-white hover:text-black transition-all shadow-md flex items-center justify-center text-white"
                  title="Close (ESC)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Lightbox Center Area Slider */}
            <div className="relative flex-1 w-full flex items-center justify-between gap-4 max-w-7xl mx-auto my-6 sm:my-10">
              
              {/* Prev Button Trigger Left */}
              <button
                onClick={prevSlide}
                className="hidden md:flex relative z-10 p-3 rounded-full border border-white/10 bg-black/40 text-gray-400 hover:text-white hover:border-[#d4af37] hover:scale-105 active:scale-95 transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Main lightbox photo container */}
              <div className="flex-1 h-full max-h-[72vh] flex items-center justify-center relative overflow-hidden p-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={filteredItems[lightboxIndex].id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.03 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="relative max-w-full max-h-full aspect-[4/5] sm:aspect-auto select-none flex items-center justify-center"
                  >
                    <motion.img
                      src={filteredItems[lightboxIndex].image}
                      alt={filteredItems[lightboxIndex].title}
                      referrerPolicy="no-referrer"
                      style={{ scale: zoomScale }}
                      className={`max-w-full max-h-[66vh] object-contain rounded-sm border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.95)] transition-transform duration-300 ${
                        filteredItems[lightboxIndex].isBW ? 'grayscale contrast-125' : ''
                      }`}
                    />
                    
                    {/* Tiny watermark on photo */}
                    <div className="absolute right-4 bottom-4 pointer-events-none opacity-20 flex items-center gap-1.5 select-none text-white font-sans tracking-[0.2em] text-[9px] uppercase font-bold">
                      <Camera className="w-3 h-3 text-[#d4af37]" />
                      <span>KOLKATA PHOTO</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Next Button Trigger Right */}
              <button
                onClick={nextSlide}
                className="hidden md:flex relative z-10 p-3 rounded-full border border-white/10 bg-black/40 text-gray-400 hover:text-white hover:border-[#d4af37] hover:scale-105 active:scale-95 transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

            </div>

            {/* Lightbox Footer Details and labels */}
            <div className="relative z-10 w-full text-center max-w-3xl mx-auto">
              <span className="text-[10px] font-mono text-[#d4af37] tracking-[0.3em] font-semibold uppercase block mb-1">
                {filteredItems[lightboxIndex].categoryLabel}
              </span>
              
              <h2 className="font-serif text-2xl font-light text-white uppercase tracking-wider mb-2">
                {filteredItems[lightboxIndex].title}
              </h2>

              <p className="text-gray-400 font-sans text-xs font-light tracking-wide max-w-md mx-auto mb-4">
                Captured meticulously with luxury f1.2 premium lenses at Emerald Parks, using raw focus depth algorithms.
              </p>

              {/* Quick Mobile Left/Right Swipe assist pills */}
              <div className="md:hidden flex items-center justify-center gap-8 mt-6">
                <button
                  onClick={prevSlide}
                  className="px-6 py-2 border border-white/10 rounded text-xs select-none hover:text-[#d4af37]"
                >
                  ◀ PREV
                </button>
                <button
                  onClick={nextSlide}
                  className="px-6 py-2 border border-white/10 rounded text-xs select-none hover:text-[#d4af37]"
                >
                  NEXT ▶
                </button>
              </div>
            </div>

            {/* Micro calibrator corners */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-white/10" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-white/10" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-white/10" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-white/10" />
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
