import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Calendar, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2, Sparkles } from 'lucide-react';
import { playCameraShutter, playHoverClick } from '../utils/audio';

const availableServices = [
  'Wedding Photography',
  'Bridal Photography',
  'Couple Shoots',
  'Events & Parties',
  'Portrait Photography',
  'Commercial Photography',
  'Corporate Photography',
  'Videography Services',
  'Baby Photography',
  'Glamour Photography',
  'Old Photo Restoration',
  'Photo Quality Enhancement',
  'Photo framing & Albums'
];

export default function Booking() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    service: 'Wedding Photography',
    location: '',
    message: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenCurrently, setIsOpenCurrently] = useState(true);

  // Prefill check on custom event triggered from Services
  useEffect(() => {
    const handlePrefill = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        setFormData((prev) => ({ ...prev, service: customEvent.detail }));
      }
    };
    window.addEventListener('prefill-booking', handlePrefill);
    return () => window.removeEventListener('prefill-booking', handlePrefill);
  }, []);

  // Determine open state dynamic check (Open until 10:00 PM)
  useEffect(() => {
    try {
      const now = new Date();
      const hours = now.getHours();
      // Studio open from 9 AM to 10 PM
      if (hours >= 9 && hours < 22) {
        setIsOpenCurrently(true);
      } else {
        setIsOpenCurrently(false);
      }
    } catch (e) {
      setIsOpenCurrently(true);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please fill out at least your Name and Phone Number.');
      return;
    }

    setIsLoading(true);
    playCameraShutter();

    // Simulate luxury studio API registration
    setTimeout(() => {
      setIsLoading(false);
      setFormSubmitted(true);
      playCameraShutter();
    }, 1500);
  };

  const handleReset = () => {
    playHoverClick();
    setFormData({
      name: '',
      phone: '',
      email: '',
      date: '',
      service: 'Wedding Photography',
      location: '',
      message: ''
    });
    setFormSubmitted(false);
  };

  return (
    <section id="booking" className="relative w-full py-24 sm:py-32 bg-[#050505] overflow-hidden z-20">
      
      {/* Decorative vertical line */}
      <div className="absolute top-0 bottom-0 left-1/3 w-px bg-white/5 pointer-events-none hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Side: Dynamic Contact and Geolocation particulars */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            
            <div className="text-left">
              <span className="font-sans text-[10px] tracking-[0.4em] text-[#d4af37] font-semibold uppercase mb-3 block">
                CONTACT STUDIO
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-wide leading-tight mb-8">
                Reserve Your <span className="italic text-gray-400">Cinematic Shooting Session</span>
              </h2>
              <p className="font-sans text-sm text-gray-300 font-light tracking-wide leading-relaxed mb-10">
                Let us align the fine details of your celebration. Fill out our reservation form, dial our hotline for fast queries, or chat with us instantly on WhatsApp.
              </p>

              {/* Status Indicator open status */}
              <div className="mb-10 inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-4 py-2">
                <span className={`w-2.5 h-2.5 rounded-full ${isOpenCurrently ? 'bg-emerald-500 animate-pulse' : 'bg-amber-600'}`} />
                <span className="font-mono text-[9px] tracking-widest uppercase font-semibold text-gray-300">
                  {isOpenCurrently ? 'STUDIO OPEN (UNTIL 10:00 PM)' : 'CLOSED (LINE REOPEN 9:00 AM)'}
                </span>
              </div>

              {/* Fast interactive click triggers */}
              <div className="space-y-6">
                
                {/* Geolocation marker */}
                <div className="flex gap-4 items-start text-left">
                  <div className="w-10 h-10 shrink-0 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-[#d4af37]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-sans text-xs font-semibold text-white uppercase tracking-widest mb-1">STUDIO ADDRESS</h4>
                    <p className="text-xs text-gray-400 leading-relaxed font-light font-sans">
                      63B, 1P, Swinhoe Ln., Post, Kasba,<br />
                      Kolkata, West Bengal 700039
                    </p>
                  </div>
                </div>

                {/* Telephone hotline */}
                <div className="flex gap-4 items-start text-left">
                  <div className="w-10 h-10 shrink-0 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-[#d4af37]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-sans text-xs font-semibold text-white uppercase tracking-widest mb-1">DIAL HOTLINE</h4>
                    <a
                      href="tel:09330794021"
                      onClick={playHoverClick}
                      className="text-sm text-white font-mono tracking-wider hover:text-[#d4af37] transition-colors"
                    >
                      093307 94021
                    </a>
                    <p className="text-[10px] text-gray-500 font-mono mt-0.5">Primary on-call assist number</p>
                  </div>
                </div>

                {/* Operating timings */}
                <div className="flex gap-4 items-start text-left">
                  <div className="w-10 h-10 shrink-0 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-[#d4af37]">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-sans text-xs font-semibold text-white uppercase tracking-widest mb-1">STUDIO HOURS</h4>
                    <p className="text-xs text-gray-400 leading-normal font-sans font-light">
                      Everyday: Open 24 Hours / 7 Days
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Micro Social media link triggers and direct chat */}
            <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/919330794021?text=Hello%20Kolkata%20Photography%20Studio,%20I'd%20like%20to%20book%20a%20professional%20photoshoot!"
                target="_blank"
                rel="noopener noreferrer"
                onClick={playCameraShutter}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#25d366] hover:bg-[#20ba5a] text-black text-xs font-bold tracking-widest uppercase rounded shadow-lg transition-transform hover:scale-[1.02] active:scale-95"
              >
                <MessageSquare className="w-4 h-4 fill-black" />
                <span>CHAT ON WHATSAPP</span>
              </a>

              <a
                href="tel:09330794021"
                onClick={playHoverClick}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 border border-[#d4af37]/30 bg-[#d4af37]/5 hover:bg-[#d4af37]/15 text-white text-xs font-semibold tracking-widest uppercase rounded transition-transform hover:scale-[1.02] active:scale-95"
              >
                <Phone className="w-4 h-4 text-[#d4af37]" />
                <span>DIAL CALL DIRECT</span>
              </a>
            </div>

          </div>

          {/* Right Side: Interactive Reservation booking Form / Confirmation Screen */}
          <div className="lg:col-span-7 bg-[#0a0a0a]/50 p-8 sm:p-12 rounded-lg border border-white/5 relative shadow-2xl">
            
            <AnimatePresence mode="wait">
              {!formSubmitted ? (
                <motion.form
                  key="booking-form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 text-left"
                >
                  <p className="text-gray-400 font-sans text-xs uppercase tracking-widest mb-6 font-semibold pb-4 border-b border-white/5">
                    RESERVATION REGISTRYHUD AP-048
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name input */}
                    <div className="flex flex-col gap-2">
                      <label className="font-sans text-[10px] tracking-widest text-[#d4af37] font-semibold uppercase">YOUR FULL NAME *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Rahul Sen"
                        className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                      />
                    </div>

                    {/* Contact Number input */}
                    <div className="flex flex-col gap-2">
                      <label className="font-sans text-[10px] tracking-widest text-[#d4af37] font-semibold uppercase">PHONE NUMBER *</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. +91 81168..."
                        className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Event Date Picker input */}
                    <div className="flex flex-col gap-2">
                      <label className="font-sans text-[10px] tracking-widest text-[#d4af37] font-semibold uppercase">TARGET EVENT DATE</label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-sm text-gray-300 focus:outline-none focus:border-[#d4af37] transition-colors"
                      />
                    </div>

                    {/* Email coordinate input */}
                    <div className="flex flex-col gap-2">
                      <label className="font-sans text-[10px] tracking-widest text-[#d4af37] font-semibold uppercase">EMAIL ADDRESS</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. rahul@gmail.com"
                        className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Selected Service choose option */}
                    <div className="flex flex-col gap-2">
                      <label className="font-sans text-[10px] tracking-widest text-[#d4af37] font-semibold uppercase">SELECT SERVICE GENRE</label>
                      <div className="relative">
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-sm text-gray-300 focus:outline-none focus:border-[#d4af37] transition-colors appearance-none cursor-pointer"
                        >
                          {availableServices.map((srv) => (
                            <option key={srv} value={srv} className="bg-[#0c0c0c] text-white py-2">
                              {srv}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#d4af37]">
                          <Clock className="w-4 h-4 cursor-pointer" />
                        </div>
                      </div>
                    </div>

                    {/* Target shoots location */}
                    <div className="flex flex-col gap-2">
                      <label className="font-sans text-[10px] tracking-widest text-[#d4af37] font-semibold uppercase">EVENT LOCATION</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="e.g. Swinhoe Lane / Kasba, Kolkata"
                        className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Message prompt box text */}
                  <div className="flex flex-col gap-2">
                    <label className="font-sans text-[10px] tracking-widest text-[#d4af37] font-semibold uppercase">YOUR DIRECT STORY MESSAGE</label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Share your timelines, dress themes, customized setups, or special vintage photo restoration queries..."
                      className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37] transition-colors resize-none"
                    />
                  </div>

                  {/* Primary Submit actions with beautiful loading state */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full relative py-4 bg-gradient-to-r from-amber-500 to-[#d4af37] text-black text-xs font-bold tracking-[0.3em] uppercase rounded shadow-lg transition-transform hover:scale-[1.01] active:scale-95 select-none"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                        CALIBRATING SYSTEM DATA...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2 font-semibold">
                        SUBMIT BOOKING ENVELOPE <Send className="w-3.5 h-3.5 text-black" />
                      </span>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="booking-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full border border-green-500/30 bg-green-500/10 flex items-center justify-center mb-6 text-green-500 animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <span className="font-sans text-[10px] tracking-[0.4em] text-[#d4af37] font-semibold uppercase mb-2">
                    PROPOSAL FILED PERFECTLY
                  </span>

                  <h3 className="font-serif text-2xl md:text-3xl font-light text-white mb-4 uppercase tracking-wider">
                    Thank You, {formData.name}
                  </h3>

                  <p className="text-gray-400 font-sans text-xs font-light max-w-sm leading-relaxed mb-8">
                    Your luxury portfolio shoot booking has been logged under ID: <strong className="font-mono text-[#d4af37]">KPS-{Math.floor(1000 + Math.random() * 9000)}</strong>. Kolkata Photography Studio directors will correspond via your telephone number <strong className="text-white">{formData.phone}</strong> or email within 2 hours.
                  </p>

                  <div className="w-12 h-px bg-white/5 mb-8" />

                  <button
                    onClick={handleReset}
                    className="px-6 py-2 border border-white/10 text-gray-400 hover:text-white hover:border-[#d4af37] rounded text-[10px] font-sans tracking-widest uppercase transition-colors"
                  >
                    SUBMIT ANOTHER PROPOSAL
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

        {/* Studio maps vector embedded block details */}
        <div className="mt-20 border-t border-white/5 pt-16">
          <div className="w-full text-left mb-6 flex flex-col sm:flex-row items-end justify-between gap-4">
            <div>
              <span className="font-sans text-[9px] tracking-[0.25em] text-[#d4af37] font-semibold uppercase block">
                GEOGRAPHIC PRESET ROUTE
              </span>
              <h3 className="font-serif text-2xl font-light text-white uppercase tracking-wide mt-1">
                Visual Studio Maps Area
              </h3>
            </div>
            <span className="font-mono text-[9px] text-gray-500 tracking-wider">63B, 1P, Swinhoe Ln. | Kasba, Kolkata</span>
          </div>

          <div className="w-full h-80 rounded-lg overflow-hidden border border-white/10 relative shadow-2xl bg-[#111111]">
            {/* Embedded map representation using official geolocation.
                Since it's sandboxed, using standard premium visual maps embedded safely. */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14741.047585093744!2d88.3845945!3d22.5131012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027663b36484e5%3A0x600b39f37c35e396!2sSwinhoe%20Ln%2C%20Kasba%2C%20Kolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1716712351235!5m2!1sen!2sin"
              title="Kolkata Photography Studio Location Map"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(120%)' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
