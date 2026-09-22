import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

export const InteractiveDiya: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [isLit, setIsLit] = useState<boolean>(false);

  const toggleDiya = () => {
    setIsLit((prev) => !prev);
  };

  return (
    <div className={cn("relative inline-flex flex-col items-center select-none", className)}>
      {/* Background Radiance Glow when lit */}
      <AnimatePresence>
        {isLit && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1.25 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute -top-12 w-36 h-36 rounded-full bg-gradient-to-t from-amber-500/35 via-saffron-500/20 to-transparent blur-2xl pointer-events-none"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Hospitality Message: "JI AAYAN NU" */}
      <AnimatePresence>
        {isLit && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-2 text-center pointer-events-none"
          >
            <span className="font-serif text-xs md:text-sm uppercase tracking-[0.3em] font-semibold text-amber-300 drop-shadow-[0_2px_8px_rgba(229,169,60,0.6)]">
              Ji Aayan Nu
            </span>
            <span className="block text-[8px] uppercase tracking-[0.2em] text-cream-300/80 font-sans">
              Welcome With Soul
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Diya Button */}
      <button
        type="button"
        onClick={toggleDiya}
        aria-label={isLit ? "Extinguish the welcome diya" : "Light the welcome diya"}
        aria-pressed={isLit}
        title={isLit ? "Diya is lit — Ji Aayan Nu. Click to extinguish." : "Click to light the traditional welcome diya."}
        className={cn(
          "group relative flex flex-col items-center justify-end p-2 rounded-full cursor-pointer transition-transform duration-300",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-950",
          "hover:scale-105 active:scale-95"
        )}
      >
        {/* Animated Flame */}
        <div className="relative h-6 w-4 flex items-end justify-center mb-0.5">
          <AnimatePresence>
            {isLit ? (
              <motion.div
                key="flame"
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{
                  scaleY: [0.85, 1.15, 0.95, 1.1, 0.85],
                  scaleX: [0.9, 1.08, 0.95, 1.05, 0.9],
                  opacity: [0.85, 1, 0.9, 1, 0.85],
                }}
                exit={{ scaleY: 0, opacity: 0 }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="origin-bottom relative flex flex-col items-center"
              >
                {/* Outer Flame Glow */}
                <div className="w-3.5 h-6 rounded-t-full rounded-b-[40%] bg-gradient-to-t from-terracotta-500 via-amber-400 to-amber-200 shadow-[0_0_12px_rgba(229,169,60,0.9)]" />
                {/* Inner Core Flame */}
                <div className="absolute bottom-0 w-1.5 h-3 rounded-t-full bg-gradient-to-t from-cream-100 to-amber-100 opacity-95" />
              </motion.div>
            ) : (
              /* Unlit Wick */
              <div className="w-[1.5px] h-2.5 bg-charcoal-600 rounded-t-xs" />
            )}
          </AnimatePresence>
        </div>

        {/* Brass Diya Vessel (Earthen Clay / Antique Brass Silhouette) */}
        <svg
          width="36"
          height="16"
          viewBox="0 0 36 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-all duration-300 drop-shadow-md"
        >
          {/* Diya Bowl */}
          <path
            d="M3 4 C7 14, 29 14, 33 4 C35 2, 31 1, 26 2 C18 3, 10 3, 2 2 C1 1, 1 3, 3 4 Z"
            fill={isLit ? "url(#diya-brass-lit)" : "url(#diya-brass-dim)"}
            stroke={isLit ? "#E5A93C" : "#785838"}
            strokeWidth="0.8"
          />
          {/* Base Stand */}
          <ellipse cx="18" cy="14" rx="7" ry="1.5" fill="#291C17" stroke={isLit ? "#B04722" : "#46413D"} strokeWidth="0.5" />

          <defs>
            <linearGradient id="diya-brass-lit" x1="0" y1="0" x2="36" y2="16" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#8F3516" />
              <stop offset="50%" stopColor="#E5A93C" />
              <stop offset="100%" stopColor="#B04722" />
            </linearGradient>
            <linearGradient id="diya-brass-dim" x1="0" y1="0" x2="36" y2="16" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#322E2B" />
              <stop offset="50%" stopColor="#523B32" />
              <stop offset="100%" stopColor="#22201E" />
            </linearGradient>
          </defs>
        </svg>

        {/* Subtle Hint Label */}
        <span className="text-[8px] uppercase tracking-[0.22em] text-cream-400/60 mt-1 font-sans transition-colors group-hover:text-amber-300">
          {isLit ? 'Tap to rest' : 'Light Diya'}
        </span>
      </button>
    </div>
  );
};
