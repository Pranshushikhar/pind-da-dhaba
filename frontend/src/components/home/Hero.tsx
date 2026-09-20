import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import { siteConfig } from '../../config/site';
import { Button } from '../common/Button';
import { luxuryEase } from '../../animations/variants';
import { PunjabiCharacterCanvas } from '../3d/PunjabiCharacterCanvas';

export const Hero: React.FC = () => {

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Cinematic Background Image with Zoom and Vignette */}
      <motion.div
        initial={{ scale: 1.12, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: luxuryEase }}
        className="absolute inset-0 z-0"
      >
        <img
          src={siteConfig.hero.bgImage}
          alt="Punjabi tandoor gastronomy"
          className="w-full h-full object-cover object-center filter brightness-[0.52] contrast-105"
        />
        {/* Layered Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/25 to-charcoal-950/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,rgba(10,10,9,0.65)_100%)]" />
      </motion.div>

      {/* CHARACTER 1 — LEFT: Punjabi Man Host in 3D Skeletal Bhangra */}
      <motion.aside
        aria-hidden="true"
        initial={{ opacity: 0, x: -35 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.1, delay: 0.6, ease: luxuryEase }}
        className="hidden md:block absolute bottom-6 lg:bottom-10 left-4 lg:left-8 xl:left-14 z-10 pointer-events-none w-36 md:w-44 lg:w-52 xl:w-60 max-w-[18vw] select-none"
      >
        <div className="relative overflow-hidden rounded-t-[100px] rounded-b-xl border border-saffron-500/25 bg-gradient-to-t from-charcoal-950 via-charcoal-900/40 to-transparent p-1 shadow-[0_12px_40px_rgba(0,0,0,0.85),0_0_25px_rgba(230,126,34,0.12)] backdrop-blur-xs">
          <PunjabiCharacterCanvas
            character="man"
            defaultClip="Bhangra"
            className="w-full h-[320px] sm:h-[360px] md:h-[400px] lg:h-[450px]"
          />
          {/* Subtle bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-charcoal-950 via-charcoal-950/80 to-transparent pointer-events-none" />
          <div className="absolute bottom-2 inset-x-0 text-center pointer-events-none">
            <span className="text-[9px] uppercase tracking-[0.25em] text-saffron-400 font-bold px-2 py-0.5 bg-charcoal-950/85 border border-saffron-500/30 rounded-xs shadow-sm">
              Rangla Punjab
            </span>
          </div>
        </div>
      </motion.aside>

      {/* Hero Central Content Stagger Sequence */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-6">
        {/* 1. Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: luxuryEase }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-saffron-500/30 bg-charcoal-900/60 backdrop-blur-md mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-saffron-400" />
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.28em] uppercase text-saffron-400">
            {siteConfig.hero.eyebrow}
          </span>
        </motion.div>

        {/* 2. Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: luxuryEase }}
          className="font-serif text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-cream-100 font-bold uppercase tracking-tight leading-[1.08] mb-6 max-w-3xl mx-auto"
        >
          Punjab, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cream-100 via-saffron-300 to-terracotta-400">
            Served With Soul.
          </span>
        </motion.h1>

        {/* 3. Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: luxuryEase }}
          className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-cream-300 font-light leading-relaxed mb-10"
        >
          {siteConfig.hero.description}
        </motion.p>

        {/* 4. Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease: luxuryEase }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <Link to="/menu" className="w-full sm:w-auto">
            <Button variant="primary" size="lg" className="w-full sm:w-auto">
              {siteConfig.hero.primaryCTA}
            </Button>
          </Link>

          <Link to="/reserve" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto border-cream-200/40 hover:bg-cream-100/10">
              {siteConfig.hero.secondaryCTA}
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* CHARACTER 2 — RIGHT: Punjabi Woman Host in 3D Skeletal Namaste Greeting */}
      <motion.aside
        aria-hidden="true"
        initial={{ opacity: 0, x: 35 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.1, delay: 0.6, ease: luxuryEase }}
        className="hidden md:block absolute bottom-6 lg:bottom-10 right-4 lg:right-8 xl:right-14 z-10 pointer-events-none w-36 md:w-44 lg:w-52 xl:w-60 max-w-[18vw] select-none"
      >
        <div className="relative overflow-hidden rounded-t-[100px] rounded-b-xl border border-terracotta-500/25 bg-gradient-to-t from-charcoal-950 via-charcoal-900/40 to-transparent p-1 shadow-[0_12px_40px_rgba(0,0,0,0.85),0_0_25px_rgba(209,73,42,0.12)] backdrop-blur-xs">
          <PunjabiCharacterCanvas
            character="woman"
            defaultClip="Namaste"
            className="w-full h-[320px] sm:h-[360px] md:h-[400px] lg:h-[450px]"
          />
          {/* Subtle bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-charcoal-950 via-charcoal-950/80 to-transparent pointer-events-none" />
          <div className="absolute bottom-2 inset-x-0 text-center pointer-events-none">
            <span className="text-[9px] uppercase tracking-[0.25em] text-terracotta-400 font-bold px-2 py-0.5 bg-charcoal-950/85 border border-terracotta-500/30 rounded-xs shadow-sm">
              Ji Aayan Nu
            </span>
          </div>
        </div>
      </motion.aside>

      {/* 5. Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2, ease: luxuryEase }}
        className="absolute bottom-3 sm:bottom-8 left-1/2 -translate-x-1/2 hidden xs:flex flex-col items-center gap-2 cursor-pointer z-10"
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight * 0.9,
            behavior: 'smooth',
          });
        }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-cream-400 font-medium">
          {siteConfig.hero.scrollText}
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-terracotta-400" />
        </motion.div>
      </motion.div>
    </section>
  );
};

