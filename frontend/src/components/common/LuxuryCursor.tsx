import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

export const LuxuryCursor: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isEnabled, setIsEnabled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth, luxurious spring dampening
  const springConfig = { damping: 28, stiffness: 220, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only enable on desktop with fine mouse pointer
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isFinePointer || shouldReduceMotion) {
      return;
    }
    setIsEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = target.closest('button, a, input, select, textarea, [role="button"], [role="switch"], .interactive-element');
      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, shouldReduceMotion]);

  if (!isEnabled || shouldReduceMotion) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 select-none"
      style={{
        x: smoothX,
        y: smoothY,
      }}
      aria-hidden="true"
    >
      <motion.div
        animate={{
          width: isHovered ? 40 : 18,
          height: isHovered ? 40 : 18,
          opacity: isHovered ? 0.75 : 0.45,
          scale: isHovered ? 1.15 : 1,
          borderColor: isHovered ? 'rgba(229, 169, 60, 0.7)' : 'rgba(229, 169, 60, 0.35)',
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="rounded-full border border-amber-400/40 bg-radial from-amber-500/15 via-saffron-500/5 to-transparent shadow-[0_0_12px_rgba(229,169,60,0.25)] flex items-center justify-center backdrop-blur-[0.5px]"
      >
        {/* Tiny golden central focal dot */}
        <span
          className="w-1 h-1 rounded-full bg-amber-400 transition-opacity duration-200"
          style={{ opacity: isHovered ? 0.9 : 0.6 }}
        />
      </motion.div>
    </motion.div>
  );
};
