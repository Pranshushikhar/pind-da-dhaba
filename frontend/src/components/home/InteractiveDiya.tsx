import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { cn } from '../../lib/utils';

export const InteractiveDiya: React.FC<{ className?: string }> = ({ className = '' }) => {
  const shouldReduceMotion = useReducedMotion();
  const [isAwakened, setIsAwakened] = useState<boolean>(false);
  const timeoutRef = useRef<number | null>(null);

  const triggerDiya = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsAwakened(true);
    // Emotional microinteraction: ignites flame, expands warmth, shows "JI AAYAN NU", returns naturally
    timeoutRef.current = window.setTimeout(() => {
      setIsAwakened(false);
    }, 3800);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <>
      {/* Viewport-Wide Haveli Warmth Expansion when Diya is Ignited */}
      <AnimatePresence>
        {isAwakened && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-20 pointer-events-none bg-[radial-gradient(circle_at_50%_70%,rgba(229,169,60,0.22)_0%,rgba(209,73,42,0.10)_45%,transparent_80%)] backdrop-brightness-[1.04]"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <div className={cn("relative inline-flex flex-col items-center select-none", className)}>
        {/* Local Radiance Halo */}
        <motion.div
          animate={{
            scale: isAwakened ? 1.6 : 1,
            opacity: isAwakened ? 0.9 : 0.45,
          }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute -top-10 w-32 h-32 rounded-full bg-[radial-gradient(circle,rgba(229,169,60,0.35)_0%,rgba(209,73,42,0.15)_40%,transparent_70%)] blur-2xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Hospitality Message: "JI AAYAN NU" */}
        <AnimatePresence>
          {isAwakened && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.96 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-3 text-center pointer-events-none z-10"
            >
              <span className="font-serif text-sm sm:text-base uppercase tracking-[0.35em] font-semibold text-amber-300 drop-shadow-[0_2px_12px_rgba(229,169,60,0.8)]">
                Ji Aayan Nu
              </span>
              <span className="block text-[9px] uppercase tracking-[0.25em] text-cream-300/90 font-sans mt-0.5">
                May light grace your visit
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Diya Vessel & Flame Button */}
        <button
          type="button"
          onClick={triggerDiya}
          aria-label="Light the diya"
          aria-pressed={isAwakened}
          title="Click to ignite the traditional hospitality flame"
          className={cn(
            "group relative flex flex-col items-center justify-end p-2.5 rounded-full cursor-pointer transition-transform duration-300",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-950",
            "hover:scale-105 active:scale-95 interactive-element"
          )}
        >
          {/* Flame */}
          <div className="relative h-7 w-5 flex items-end justify-center mb-0.5">
            <motion.div
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      scaleY: isAwakened ? [1.1, 1.35, 1.15, 1.3, 1.1] : [0.85, 1.05, 0.9, 1.0, 0.85],
                      scaleX: isAwakened ? [1, 1.12, 0.96, 1.08, 1] : [0.92, 1.04, 0.94, 1.02, 0.92],
                      opacity: isAwakened ? [0.95, 1, 0.92, 1, 0.95] : [0.75, 0.9, 0.8, 0.9, 0.75],
                    }
              }
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="origin-bottom relative flex flex-col items-center"
            >
              {/* Outer Golden Flame */}
              <div
                className={cn(
                  "rounded-t-full rounded-b-[40%] bg-gradient-to-t from-terracotta-500 via-amber-400 to-amber-200 transition-all duration-500",
                  isAwakened
                    ? "w-4 h-7 shadow-[0_0_20px_rgba(229,169,60,0.95)]"
                    : "w-3 h-5 shadow-[0_0_10px_rgba(229,169,60,0.6)]"
                )}
              />
              {/* Inner White-Cream Core */}
              <div
                className={cn(
                  "absolute bottom-0.5 rounded-t-full bg-cream-50 transition-all duration-500",
                  isAwakened ? "w-1.5 h-3.5 opacity-95" : "w-1 h-2 opacity-80"
                )}
              />
            </motion.div>
          </div>

          {/* Traditional Terracotta Vessel (SVG) */}
          <svg
            width="38"
            height="18"
            viewBox="0 0 38 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-300 drop-shadow-md group-hover:drop-shadow-[0_0_8px_rgba(229,169,60,0.5)]"
          >
            {/* Clay Bowl Base */}
            <path
              d="M3 6 C6 14, 32 14, 35 6 C35 6, 32 4, 19 4 C6 4, 3 6, 3 6 Z"
              fill={isAwakened ? "#B34728" : "#8A361F"}
              stroke="#E5A93C"
              strokeWidth="1"
            />
            {/* Spout Lip */}
            <ellipse
              cx="19"
              cy="5.5"
              rx="15"
              ry="2.5"
              fill={isAwakened ? "#D1492A" : "#6E2B18"}
              stroke="#F3C068"
              strokeWidth="0.75"
            />
            {/* Oil Center */}
            <ellipse
              cx="19"
              cy="5.5"
              rx="10"
              ry="1.5"
              fill={isAwakened ? "#E5A93C" : "#A67224"}
            />
          </svg>

          {/* Under-diya subtle hint text */}
          <span className="text-[8px] uppercase tracking-[0.25em] text-cream-400/70 font-sans mt-1 group-hover:text-amber-300 transition-colors">
            {isAwakened ? "Flame Awakened" : "Touch to Welcome"}
          </span>
        </button>
      </div>
    </>
  );
};
