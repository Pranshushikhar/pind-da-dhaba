import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { siteConfig } from '../../config/site';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const items = siteConfig.testimonials;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isPaused, currentIndex]);

  const current = items[currentIndex];

  return (
    <section
      id="reviews"
      aria-label="Customer Reviews (Fictional Demo Content)"
      className="scroll-mt-28 py-24 sm:py-32 bg-charcoal-900 border-t border-charcoal-800 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-saffron-400 font-bold block mb-2">
            Words From Our Table (Demo Content)
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-cream-100 font-semibold tracking-tight">
            Memories Made Over Smoky Clay Pots
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative bg-charcoal-850 border border-charcoal-700/80 p-8 sm:p-12 md:p-16 shadow-2xl min-h-[320px] flex flex-col justify-between">
          <Quote className="absolute top-8 left-8 w-12 h-12 text-terracotta-500/15 pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* Star Rating */}
              <div className="flex items-center gap-1">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-saffron-400 fill-saffron-400" />
                ))}
              </div>

              {/* Review Text */}
              <blockquote className="font-serif text-lg sm:text-xl md:text-2xl text-cream-100 font-normal leading-relaxed italic">
                "{current.review}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center gap-4 pt-4 border-t border-charcoal-750">
                <img
                  src={current.avatar}
                  alt={current.name}
                  className="w-12 h-12 rounded-full object-cover border border-terracotta-500/50"
                />
                <div>
                  <h4 className="font-serif text-lg text-cream-100 font-semibold">
                    {current.name}
                  </h4>
                  <p className="text-xs text-cream-400 uppercase tracking-wider">
                    {current.role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls & Pagination */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-charcoal-800">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {items.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                    currentIndex === idx
                      ? 'w-8 bg-terracotta-500'
                      : 'w-2 bg-charcoal-700 hover:bg-charcoal-600'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="w-9 h-9 border border-charcoal-700 bg-charcoal-900 text-cream-300 hover:text-white hover:border-terracotta-500 transition-colors flex items-center justify-center cursor-pointer"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="w-9 h-9 border border-charcoal-700 bg-charcoal-900 text-cream-300 hover:text-white hover:border-terracotta-500 transition-colors flex items-center justify-center cursor-pointer"
                aria-label="Next review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Unobtrusive note */}
        <p className="text-center text-[11px] text-cream-400 mt-4 tracking-wider uppercase">
          * Note: Quotes above are fictional sample customer testimonials for portfolio showcase purposes.
        </p>
      </div>
    </section>
  );
};
