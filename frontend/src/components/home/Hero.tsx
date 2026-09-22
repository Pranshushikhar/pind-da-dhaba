import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import { siteConfig } from '../../config/site';
import { Button } from '../common/Button';
import { luxuryEase } from '../../animations/variants';
import { useTheme } from '../../context/ThemeContext';
import { HaveliParticles } from './HaveliParticles';
import { InteractiveDiya } from './InteractiveDiya';

export const Hero: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const { theme, atmosphere } = useTheme();
  const isDay = theme === 'day';

  // Smooth 2.5D multi-layer spatial depth physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 38, stiffness: 45 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Background deep layer (slow, majestic perspective drift)
  const bgParallaxX = useTransform(smoothX, [-800, 800], [16, -16]);
  const bgParallaxY = useTransform(smoothY, [-600, 600], [10, -10]);

  // Midground atmospheric haze & light sources
  const midParallaxX = useTransform(smoothX, [-800, 800], [8, -8]);
  const midParallaxY = useTransform(smoothY, [-600, 600], [5, -5]);

  // Foreground host characters (crisp 2.5D architectural portal depth)
  const leftHostX = useTransform(smoothX, [-800, 800], [-22, 22]);
  const leftHostY = useTransform(smoothY, [-600, 600], [-10, 10]);
  const rightHostX = useTransform(smoothX, [-800, 800], [22, -22]);
  const rightHostY = useTransform(smoothY, [-600, 600], [-10, 10]);

  // Proximity-based dynamic lantern/hearth lighting response on hosts
  const leftHostLight = useTransform(smoothX, [-700, -150, 250], [1.0, 0.72, 0.45]);
  const rightHostLight = useTransform(smoothX, [-250, 150, 700], [0.45, 0.72, 1.0]);

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
    <section className="relative min-h-[96vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-20 select-none">
      {/* ========================================================================= */}
      {/* 1. BACKGROUND LAYER: DEEP ARCHITECTURAL HAVELI ENVIRONMENT                */}
      {/* ========================================================================= */}
      <motion.div
        style={{
          x: shouldReduceMotion ? 0 : bgParallaxX,
          y: shouldReduceMotion ? 0 : bgParallaxY,
        }}
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: luxuryEase }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <img
          src={siteConfig.hero.bgImage}
          alt="Royal Punjabi Haveli Architecture"
          className="w-full h-full object-cover object-center filter brightness-[0.52] contrast-[1.10]"
        />

        {/* Deep Haveli Stone Charcoal Overlays & Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/45 to-charcoal-950/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/92 via-transparent to-charcoal-950/92" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(10,10,9,0.94)_100%)]" />

        {/* Dynamic Day/Night Atmospheric Ambient Sunlight / Lantern Bloom */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-1500 ${
            isDay
              ? 'bg-gradient-to-tr from-amber-700/18 via-amber-200/15 to-transparent opacity-100'
              : 'bg-[radial-gradient(ellipse_at_top,rgba(229,169,60,0.08)_0%,rgba(10,10,9,0.75)_100%)] opacity-95'
          }`}
        />

        {/* Traditional Haveli Arch & Jaali Geometric Silhouette (Lattice Pattern) */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-screen overflow-hidden">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="jaali-lattice" width="60" height="60" patternUnits="userSpaceOnUse">
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

        {/* Grand Haveli Arch Portal Silhouette framing the top ceiling */}
        <div className="absolute inset-x-0 top-0 h-52 pointer-events-none opacity-30">
          <svg
            viewBox="0 0 1440 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <path
              d="M0 0 H1440 V45 C1200 45 1020 160 720 160 C420 160 240 45 0 45 V0 Z"
              fill="rgba(10,10,9,0.95)"
            />
            <path
              d="M0 48 C240 48 420 163 720 163 C1020 163 1200 48 1440 48"
              stroke="rgba(229,169,60,0.35)"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      </motion.div>

      {/* ========================================================================= */}
      {/* 2. MIDGROUND LAYER: ATMOSPHERIC HAZE, WARM HEARTH GLOW, PARTICLES        */}
      {/* ========================================================================= */}
      <motion.div
        style={{
          x: shouldReduceMotion ? 0 : midParallaxX,
          y: shouldReduceMotion ? 0 : midParallaxY,
        }}
        className="absolute inset-0 z-5 pointer-events-none"
      >
        {/* Living Haveli Floating Embers & Dust Particles */}
        <HaveliParticles count={isDay ? 18 : 32} />

        {/* Warm Amber Tandoor Key Light & Hearth Radiance */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_82%,rgba(209,73,42,0.26)_0%,transparent_62%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(229,169,60,0.12)_0%,transparent_52%)]" />
      </motion.div>

      {/* ========================================================================= */}
      {/* 3. FOREGROUND CHARACTER 1 — LEFT: PUNJABI MAN HOST (HAVELI NICHE)         */}
      {/* ========================================================================= */}
      <motion.aside
        aria-label="Punjabi Man Host - Rangla Punjab"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.3, delay: 0.35, ease: luxuryEase }}
        style={{
          x: shouldReduceMotion ? 0 : leftHostX,
          y: shouldReduceMotion ? 0 : leftHostY,
        }}
        className="hidden md:block absolute bottom-0 left-2 md:left-4 lg:left-8 xl:left-14 2xl:left-20 z-10 pointer-events-auto group w-52 md:w-60 lg:w-72 xl:w-80 2xl:w-88 max-w-[24vw] select-none cursor-pointer interactive-element"
      >
        {/* Royal Haveli Arched Stone Portal (Seamless with floor) */}
        <div className="relative overflow-hidden rounded-t-[160px] lg:rounded-t-[200px] border-t border-x border-amber-500/35 group-hover:border-amber-400/70 bg-gradient-to-t from-charcoal-950 via-charcoal-900/80 to-charcoal-950/50 pt-2 px-1.5 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_40px_rgba(229,169,60,0.16)] group-hover:shadow-[0_30px_70px_rgba(0,0,0,0.98),0_0_55px_rgba(229,169,60,0.32)] backdrop-blur-md transition-all duration-500">
          {/* Dynamic Oil Lamp / Lantern Glow influenced by cursor proximity */}
          <motion.div
            style={{ opacity: shouldReduceMotion ? 0.75 : leftHostLight }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(229,169,60,0.34)_0%,transparent_68%)] pointer-events-none transition-opacity duration-300"
          />

          {/* 2.5D Motion Wrapper: Bhangra-Inspired Rhythm & Steadfast Host Presence */}
          <motion.div
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    y: [0, -6, -2, -7, 0],
                  }
            }
            transition={{
              duration: 6.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative w-full h-[400px] md:h-[460px] lg:h-[530px] xl:h-[590px] flex items-end justify-center overflow-hidden"
          >
            {/* Inner Organic Rhythm: Subtle shoulder sway, dignified posture, turban micro-movement */}
            <motion.div
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      rotate: [0, 0.75, -0.4, 0.6, -0.25, 0],
                      scale: [1, 1.016, 1.008, 1.018, 1],
                    }
              }
              transition={{
                duration: 6.2,
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
                className="w-full h-full object-cover object-top filter brightness-[1.03] contrast-[1.06]"
              />
            </motion.div>

            {/* Seamless Floor Blend: Robes dissolve organically into dark polished haveli stone */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-charcoal-950 via-charcoal-950/90 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-charcoal-950/60 to-transparent pointer-events-none" />

            {/* Inset Antique Brass Plaque: RANGLA PUNJAB */}
            <div className="absolute bottom-4 inset-x-0 text-center pointer-events-none px-3">
              <div className="inline-flex flex-col items-center">
                <div className="border border-amber-500/40 bg-charcoal-950/95 px-3.5 py-1 rounded-xs shadow-lg backdrop-blur-md flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(229,169,60,0.9)]" />
                  <span className="text-[10px] lg:text-[11px] uppercase tracking-[0.28em] text-amber-300 font-semibold font-sans">
                    Rangla Punjab
                  </span>
                </div>
                <span className="text-[8px] uppercase tracking-[0.22em] text-cream-400/80 font-sans mt-1">
                  Host of the Hearth
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.aside>

      {/* ========================================================================= */}
      {/* 4. CENTRAL EDITORIAL MASTHEAD & SACRED WELCOME DIYA                       */}
      {/* ========================================================================= */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* 1. Time-Aware Atmosphere Eyebrow Tag */}
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: luxuryEase }}
          className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-1.5 rounded-full border border-amber-500/35 bg-charcoal-900/85 backdrop-blur-md shadow-[0_4px_28px_rgba(0,0,0,0.7)] mb-6 sm:mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(229,169,60,0.8)]" />
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[10px] sm:text-xs font-semibold tracking-[0.34em] uppercase text-amber-300 font-sans">
            {atmosphere.greeting} • {atmosphere.timeSubtitle}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(229,169,60,0.8)]" />
        </motion.div>

        {/* 2. Headline: Grand Editorial Serif Masthead */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.35, ease: luxuryEase }}
          className="font-serif text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-cream-100 font-bold uppercase tracking-tight leading-[0.98] mb-6 max-w-3xl mx-auto drop-shadow-[0_12px_35px_rgba(0,0,0,0.95)]"
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

        {/* 4. Action Buttons with Micro-Interactions */}
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
              className="w-full sm:w-auto bg-gradient-to-r from-terracotta-600 via-terracotta-500 to-terracotta-600 border border-amber-400/40 text-cream-50 font-semibold tracking-widest shadow-[0_12px_30px_rgba(200,90,50,0.35)] hover:shadow-[0_16px_38px_rgba(200,90,50,0.5)] hover:border-amber-300 transition-all duration-300 interactive-element"
            >
              {siteConfig.hero.primaryCTA}
            </Button>
          </Link>

          <Link to="/reserve" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-amber-500/50 text-cream-100 hover:border-amber-400 hover:bg-amber-400/10 tracking-widest transition-all duration-300 backdrop-blur-xs interactive-element"
            >
              {siteConfig.hero.secondaryCTA}
            </Button>
          </Link>
        </motion.div>

        {/* 5. Living Haveli Sacred Interactive Welcome Diya */}
        <div className="mt-9 flex justify-center">
          <InteractiveDiya />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. FOREGROUND CHARACTER 2 — RIGHT: PUNJABI WOMAN HOST (HAVELI NICHE)       */}
      {/* ========================================================================= */}
      <motion.aside
        aria-label="Punjabi Woman Host - Ji Aayan Nu"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.3, delay: 0.35, ease: luxuryEase }}
        style={{
          x: shouldReduceMotion ? 0 : rightHostX,
          y: shouldReduceMotion ? 0 : rightHostY,
        }}
        className="hidden md:block absolute bottom-0 right-2 md:right-4 lg:right-8 xl:right-14 2xl:right-20 z-10 pointer-events-auto group w-52 md:w-60 lg:w-72 xl:w-80 2xl:w-88 max-w-[24vw] select-none cursor-pointer interactive-element"
      >
        {/* Royal Haveli Arched Stone Portal (Seamless with floor) */}
        <div className="relative overflow-hidden rounded-t-[160px] lg:rounded-t-[200px] border-t border-x border-terracotta-500/35 group-hover:border-terracotta-400/70 bg-gradient-to-t from-charcoal-950 via-charcoal-900/80 to-charcoal-950/50 pt-2 px-1.5 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_40px_rgba(209,73,42,0.16)] group-hover:shadow-[0_30px_70px_rgba(0,0,0,0.98),0_0_55px_rgba(209,73,42,0.32)] backdrop-blur-md transition-all duration-500">
          {/* Dynamic Warm Terracotta / Lantern Glow influenced by cursor proximity */}
          <motion.div
            style={{ opacity: shouldReduceMotion ? 0.75 : rightHostLight }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(209,73,42,0.34)_0%,transparent_68%)] pointer-events-none transition-opacity duration-300"
          />

          {/* 2.5D Motion Wrapper: Graceful Namaste Hospitality & Subtle Breathing */}
          <motion.div
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    y: [0, -5, -1, -6, 0],
                  }
            }
            transition={{
              duration: 7.0,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative w-full h-[400px] md:h-[460px] lg:h-[530px] xl:h-[590px] flex items-end justify-center overflow-hidden"
          >
            {/* Inner Namaste Motion: Respectful tilt, serene pause, dignified return */}
            <motion.div
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      rotate: [0, -0.35, -0.7, -0.7, 0],
                      scale: [1, 1.014, 1.018, 1.018, 1],
                      y: [0, 1.8, 3.2, 3.2, 0],
                    }
              }
              transition={{
                duration: 7.0,
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
                className="w-full h-full object-cover object-top filter brightness-[1.03] contrast-[1.06]"
              />
            </motion.div>

            {/* Seamless Floor Blend: Robes dissolve organically into dark polished haveli stone */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-charcoal-950 via-charcoal-950/90 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-charcoal-950/60 to-transparent pointer-events-none" />

            {/* Inset Antique Brass Plaque: JI AAYAN NU */}
            <div className="absolute bottom-4 inset-x-0 text-center pointer-events-none px-3">
              <div className="inline-flex flex-col items-center">
                <div className="border border-terracotta-500/40 bg-charcoal-950/95 px-3.5 py-1 rounded-xs shadow-lg backdrop-blur-md flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-terracotta-400 shadow-[0_0_8px_rgba(209,73,42,0.9)]" />
                  <span className="text-[10px] lg:text-[11px] uppercase tracking-[0.28em] text-terracotta-300 font-semibold font-sans">
                    Ji Aayan Nu
                  </span>
                </div>
                <span className="text-[8px] uppercase tracking-[0.22em] text-cream-400/80 font-sans mt-1">
                  Welcome to Our Table
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.aside>

      {/* ========================================================================= */}
      {/* 6. BOTTOM SCROLL INDICATOR                                                */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.1, ease: luxuryEase }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 hidden xs:flex flex-col items-center gap-2 cursor-pointer z-20 group interactive-element"
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight * 0.94,
            behavior: 'smooth',
          });
        }}
      >
        <span className="text-[10px] uppercase tracking-[0.34em] text-cream-400/80 font-medium font-sans group-hover:text-amber-300 transition-colors duration-200">
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
