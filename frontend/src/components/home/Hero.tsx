import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { siteConfig } from '../../config/site';
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
  const bgParallaxX = useTransform(smoothX, [-800, 800], [14, -14]);
  const bgParallaxY = useTransform(smoothY, [-600, 600], [8, -8]);

  // Midground atmospheric haze & light sources
  const midParallaxX = useTransform(smoothX, [-800, 800], [7, -7]);
  const midParallaxY = useTransform(smoothY, [-600, 600], [4, -4]);

  // Foreground host characters (integrated seamlessly into left/right corridors)
  const leftHostX = useTransform(smoothX, [-800, 800], [-18, 18]);
  const leftHostY = useTransform(smoothY, [-600, 600], [-8, 8]);
  const rightHostX = useTransform(smoothX, [-800, 800], [18, -18]);
  const rightHostY = useTransform(smoothY, [-600, 600], [-8, 8]);

  // Proximity-based dynamic lantern/hearth lighting response on hosts
  const leftHostLight = useTransform(smoothX, [-700, -150, 250], [0.95, 0.65, 0.4]);
  const rightHostLight = useTransform(smoothX, [-250, 150, 700], [0.4, 0.65, 0.95]);

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
    <section className="relative min-h-[96vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 select-none">
      {/* ========================================================================= */}
      {/* 1. DOMINANT BACKGROUND: ROYAL PUNJABI HAVELI ENVIRONMENT                  */}
      {/* ========================================================================= */}
      <motion.div
        style={{
          x: shouldReduceMotion ? 0 : bgParallaxX,
          y: shouldReduceMotion ? 0 : bgParallaxY,
        }}
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: luxuryEase }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <img
          src={siteConfig.hero.bgImage}
          alt="Royal Punjabi Haveli Architecture"
          className="w-full h-full object-cover object-center filter brightness-[0.80] contrast-[1.06] saturate-[1.04]"
        />

        {/* Soft Vignette & Depth Shadow — Arches, balconies, and floor reflections remain clearly visible */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/20 to-charcoal-950/65" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(10,10,9,0.72)_100%)]" />

        {/* Center Spotlight: Soft warm radiance behind typography */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(229,169,60,0.12)_0%,transparent_60%)]" />

        {/* Dynamic Day/Night Lighting Overlay */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-1500 ${
            isDay
              ? 'bg-gradient-to-tr from-amber-600/10 via-amber-200/10 to-transparent opacity-80'
              : 'bg-[radial-gradient(ellipse_at_top,rgba(229,169,60,0.06)_0%,rgba(10,10,9,0.5)_100%)] opacity-90'
          }`}
        />
      </motion.div>

      {/* ========================================================================= */}
      {/* 2. MIDGROUND LAYER: ATMOSPHERIC HAZE & PARTICLES                          */}
      {/* ========================================================================= */}
      <motion.div
        style={{
          x: shouldReduceMotion ? 0 : midParallaxX,
          y: shouldReduceMotion ? 0 : midParallaxY,
        }}
        className="absolute inset-0 z-5 pointer-events-none"
      >
        {/* Floating Haveli Embers & Dust Motes */}
        <HaveliParticles count={isDay ? 14 : 24} />
      </motion.div>

      {/* ========================================================================= */}
      {/* 3. FOREGROUND CHARACTER 1 — LEFT: PUNJABI MAN HOST (NO CARD BORDERS)      */}
      {/* ========================================================================= */}
      <motion.aside
        aria-label="Punjabi Host - Rangla Punjab"
        initial={{ opacity: 0, x: -35 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.5, ease: luxuryEase }}
        style={{
          x: shouldReduceMotion ? 0 : leftHostX,
          y: shouldReduceMotion ? 0 : leftHostY,
        }}
        className="hidden lg:block absolute bottom-0 left-2 lg:left-6 xl:left-14 2xl:left-24 z-10 pointer-events-auto select-none w-56 lg:w-68 xl:w-76 2xl:w-84 max-w-[22vw]"
      >
        {/* Living Haveli Host Figure: Seamless organic silhouette blend into the floor */}
        <div className="relative w-full h-[520px] lg:h-[590px] xl:h-[660px] flex items-end justify-center">
          {/* Warm Lantern / Hearth Rim Glow behind host */}
          <motion.div
            style={{ opacity: shouldReduceMotion ? 0.7 : leftHostLight }}
            className="absolute -inset-6 bg-[radial-gradient(ellipse_at_center,rgba(229,169,60,0.32)_0%,transparent_68%)] blur-2xl pointer-events-none transition-opacity duration-300"
          />

          {/* Floor Contact Soft Ambient Shadow */}
          <div className="absolute -bottom-2 inset-x-4 h-12 bg-black/80 rounded-full blur-xl pointer-events-none" />

          {/* 2.5D Bhangra-Inspired Rhythmic Movement & Dignified Breath */}
          <motion.div
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    y: [0, -4, -1, -5, 0],
                  }
            }
            transition={{
              duration: 5.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative w-full h-full flex items-end justify-center overflow-hidden"
            style={{
              maskImage: 'linear-gradient(to bottom, black 0%, black 72%, transparent 97%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 72%, transparent 97%)',
            }}
          >
            {/* Subtle shoulder sway & micro-tilt */}
            <motion.div
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      rotate: [0, 0.5, -0.3, 0.4, -0.15, 0],
                      scale: [1, 1.012, 1.006, 1.014, 1],
                    }
              }
              transition={{
                duration: 5.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{ transformOrigin: 'bottom center' }}
              className="w-full h-full flex items-end justify-center"
            >
              <img
                src="/characters/punjabi_man_host.jpg"
                alt="Traditional Punjabi Host standing in haveli"
                loading="eager"
                className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.05] drop-shadow-[0_15px_30px_rgba(0,0,0,0.85)]"
              />
            </motion.div>
          </motion.div>

          {/* Minimal Organic Floor Tag */}
          <div className="absolute bottom-3 inset-x-0 text-center pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-charcoal-950/70 border border-amber-500/20 backdrop-blur-xs text-[9px] uppercase tracking-[0.25em] text-amber-300/90 font-sans">
              <span className="w-1 h-1 rounded-full bg-amber-400" />
              Rangla Punjab
            </span>
          </div>
        </div>
      </motion.aside>

      {/* ========================================================================= */}
      {/* 4. CENTRAL COMPOSITION: CONTROLLED EDITORIAL LUXURY (35-40% OF HERO)      */}
      {/* ========================================================================= */}
      <div className="relative z-20 max-w-2xl mx-auto px-4 sm:px-6 text-center">
        {/* 1. Time-Aware Atmosphere Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: luxuryEase }}
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-amber-500/30 bg-charcoal-950/70 backdrop-blur-md shadow-md mb-4 sm:mb-5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(229,169,60,0.8)]" />
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.35em] uppercase text-amber-300 font-sans">
            FROM THE HEART OF PUNJAB • {atmosphere.greeting}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(229,169,60,0.8)]" />
        </motion.div>

        {/* 2. Headline: Controlled Editorial Serif Typography */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: luxuryEase }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-cream-100 font-bold uppercase tracking-tight leading-[1.04] max-w-xl mx-auto drop-shadow-[0_8px_25px_rgba(0,0,0,0.9)] my-3 sm:my-4"
        >
          Punjab, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cream-100 via-amber-200 to-terracotta-400">
            Served With Soul.
          </span>
        </motion.h1>

        {/* 3. Description: Pure Editorial Poetics */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: luxuryEase }}
          className="max-w-md mx-auto text-xs sm:text-sm md:text-base text-cream-200/90 font-light leading-relaxed font-sans mb-5 drop-shadow-md"
        >
          Bold flavours. Smoky tandoors. <br />
          The warmth of a true Punjabi table.
        </motion.p>

        {/* 4. Sacred Ceremonial Diya: Centered Hero Hospitality Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.9, ease: luxuryEase }}
          className="my-4 flex justify-center"
        >
          <InteractiveDiya />
        </motion.div>

        {/* 5. Refined Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 1.05, ease: luxuryEase }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2"
        >
          <Link to="/menu" className="w-full sm:w-auto">
            <button
              type="button"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xs bg-gradient-to-r from-terracotta-600 via-terracotta-500 to-terracotta-600 border border-amber-400/40 text-cream-50 text-xs font-semibold uppercase tracking-[0.2em] shadow-[0_8px_20px_rgba(200,90,50,0.35)] hover:shadow-[0_12px_28px_rgba(200,90,50,0.5)] hover:border-amber-300 transition-all duration-300 cursor-pointer interactive-element"
            >
              Explore Our Menu
            </button>
          </Link>

          <Link to="/reserve" className="w-full sm:w-auto">
            <button
              type="button"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xs border border-amber-500/40 hover:border-amber-300 hover:bg-amber-400/10 text-cream-100 text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 backdrop-blur-xs cursor-pointer interactive-element"
            >
              Book a Table
            </button>
          </Link>
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* 5. FOREGROUND CHARACTER 2 — RIGHT: PUNJABI WOMAN HOST (NO CARD BORDERS)    */}
      {/* ========================================================================= */}
      <motion.aside
        aria-label="Punjabi Hostess - Ji Aayan Nu"
        initial={{ opacity: 0, x: 35 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.5, ease: luxuryEase }}
        style={{
          x: shouldReduceMotion ? 0 : rightHostX,
          y: shouldReduceMotion ? 0 : rightHostY,
        }}
        className="hidden lg:block absolute bottom-0 right-2 lg:right-6 xl:right-14 2xl:right-24 z-10 pointer-events-auto select-none w-56 lg:w-68 xl:w-76 2xl:w-84 max-w-[22vw]"
      >
        {/* Living Haveli Host Figure: Seamless organic silhouette blend into the floor */}
        <div className="relative w-full h-[520px] lg:h-[590px] xl:h-[660px] flex items-end justify-center">
          {/* Warm Terracotta / Diya Rim Glow behind hostess */}
          <motion.div
            style={{ opacity: shouldReduceMotion ? 0.7 : rightHostLight }}
            className="absolute -inset-6 bg-[radial-gradient(ellipse_at_center,rgba(209,73,42,0.32)_0%,transparent_68%)] blur-2xl pointer-events-none transition-opacity duration-300"
          />

          {/* Floor Contact Soft Ambient Shadow */}
          <div className="absolute -bottom-2 inset-x-4 h-12 bg-black/80 rounded-full blur-xl pointer-events-none" />

          {/* 2.5D Namaste Hospitality & Tranquil Breathing */}
          <motion.div
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    y: [0, -3.5, -0.8, -4.5, 0],
                  }
            }
            transition={{
              duration: 6.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative w-full h-full flex items-end justify-center overflow-hidden"
            style={{
              maskImage: 'linear-gradient(to bottom, black 0%, black 72%, transparent 97%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 72%, transparent 97%)',
            }}
          >
            {/* Inner Namaste Motion: Respectful greeting bow & serene pause */}
            <motion.div
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      rotate: [0, -0.25, -0.55, -0.55, 0],
                      scale: [1, 1.010, 1.014, 1.014, 1],
                      y: [0, 1.2, 2.4, 2.4, 0],
                    }
              }
              transition={{
                duration: 6.8,
                repeat: Infinity,
                times: [0, 0.25, 0.45, 0.7, 1],
                ease: 'easeInOut',
              }}
              style={{ transformOrigin: 'bottom center' }}
              className="w-full h-full flex items-end justify-center"
            >
              <img
                src="/characters/punjabi_woman_host.jpg"
                alt="Traditional Punjabi Hostess standing in haveli"
                loading="eager"
                className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.05] drop-shadow-[0_15px_30px_rgba(0,0,0,0.85)]"
              />
            </motion.div>
          </motion.div>

          {/* Minimal Organic Floor Tag */}
          <div className="absolute bottom-3 inset-x-0 text-center pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-charcoal-950/70 border border-terracotta-500/20 backdrop-blur-xs text-[9px] uppercase tracking-[0.25em] text-terracotta-300/90 font-sans">
              <span className="w-1 h-1 rounded-full bg-terracotta-400" />
              Ji Aayan Nu
            </span>
          </div>
        </div>
      </motion.aside>

      {/* ========================================================================= */}
      {/* 6. BOTTOM SCROLL INDICATOR                                                */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2, ease: luxuryEase }}
        className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 hidden xs:flex flex-col items-center gap-1.5 cursor-pointer z-20 group interactive-element"
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight * 0.94,
            behavior: 'smooth',
          });
        }}
      >
        <span className="text-[9px] uppercase tracking-[0.32em] text-cream-400/80 font-medium font-sans group-hover:text-amber-300 transition-colors duration-200">
          {siteConfig.hero.scrollText}
        </span>
        <motion.div
          animate={shouldReduceMotion ? undefined : { y: [0, 4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-3.5 h-3.5 text-terracotta-400 group-hover:text-amber-400 transition-colors duration-200" />
        </motion.div>
      </motion.div>
    </section>
  );
};
