import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../../config/site';
import { fadeUp } from '../../animations/variants';

export const ExperienceSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-charcoal-950 border-t border-charcoal-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-saffron-400 font-bold block mb-2">
            The Immersion
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-cream-100 font-semibold tracking-tight">
            Three Expressions of Punjabi Hospitality
          </h2>
          <p className="text-sm sm:text-base text-cream-400 font-light mt-3">
            Every dining ritual at Pind Da Dhaba is crafted to evoke the rustic splendor of rural feast traditions.
          </p>
        </div>

        {/* 3 Experience Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {siteConfig.experiences.map((exp, idx) => (
            <motion.div
              key={exp.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              custom={idx}
              className="group relative h-[480px] overflow-hidden border border-charcoal-700/80 shadow-2xl flex flex-col justify-end p-8"
            >
              {/* Background Image with Zoom */}
              <img
                src={exp.image}
                alt={exp.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-1000 ease-out brightness-[0.45] group-hover:brightness-[0.35]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/60 to-transparent" />

              {/* Decorative Corner Accent */}
              <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-terracotta-500/40 group-hover:border-saffron-400 transition-colors" />

              {/* Content Box */}
              <div className="relative z-10 space-y-2">
                <span className="text-xs uppercase tracking-[0.2em] text-saffron-400 font-semibold">
                  0{idx + 1} — Experience
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-cream-100 font-bold tracking-wide">
                  {exp.title}
                </h3>
                <p className="text-sm font-serif italic text-terracotta-400">
                  {exp.tagline}
                </p>
                <p className="text-xs sm:text-sm text-cream-300 font-light leading-relaxed pt-2 opacity-90 group-hover:opacity-100 transition-opacity">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
