import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const INTRO_SESSION_KEY = 'pind-da-dhaba-intro-seen';

export const CinematicIntro: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    // Only show once per browser session
    if (typeof window === 'undefined') return false;
    const seen = sessionStorage.getItem(INTRO_SESSION_KEY);
    return !seen && !shouldReduceMotion;
  });

  useEffect(() => {
    if (!isVisible) return;

    // Automatic reveal after 2.1 seconds
    const timer = setTimeout(() => {
      finishIntro();
    }, 2100);

    return () => clearTimeout(timer);
  }, [isVisible]);

  const finishIntro = () => {
    sessionStorage.setItem(INTRO_SESSION_KEY, 'true');
    setIsVisible(false);
  };

  if (!isVisible || shouldReduceMotion) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-950 overflow-hidden select-none pointer-events-auto"
      >
        {/* Skip Entrance Button */}
        <button
          type="button"
          onClick={finishIntro}
          className="absolute top-6 right-6 z-20 text-[10px] uppercase tracking-[0.25em] text-cream-400/80 hover:text-amber-300 px-3 py-1.5 rounded-full border border-charcoal-700/60 hover:border-amber-400/40 bg-charcoal-900/60 transition-colors backdrop-blur-xs cursor-pointer"
          aria-label="Skip cinematic introduction"
        >
          Skip Intro →
        </button>

        {/* Ambient Warm Light Beam in Background */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0, 0.6, 0.4], scale: [0.8, 1.2, 1] }}
          transition={{ duration: 2, ease: 'easeOut' }}
          className="absolute w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(229,169,60,0.18)_0%,rgba(200,90,50,0.08)_50%,transparent_70%)] blur-3xl pointer-events-none"
        />

        {/* Haveli Arch Outline */}
        <div className="absolute inset-0 flex items-center justify-center opacity-15 pointer-events-none">
          <svg width="400" height="520" viewBox="0 0 400 520" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20 520 V220 C20 120, 100 20, 200 20 C300 20, 380 120, 380 220 V520"
              stroke="#E5A93C"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
          </svg>
        </div>

        {/* Central Brand Reveal */}
        <div className="relative z-10 text-center px-4 max-w-lg mx-auto">
          {/* Subtle Cultural Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="text-[10px] uppercase tracking-[0.35em] text-amber-300 font-sans font-semibold">
              The Living Haveli
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-3xl sm:text-5xl tracking-[0.2em] uppercase font-bold text-cream-100 mb-3"
          >
            Pind Da Dhaba
          </motion.h1>

          {/* Heritage Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: 'easeOut' }}
            className="font-sans text-xs sm:text-sm tracking-[0.28em] uppercase text-terracotta-400 font-medium"
          >
            Punjab, Served With Soul.
          </motion.p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
