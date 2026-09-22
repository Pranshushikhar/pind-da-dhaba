import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const INTRO_SESSION_KEY = 'pind-da-dhaba-intro-seen';

export const CinematicIntro: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const seen = sessionStorage.getItem(INTRO_SESSION_KEY);
    return !seen && !shouldReduceMotion;
  });

  const [step, setStep] = useState<'black' | 'flame' | 'light' | 'arches' | 'text'>('black');

  useEffect(() => {
    if (!isVisible || shouldReduceMotion) return;

    // Sequence timing:
    // 0.0s - 0.4s: Deep Black
    // 0.4s: Single Diya Flame ignites
    // 1.0s: Warm light expands outward
    // 1.5s: Haveli arch silhouettes emerge
    // 2.0s: Text "JI AAYAN NU — Welcome to Pind Da Dhaba"
    // 3.6s: Complete and transition into hero

    const t1 = setTimeout(() => setStep('flame'), 400);
    const t2 = setTimeout(() => setStep('light'), 1000);
    const t3 = setTimeout(() => setStep('arches'), 1500);
    const t4 = setTimeout(() => setStep('text'), 2000);
    const t5 = setTimeout(() => finishIntro(), 3800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [isVisible, shouldReduceMotion]);

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
        className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-950 overflow-hidden select-none"
        aria-modal="true"
        role="dialog"
        aria-label="Cinematic Haveli Entrance"
      >
        {/* Skip Intro Button */}
        <button
          type="button"
          onClick={finishIntro}
          className="absolute top-6 right-6 z-30 text-[10px] uppercase tracking-[0.25em] text-cream-400/80 hover:text-amber-300 px-4 py-2 rounded-full border border-charcoal-700/60 hover:border-amber-400/40 bg-charcoal-900/60 transition-colors backdrop-blur-sm cursor-pointer"
          aria-label="Skip cinematic introduction"
        >
          Skip Intro →
        </button>

        {/* Step 2: Warm Light expanding from the Diya */}
        <AnimatePresence>
          {(step === 'light' || step === 'arches' || step === 'text') && (
            <motion.div
              initial={{ opacity: 0, scale: 0.2 }}
              animate={{ opacity: 1, scale: 1.4 }}
              transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(229,169,60,0.25)_0%,rgba(209,73,42,0.12)_45%,transparent_75%)] blur-3xl" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 3: Haveli Arch Silhouettes emerging */}
        <AnimatePresence>
          {(step === 'arches' || step === 'text') && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 0.22, scale: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <svg
                width="640"
                height="800"
                viewBox="0 0 640 800"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="max-w-[90vw] max-h-[85vh]"
              >
                {/* Grand Punjabi Haveli Arch */}
                <path
                  d="M40 800 V360 C40 180, 180 40, 320 40 C460 40, 600 180, 600 360 V800"
                  stroke="#E5A93C"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />
                <path
                  d="M80 800 V380 C80 220, 200 80, 320 80 C440 80, 560 220, 560 380 V800"
                  stroke="#E0724C"
                  strokeWidth="1"
                  opacity="0.6"
                />
                {/* Traditional Cusped Arch Key */}
                <path
                  d="M260 220 C260 190, 320 150, 320 150 C320 150, 380 190, 380 220"
                  stroke="#E5A93C"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Centerpiece: Diya & Flame */}
        <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-xl mx-auto">
          {/* Flame element */}
          <div className="relative w-8 h-12 flex items-end justify-center mb-6">
            <AnimatePresence>
              {(step === 'flame' || step === 'light' || step === 'arches' || step === 'text') && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1.2, 0.95, 1.05],
                    opacity: 1,
                  }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="relative flex flex-col items-center"
                >
                  {/* Outer Flame Glow */}
                  <motion.div
                    animate={{
                      scaleY: [1, 1.15, 0.95, 1.1, 1],
                      scaleX: [1, 0.95, 1.05, 0.98, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-5 h-8 rounded-t-full rounded-b-[40%] bg-gradient-to-t from-terracotta-500 via-amber-400 to-amber-200 shadow-[0_0_24px_rgba(229,169,60,0.95)]"
                  />
                  {/* Inner White-Gold Core */}
                  <div className="absolute bottom-0.5 w-2 h-4 rounded-t-full bg-cream-100 opacity-95" />
                  {/* Diya Clay Base */}
                  <div className="mt-1 w-10 h-3 rounded-b-full bg-gradient-to-r from-amber-700 via-terracotta-600 to-amber-800 border-t border-amber-400/50 shadow-md" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Step 4: Text Emergence */}
          <AnimatePresence>
            {step === 'text' && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-3"
              >
                <span className="text-xs sm:text-sm uppercase tracking-[0.35em] text-amber-300 font-sans font-semibold drop-shadow-[0_2px_12px_rgba(229,169,60,0.5)]">
                  Ji Aayan Nu
                </span>

                <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl tracking-[0.15em] uppercase font-bold text-cream-100">
                  Welcome to Pind Da Dhaba
                </h1>

                <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-saffron-400 font-sans">
                  Punjab, Served With Soul
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
