import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import ThreeBackground from './components/ThreeBackground';
import LoadingScreen from './components/LoadingScreen';
import CursorGlow from './components/CursorGlow';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Gallery from './components/Gallery';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import Booking from './components/Booking';
import Footer from './components/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* 1. Cinematic Loading Calibration Screen */}
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* 2. Interactive Cursor Highlight Halo & Audio Trigger */}
      <CursorGlow />

      {/* 3. Global 3D Interactive WebGL Dust backdrop */}
      <ThreeBackground />

      {/* Main Page Layout Wrapper */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="relative min-h-screen text-white select-none overflow-x-hidden font-sans"
      >
        {/* Dynamic Translucent Header Navbar */}
        <Navbar />

        {/* Fullscreen Ken Burns Slider Hero Section */}
        <Hero />

        {/* About Narrative Block and Before/After Slider */}
        <About />

        {/* Grid of Luxurious Services */}
        <Services />

        {/* Portfolio Masonry & Precision Lightbox */}
        <Gallery />

        {/* Core Value/Advantage Cards */}
        <WhyChooseUs />

        {/* Glassmorphic Testimonials Carousel */}
        <Testimonials />

        {/* Booking Form Integration and Map */}
        <Booking />

        {/* Custom luxury Site map footer */}
        <Footer />
      </motion.div>
    </>
  );
}
