import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '../../config/site';
import { DietaryBadge, SpicyBadge } from '../common/Badge';
import { formatPrice } from '../../lib/utils';
import { fadeUp } from '../../animations/variants';

export const SignatureDishes: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-charcoal-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-terracotta-400 font-bold block mb-2">
              Culinary Signatures
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-cream-100 font-semibold tracking-tight">
              Honoured Over Charcoal & Ghee
            </h2>
          </div>

          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-saffron-400 hover:text-saffron-300 font-semibold transition-colors group"
          >
            <span>View Complete Menu</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* 4 Signature Dish Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {siteConfig.signatureDishes.map((dish, idx) => (
            <motion.div
              key={dish.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              custom={idx}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="group bg-charcoal-900 border border-charcoal-750 flex flex-col h-full overflow-hidden hover:border-terracotta-500/50 hover:shadow-2xl hover:shadow-terracotta-500/10 transition-colors"
            >
              {/* Image Container with Zoom & Overlay */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-charcoal-850">
                <img
                  src={dish.image}
                  alt={dish.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-transparent to-transparent opacity-80" />

                {/* Dietary Badge & Spice Badge overlay */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <DietaryBadge vegetarian={dish.vegetarian} />
                  <SpicyBadge spicy={dish.spicy} />
                </div>

                {/* Category Pill */}
                <div className="absolute top-3 right-3 px-2 py-0.5 bg-charcoal-950/80 backdrop-blur-md text-[10px] uppercase tracking-wider text-cream-300 border border-charcoal-700">
                  {dish.category}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-serif text-xl text-cream-100 font-semibold group-hover:text-terracotta-400 transition-colors">
                      {dish.name}
                    </h3>
                    <span className="font-serif text-lg font-bold text-saffron-400 shrink-0">
                      {formatPrice(dish.price)}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-cream-400 leading-relaxed font-light mb-6">
                    {dish.description}
                  </p>
                </div>

                {/* Bottom CTA Row */}
                <div className="pt-4 border-t border-charcoal-800 flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-widest text-cream-400">
                    Traditional Preparation
                  </span>
                  <div className="w-7 h-7 rounded-full bg-charcoal-800 flex items-center justify-center text-cream-300 group-hover:bg-terracotta-500 group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
