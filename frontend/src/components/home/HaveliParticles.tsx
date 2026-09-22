import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  startY: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

export const HaveliParticles: React.FC<{ count?: number; className?: string }> = ({
  count = 22,
  className = '',
}) => {
  const shouldReduceMotion = useReducedMotion();

  // Stable random particle attributes
  const particles = useMemo<Particle[]>(() => {
    const colors = ['#E5A93C', '#F3C068', '#C85A32', '#FCD385', '#E0724C'];
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: (i * 4.5 + ((i * 17) % 25)) % 100, // distributed across 0-100% width
      startY: 85 + (i % 15), // start near bottom
      size: 1.5 + (i % 3) * 0.8, // 1.5px to 3.1px
      duration: 10 + (i % 7) * 2.2, // 10s to 23s slow float
      delay: (i * 0.7) % 6,
      color: colors[i % colors.length],
    }));
  }, [count]);

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden z-[5] ${className}`}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full shadow-[0_0_8px_currentColor]"
          style={{
            left: `${p.x}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            color: p.color,
          }}
          initial={{
            y: `${p.startY}vh`,
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            y: ['88vh', '15vh', '-5vh'],
            opacity: [0, 0.65, 0.85, 0.4, 0],
            x: [
              0,
              Math.sin(p.id) * 25,
              Math.cos(p.id) * 35,
              Math.sin(p.id * 1.5) * 20,
            ],
            scale: [0.6, 1.2, 0.9, 0.4],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};
