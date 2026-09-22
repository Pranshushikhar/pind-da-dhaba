import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

export const LuxuryCursor: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isEnabled, setIsEnabled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const cursorX = useMotionValue(-500);
  const cursorY = useMotionValue(-500);

  // Smooth, atmospheric lantern damping
  const springConfig = { damping: 32, stiffness: 120, mass: 0.8 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only enable on desktop devices with a mouse/fine pointer
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
      className="fixed top-0 left-0 pointer-events-none z-30 -translate-x-1/2 -translate-y-1/2 select-none"
      style={{
        x: smoothX,
        y: smoothY,
      }}
      aria-hidden="true"
    >
      {/* The Haveli Lantern of Light: Warm radial glow that bathes the architecture as the guest explores */}
      <motion.div
        animate={{
          width: isHovered ? 560 : 460,
          height: isHovered ? 560 : 460,
          opacity: isHovered ? 0.95 : 0.65,
          scale: isHovered ? 1.08 : 1,
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="rounded-full bg-[radial-gradient(circle,rgba(229,169,60,0.08)_0%,rgba(209,73,42,0.035)_40%,transparent_70%)] blur-2xl flex items-center justify-center"
      >
        {/* Subtle inner core lantern focal point */}
        <div
          className="w-20 h-20 rounded-full bg-[radial-gradient(circle,rgba(245,213,142,0.12)_0%,transparent_65%)] blur-sm transition-opacity duration-300"
          style={{ opacity: isHovered ? 0.8 : 0.4 }}
        />
      </motion.div>
    </motion.div>
  );
};
