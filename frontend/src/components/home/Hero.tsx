import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import { siteConfig } from '../../config/site';
import { Button } from '../common/Button';
import { luxuryEase } from '../../animations/variants';

export const Hero: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  // Subtle cursor parallax for high-end agency feel (max 6-8px, slow dampening)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 60 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const leftHostParallaxX = useTransform(smoothX, [-600, 600], [-8, 8]);
  const leftHostParallaxY = useTransform(smoothY, [-400, 400], [-6, 6]);
  const rightHostParallaxX = useTransform(smoothX, [-600, 600], [8, -8]);
  const rightHostParallaxY = useTransform(smoothY, [-400, 400], [-6, 6]);
  const bgParallaxX = useTransform(smoothX, [-600, 600], [6, -6]);
  const bgParallaxY = useTransform(smoothY, [-400, 400], [4, -4]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth >= 1024) {
        const { innerWidth, innerHeight } = window;
        mouseX.set(e.clientX - innerWidth / 2);
        mouseY.set(e.clientY - innerHeight / 2);
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-20 select-none">
      {/* ========================================================================= */}
      {/* 1. CINEMATIC BACKGROUND WITH HAVELI ARCHITECTURAL ATMOSPHERE              */}
      {/* ========================================================================= */}
      <motion.div
        style={{
          x: shouldReduceMotion ? 0 : bgParallaxX,
          y: shouldReduceMotion ? 0 : bgParallaxY,
        }}
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: luxuryEase }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <img
          src={siteConfig.hero.bgImage}
          alt="Royal Punjabi Tandoor Gastronomy"
          className="w-full h-full object-cover object-center filter brightness-[0.42] contrast-110"
        />

        {/* Deep Haveli Stone Charcoal Vignette Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/45 to-charcoal-950/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/85 via-transparent to-charcoal-950/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(10,10,9,0.85)_100%)]" />

        {/* Warm Amber Tandoor Key Light & Hearth Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_78%,rgba(209,73,42,0.18)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(229,169,60,0.08)_0%,transparent_50%)]" />

        {/* Subtle Traditional Haveli Arch & Jaali Geometric Silhouette (Low Opacity SVG) */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-screen overflow-hidden">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="jaali-lattice" width="60" height="60" patternUnits="userSpaceOnUse">
                {/* Refined 8-pointed star jaali lattice pattern */}
                <path
                  d="M30 0 L36 18 L54 18 L39 29 L45 47 L30 36 L15 47 L21 29 L6 18 L24 18 Z"
                  fill="none"
                  stroke="#E5A93C"
                  strokeWidth="1"
                />
                <circle cx="30" cy="30" r="4" fill="none" stroke="#E5A93C" strokeWidth="0.8" />
                <circle cx="0" cy="0" r="3" fill="none" stroke="#E5A93C" strokeWidth="0.8" />
                <circle cx="60" cy="0" r="3" fill="none" stroke="#E5A93C" strokeWidth="0.8" />
                <circle cx="0" cy="60" r="3" fill="none" stroke="#E5A93C" strokeWidth="0.8" />
                <circle cx="60" cy="60" r="3" fill="none" stroke="#E5A93C" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#jaali-lattice)" />
          </svg>
        </div>

        {/* Soft Haveli Arch Frame Contour Overlay */}
        <div className="absolute inset-x-0 top-0 h-48 pointer-events-none opacity-20">
          <svg
            viewBox="0 0 1440 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full preserve-3d"
          >
            <path
              d="M0 0 H1440 V40 C1200 40 1000 140 720 140 C440 140 240 40 0 40 V0 Z"
              fill="rgba(10,10,9,0.9)"
            />
            <path
              d="M0 42 C240 42 440 142 720 142 C1000 142 1200 42 1440 42"
              stroke="rgba(229,169,60,0.25)"
              strokeWidth="1"
            />
          </svg>
        </div>
      </motion.div>

      {/* ========================================================================= */}
      {/* 2. CHARACTER 1 — LEFT: PUNJABI MAN HOST (2.5D CINEMATIC HAVELI NICHE)     */}
      {/* ========================================================================= */}
      <motion.aside
        aria-label="Punjabi Man Host - Rangla Punjab"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.4, ease: luxuryEase }}
        style={{
          x: shouldReduceMotion ? 0 : leftHostParallaxX,
          y: shouldReduceMotion ? 0 : leftHostParallaxY,
        }}
        className="hidden md:block absolute bottom-3 lg:bottom-6 left-3 md:left-6 lg:left-8 xl:left-14 2xl:left-20 z-10 pointer-events-none w-44 md:w-52 lg:w-60 xl:w-72 max-w-[20vw] select-none"
      >
        {/* Royal Haveli Arched Niche Frame */}
        <div className="relative overflow-hidden rounded-t-[130px] lg:rounded-t-[150px] rounded-b-2xl border border-amber-500/25 bg-gradient-to-t from-charcoal-950 via-charcoal-900/70 to-charcoal-950/40 p-1.5 shadow-[0_24px_50px_rgba(0,0,0,0.95),0_0_35px_rgba(229,169,60,0.12)] backdrop-blur-md">
          {/* Subtle Ambient Rim Glow behind host */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(229,169,60,0.2)_0%,transparent_68%)] pointer-events-none" />

          {/* 2.5D Multi-Layer Motion Wrapper */}
          <motion.div
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    y: [0, -6, -2, -7, 0],
                  }
            }
            transition={{
              duration: 6.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative w-full h-[360px] md:h-[420px] lg:h-[480px] xl:h-[530px] flex items-end justify-center overflow-hidden"
          >
            {/* Inner Organic Rhythm Layer: Bhangra-inspired subtle shoulder sway & proud host breathing */}
            <motion.div
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      rotate: [0, 0.75, -0.45, 0.65, -0.3, 0],
                      scale: [1, 1.014, 1.005, 1.018, 1],
                    }
              }
              transition={{
                duration: 6.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{ transformOrigin: 'bottom center' }}
              className="w-full h-full flex items-end justify-center"
            >
              <img
                src="/characters/punjabi_man_host.jpg"
                alt="Traditional Punjabi Host"
                loading="eager"
                className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-105"
              />
            </motion.div>

            {/* Seamless Haveli Floor Contact Fade */}
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-charcoal-950 via-charcoal-950/85 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-charcoal-950/50 to-transparent pointer-events-none" />

            {/* Antique Brass Plaque: RANGLA PUNJAB */}
            <div className="absolute bottom-3 inset-x-0 text-center pointer-events-none px-3">
              <div className="inline-flex flex-col items-center">
                <div className="border border-amber-500/35 bg-charcoal-950/92 px-3 py-0.5 rounded-xs shadow-md backdrop-blur-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(229,169,60,0.8)]" />
                  <span className="text-[9px] lg:text-[10px] uppercase tracking-[0.26em] text-amber-300 font-semibold font-sans">
                    Rangla Punjab
                  </span>
                </div>
                <span className="text-[8px] uppercase tracking-[0.2em] text-cream-400/70 font-sans mt-0.5">
                  Host of the Hearth
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.aside>

      {/* ========================================================================= */}
      {/* 3. HERO CENTRAL EDITORIAL MASTHEAD CONTENT                                */}
      {/* ========================================================================= */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* 1. Eyebrow Tag: From the Heart of Punjab */}
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: luxuryEase }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-amber-500/30 bg-charcoal-900/75 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.6)] mb-6 sm:mb-8"
        >
          <span className="w-1 h-1 rounded-full bg-amber-400" />
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[10px] sm:text-xs font-semibold tracking-[0.32em] uppercase text-amber-300/90 font-sans">
            {siteConfig.hero.eyebrow}
          </span>
          <span className="w-1 h-1 rounded-full bg-amber-400" />
        </motion.div>

        {/* 2. Headline: Royal Luxury Editorial Masthead */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.35, ease: luxuryEase }}
          className="font-serif text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-cream-100 font-bold uppercase tracking-tight leading-[1.05] mb-6 max-w-3xl mx-auto drop-shadow-[0_8px_24px_rgba(0,0,0,0.8)]"
        >
          Punjab, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cream-100 via-amber-200 to-terracotta-400">
            Served With Soul.
          </span>
        </motion.h1>

        {/* 3. Description: Balanced Breathing Room */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.55, ease: luxuryEase }}
          className="max-w-xl sm:max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-cream-200/90 font-light leading-relaxed mb-8 sm:mb-10 font-sans"
        >
          {siteConfig.hero.description}
        </motion.p>

        {/* 4. Action Buttons: Refined Luxury Micro-Interactions */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.75, ease: luxuryEase }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <Link to="/menu" className="w-full sm:w-auto">
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-terracotta-600 via-terracotta-500 to-terracotta-600 border border-amber-400/30 text-cream-50 font-semibold tracking-widest shadow-[0_10px_25px_rgba(200,90,50,0.3)] hover:shadow-[0_14px_30px_rgba(200,90,50,0.45)] hover:border-amber-300 transition-all duration-300"
            >
              {siteConfig.hero.primaryCTA}
            </Button>
          </Link>

          <Link to="/reserve" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-amber-500/40 text-cream-100 hover:border-amber-400 hover:bg-amber-400/10 tracking-widest transition-all duration-300 backdrop-blur-xs"
            >
              {siteConfig.hero.secondaryCTA}
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* 4. CHARACTER 2 — RIGHT: PUNJABI WOMAN HOST (2.5D CINEMATIC NAMASTE NICHE) */}
      {/* ========================================================================= */}
      <motion.aside
        aria-label="Punjabi Woman Host - Ji Aayan Nu"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.4, ease: luxuryEase }}
        style={{
          x: shouldReduceMotion ? 0 : rightHostParallaxX,
          y: shouldReduceMotion ? 0 : rightHostParallaxY,
        }}
        className="hidden md:block absolute bottom-3 lg:bottom-6 right-3 md:right-6 lg:right-8 xl:right-14 2xl:right-20 z-10 pointer-events-none w-44 md:w-52 lg:w-60 xl:w-72 max-w-[20vw] select-none"
      >
        {/* Royal Haveli Arched Niche Frame */}
        <div className="relative overflow-hidden rounded-t-[130px] lg:rounded-t-[150px] rounded-b-2xl border border-terracotta-500/25 bg-gradient-to-t from-charcoal-950 via-charcoal-900/70 to-charcoal-950/40 p-1.5 shadow-[0_24px_50px_rgba(0,0,0,0.95),0_0_35px_rgba(209,73,42,0.12)] backdrop-blur-md">
          {/* Subtle Ambient Rim Glow behind hostess */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(209,73,42,0.2)_0%,transparent_68%)] pointer-events-none" />

          {/* 2.5D Multi-Layer Motion Wrapper */}
          <motion.div
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    y: [0, -5, -1, -6, 0],
                  }
            }
            transition={{
              duration: 7.4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative w-full h-[360px] md:h-[420px] lg:h-[480px] xl:h-[530px] flex items-end justify-center overflow-hidden"
          >
            {/* Inner Namaste / Welcome Rhythm: graceful forward tilt, respectful hold, smooth return */}
            <motion.div
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      rotate: [0, -0.3, -0.65, -0.65, 0],
                      scale: [1, 1.01, 1.015, 1.015, 1],
                      y: [0, 1.5, 2.5, 2.5, 0],
                    }
              }
              transition={{
                duration: 7.4,
                repeat: Infinity,
                times: [0, 0.25, 0.45, 0.7, 1],
                ease: 'easeInOut',
              }}
              style={{ transformOrigin: 'bottom center' }}
              className="w-full h-full flex items-end justify-center"
            >
              <img
                src="/characters/punjabi_woman_host.jpg"
                alt="Traditional Punjabi Hostess"
                loading="eager"
                className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-105"
              />
            </motion.div>

            {/* Seamless Haveli Floor Contact Fade */}
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-charcoal-950 via-charcoal-950/85 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-charcoal-950/50 to-transparent pointer-events-none" />

            {/* Antique Brass Plaque: JI AAYAN NU */}
            <div className="absolute bottom-3 inset-x-0 text-center pointer-events-none px-3">
              <div className="inline-flex flex-col items-center">
                <div className="border border-terracotta-500/35 bg-charcoal-950/92 px-3 py-0.5 rounded-xs shadow-md backdrop-blur-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-terracotta-400 shadow-[0_0_6px_rgba(209,73,42,0.8)]" />
                  <span className="text-[9px] lg:text-[10px] uppercase tracking-[0.26em] text-terracotta-300 font-semibold font-sans">
                    Ji Aayan Nu
                  </span>
                </div>
                <span className="text-[8px] uppercase tracking-[0.2em] text-cream-400/70 font-sans mt-0.5">
                  Welcome to Our Table
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.aside>

      {/* ========================================================================= */}
      {/* 5. BOTTOM SCROLL INDICATOR                                                */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.1, ease: luxuryEase }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 hidden xs:flex flex-col items-center gap-2 cursor-pointer z-20 group"
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight * 0.92,
            behavior: 'smooth',
          });
        }}
      >
        <span className="text-[10px] uppercase tracking-[0.32em] text-cream-400/80 font-medium font-sans group-hover:text-amber-300 transition-colors duration-200">
          {siteConfig.hero.scrollText}
        </span>
        <motion.div
          animate={shouldReduceMotion ? undefined : { y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4 text-terracotta-400 group-hover:text-amber-400 transition-colors duration-200" />
        </motion.div>
      </motion.div>
    </section>
  );
};


