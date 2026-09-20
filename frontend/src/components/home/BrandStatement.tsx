import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../../config/site';
import { fadeUp } from '../../animations/variants';

export const BrandStatement: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-charcoal-900 relative overflow-hidden border-t border-charcoal-800/80">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-terracotta-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Editorial Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="inline-flex items-center gap-2"
            >
              <span className="w-8 h-px bg-terracotta-500" />
              <span className="text-xs uppercase tracking-[0.25em] text-saffron-400 font-bold">
                {siteConfig.brandStatement.label}
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={1}
              className="font-serif text-3xl sm:text-4xl md:text-5xl text-cream-100 font-semibold tracking-tight leading-tight"
            >
              {siteConfig.brandStatement.heading}
            </motion.h2>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={2}
              className="text-base sm:text-lg text-cream-300 font-light leading-relaxed"
            >
              {siteConfig.brandStatement.description}
            </motion.p>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={3}
              className="text-sm text-cream-400 leading-relaxed border-l-2 border-terracotta-500/60 pl-4 italic"
            >
              "Food in Punjab was never merely sustenance; it was an act of fellowship, an open invitation to pull up a woven charpai and break bread under an endless sky."
            </motion.p>
          </div>

          {/* Right Metrics / Stats Counter Grid */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {siteConfig.brandStatement.stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  custom={idx + 1}
                  className="p-6 bg-charcoal-850 border border-charcoal-700/60 hover:border-terracotta-500/40 transition-colors"
                >
                  <p className="font-serif text-3xl sm:text-4xl font-bold text-saffron-400 tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-xs uppercase tracking-widest text-cream-400 mt-2 font-medium">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
