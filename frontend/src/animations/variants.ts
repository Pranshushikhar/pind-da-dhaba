import type { Variants } from 'framer-motion';

// Smooth luxury easing curve
export const luxuryEase = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: luxuryEase,
      delay: custom * 0.1,
    },
  }),
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: luxuryEase,
      delay: custom * 0.1,
    },
  }),
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -36 },
  visible: (custom = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: luxuryEase,
      delay: custom * 0.1,
    },
  }),
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 36 },
  visible: (custom = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: luxuryEase,
      delay: custom * 0.1,
    },
  }),
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: (custom = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: luxuryEase,
      delay: custom * 0.08,
    },
  }),
};

export const staggerChildren: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.08 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.1,
      ease: luxuryEase,
    },
  },
};
