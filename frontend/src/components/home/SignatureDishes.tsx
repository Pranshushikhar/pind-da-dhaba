import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, BookOpen, Utensils } from 'lucide-react';
import { siteConfig, type MenuItemType } from '../../config/site';
import { DietaryBadge, SpicyBadge } from '../common/Badge';
import { formatPrice } from '../../lib/utils';
import { fadeUp } from '../../animations/variants';
import { DishOriginModal } from './DishOriginModal';

export const SignatureDishes: React.FC = () => {
  const [selectedDish, setSelectedDish] = useState<MenuItemType | null>(null);

  return (
    <section className="py-28 sm:py-36 bg-charcoal-950 relative overflow-hidden border-t border-charcoal-800/80 select-none">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(209,73,42,0.06)_0%,transparent_70%)] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Chapter 03 Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-charcoal-900/80 mb-3 shadow-md">
              <Utensils className="w-3 h-3 text-amber-400" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-amber-400 font-bold font-sans">
                Chapter 03 — The Table
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl text-cream-100 font-semibold tracking-tight">
              Honoured Over Charcoal & Ghee
            </h2>
            <p className="text-xs sm:text-sm text-cream-300 font-light mt-2 max-w-xl">
              Each recipe is an unbroken lineage from Punjab’s rural hearths. Select any dish to explore its origin documentary.
            </p>
          </div>

          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-saffron-400 hover:text-saffron-300 font-semibold transition-colors group interactive-element"
          >
            <span>View Complete Menu</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* 4 Cinematic Signature Dish Cards (Calm & Grounded, No Jumpy Translates) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {siteConfig.signatureDishes.map((dish, idx) => (
            <motion.div
              key={dish.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              custom={idx}
              onClick={() => setSelectedDish(dish)}
              className="group bg-charcoal-900 border border-charcoal-750 flex flex-col h-full overflow-hidden hover:border-terracotta-500/60 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(209,73,42,0.15)] transition-all duration-500 cursor-pointer interactive-element rounded-xs"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedDish(dish);
                }
              }}
              aria-label={`View origin documentary for ${dish.name}`}
            >
              {/* Image Container with Slow Cinematic Zoom & Steam/Lighting Shift */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-charcoal-850">
                <img
                  src={dish.image}
                  alt={dish.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-1000 ease-out filter brightness-[0.96] group-hover:brightness-105 contrast-[1.05]"
                />

                {/* Subtle Steam / Heat Haze Illusion on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/20 to-transparent opacity-75 group-hover:opacity-60 transition-opacity duration-700" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(243,192,104,0.12)_0%,transparent_65%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Dietary Badge & Spice Badge overlay */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <DietaryBadge vegetarian={dish.vegetarian} />
                  <SpicyBadge spicy={dish.spicy} />
                </div>

                {/* Category Pill */}
                <div className="absolute top-3 right-3 px-2.5 py-0.5 bg-charcoal-950/85 backdrop-blur-md text-[10px] uppercase tracking-wider text-cream-300 border border-charcoal-700 shadow-sm">
                  {dish.category}
                </div>
              </div>

              {/* Card Content with Typography Prominence on Hover */}
              <div className="p-6 flex flex-col flex-grow justify-between bg-charcoal-900 group-hover:bg-charcoal-850/90 transition-colors duration-500">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-serif text-xl sm:text-2xl text-cream-100 font-semibold group-hover:text-amber-300 transition-colors duration-300">
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

                {/* Bottom CTA Row: Origin Story Trigger */}
                <div className="pt-4 border-t border-charcoal-800 flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-widest text-amber-400 font-medium group-hover:text-amber-300 flex items-center gap-1.5 transition-colors">
                    <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                    <span>Origin Journey</span>
                  </span>
                  <div className="w-7 h-7 rounded-full bg-charcoal-800 flex items-center justify-center text-cream-300 group-hover:bg-terracotta-500 group-hover:text-white transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Editorial Food Documentary Modal */}
      <DishOriginModal
        dish={selectedDish}
        isOpen={!!selectedDish}
        onClose={() => setSelectedDish(null)}
      />
    </section>
  );
};
