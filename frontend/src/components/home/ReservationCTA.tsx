import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Phone, Sparkles } from 'lucide-react';
import { siteConfig } from '../../config/site';
import { Button } from '../common/Button';
import { fadeUp } from '../../animations/variants';
import { HaveliParticles } from './HaveliParticles';

export const ReservationCTA: React.FC = () => {
  return (
    <section className="py-28 sm:py-36 bg-charcoal-950 border-t border-charcoal-800/90 relative overflow-hidden select-none">
      {/* Subtle Evening Mehfil Atmosphere: Warm Lights & Soft Depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(229,169,60,0.1)_0%,rgba(209,73,42,0.05)_40%,transparent_75%)] pointer-events-none" />

      {/* Floating Gentle Dust/Ember particles */}
      <div className="absolute inset-0 pointer-events-none">
        <HaveliParticles count={16} />
      </div>

      {/* Very Subtle Decorative Haveli Architecture Silhouette */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <svg width="800" height="400" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M50 400 V200 C50 80, 200 20, 400 20 C600 20, 750 80, 750 200 V400"
            stroke="#E5A93C"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative bg-gradient-to-b from-charcoal-900/95 via-charcoal-900/85 to-charcoal-950 border border-amber-500/30 p-8 sm:p-14 md:p-20 text-center shadow-[0_25px_60px_rgba(0,0,0,0.9)] rounded-xs overflow-hidden backdrop-blur-md"
        >
          {/* Subtle Warm Lantern Spots */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-terracotta-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-7">
            {/* Chapter 04 The Mehfil Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/40 bg-charcoal-950/80 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-amber-300 font-bold font-sans">
                Chapter 04 — The Mehfil
              </span>
            </div>

            {/* Poetic Heading */}
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-cream-100 font-bold uppercase tracking-tight leading-[1.1]">
              Come. Sit. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cream-100 via-amber-200 to-terracotta-400">
                Stay A While.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-cream-200/90 font-light leading-relaxed font-sans max-w-xl mx-auto">
              Under the warm amber lanterns of our haveli, conversations linger long after the tandoor embers cool. Pull up a woven chair, break slow-buttered bread, and share an evening of soul-stirring Punjabi warmth.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-4">
              <Link to="/reserve" className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-gradient-to-r from-terracotta-600 via-terracotta-500 to-terracotta-600 border border-amber-400/40 shadow-[0_10px_25px_rgba(200,90,50,0.35)] hover:shadow-[0_14px_35px_rgba(200,90,50,0.5)] font-semibold tracking-widest text-cream-50"
                >
                  <Calendar className="w-4 h-4" />
                  <span>BOOK YOUR TABLE</span>
                </Button>
              </Link>

              <a
                href={`tel:${siteConfig.contact.phoneClean}`}
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 border-amber-500/40 text-cream-200 hover:text-white hover:border-amber-400 tracking-widest backdrop-blur-xs"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Call For Enquiries</span>
                </Button>
              </a>
            </div>

            <p className="text-[11px] text-cream-400 uppercase tracking-widest pt-2 font-sans">
              Instant demo table reservation • Warm hospitality guaranteed
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
