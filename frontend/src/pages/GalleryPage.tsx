import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { siteConfig } from '../config/site';

export const GalleryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = ['all', 'food', 'tandoor', 'interior', 'dining', 'chai', 'naan', 'thali', 'ambience'];

  const filteredItems = selectedCategory === 'all'
    ? siteConfig.galleryItems
    : siteConfig.galleryItems.filter(item => item.category === selectedCategory);

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setActiveLightboxIndex(null);
    document.body.style.overflow = 'unset';
  }, []);

  const nextImage = useCallback(() => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % filteredItems.length);
    }
  }, [activeLightboxIndex, filteredItems.length]);

  const prevImage = useCallback(() => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  }, [activeLightboxIndex, filteredItems.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, closeLightbox, nextImage, prevImage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-charcoal-950 pt-28 pb-32 md:pb-24 text-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-saffron-400 font-bold block mb-2">
            Atmospheric Visuals
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-cream-100 font-bold tracking-tight">
            The Gallery
          </h1>
          <p className="text-sm sm:text-base text-cream-400 font-light mt-4 leading-relaxed">
            Charred earthen pots, shimmering evening lanterns, and the unforgettable vibrancy of Punjabi dining culture.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer border ${
                selectedCategory === cat
                  ? 'bg-terracotta-500 text-white border-terracotta-500'
                  : 'bg-charcoal-900 text-cream-300 border-charcoal-800 hover:border-charcoal-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry / Responsive Column Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onClick={() => openLightbox(idx)}
              className="break-inside-avoid group relative overflow-hidden bg-charcoal-900 border border-charcoal-800 cursor-pointer shadow-lg hover:border-terracotta-500/50 transition-colors"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Overlay with details */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-saffron-400 font-medium">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-xl text-cream-100 font-semibold mt-1">
                      {item.title}
                    </h3>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-charcoal-850 flex items-center justify-center text-white border border-charcoal-700">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-950/95 backdrop-blur-xl p-4">
            {/* Close button */}
            <button
              onClick={closeLightbox}
              aria-label="Close Lightbox"
              className="absolute top-6 right-6 p-2 text-cream-300 hover:text-white bg-charcoal-800/80 border border-charcoal-700 rounded-full z-50 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Image */}
            <button
              onClick={prevImage}
              aria-label="Previous image"
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 text-cream-300 hover:text-white bg-charcoal-800/80 border border-charcoal-700 rounded-full z-50 cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Image */}
            <button
              onClick={nextImage}
              aria-label="Next image"
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 text-cream-300 hover:text-white bg-charcoal-800/80 border border-charcoal-700 rounded-full z-50 cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image Container */}
            <motion.div
              key={activeLightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center"
            >
              <img
                src={filteredItems[activeLightboxIndex].image}
                alt={filteredItems[activeLightboxIndex].title}
                className="max-w-full max-h-[75vh] object-contain border border-charcoal-800 shadow-2xl"
              />
              <div className="mt-4 text-center">
                <span className="text-xs uppercase tracking-widest text-saffron-400 font-semibold">
                  {filteredItems[activeLightboxIndex].category}
                </span>
                <h3 className="font-serif text-2xl text-cream-100 font-bold mt-0.5">
                  {filteredItems[activeLightboxIndex].title}
                </h3>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
