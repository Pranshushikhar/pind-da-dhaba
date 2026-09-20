import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, AlertCircle } from 'lucide-react';
import { siteConfig } from '../config/site';
import type { MenuItem } from '../types';
import { api } from '../lib/api';
import { DietaryBadge, SpicyBadge } from '../components/common/Badge';
import { formatPrice } from '../lib/utils';
import { fadeUp } from '../animations/variants';

export const MenuPage: React.FC = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [vegOnly, setVegOnly] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let isMounted = true;
    const fetchMenu = async () => {
      setLoading(true);
      try {
        const data = await api.getMenu({
          category: selectedCategory,
          search: searchQuery,
        });
        if (isMounted) setItems(data);
      } catch (error) {
        console.error('Failed to load menu:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    const timer = setTimeout(fetchMenu, 150);
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [selectedCategory, searchQuery]);

  const displayedItems = vegOnly ? items.filter(i => i.vegetarian) : items;

  return (
    <div className="min-h-screen bg-charcoal-950 pt-28 pb-32 md:pb-24 text-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-saffron-400 font-bold block mb-2">
            Punjab's Grand Table
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-cream-100 font-bold tracking-tight">
            The Dhaba Menu
          </h1>
          <p className="text-sm sm:text-base text-cream-400 font-light mt-4 leading-relaxed">
            Slow-cooked clay handis, fragrant aged basmati, blistered tandoori kulchas, and wholesome village recipes passed through generations.
          </p>
        </div>

        {/* Search & Dietary Filter Controls */}
        <div className="bg-charcoal-900 border border-charcoal-800 p-4 sm:p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes (e.g., Kulcha, Dal)..."
              className="w-full bg-charcoal-850 border border-charcoal-700 text-cream-100 pl-10 pr-4 py-2.5 text-xs sm:text-sm placeholder:text-cream-400 focus:outline-none focus:border-terracotta-500 transition-colors"
            />
          </div>

          {/* Veg Only Toggle */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <button
              onClick={() => setVegOnly(!vegOnly)}
              className={`flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider font-semibold border transition-all cursor-pointer ${
                vegOnly
                  ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                  : 'bg-charcoal-850 border-charcoal-700 text-cream-400 hover:text-white'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${vegOnly ? 'bg-emerald-400' : 'bg-charcoal-500'}`} />
              <span>Pure Vegetarian</span>
            </button>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {siteConfig.menuCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 text-xs uppercase tracking-widest font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer border ${
                selectedCategory === cat
                  ? 'bg-terracotta-500 text-white border-terracotta-500 shadow-lg shadow-terracotta-500/20'
                  : 'bg-charcoal-900 text-cream-300 border-charcoal-800 hover:border-charcoal-600 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-charcoal-900 border border-charcoal-800 animate-pulse h-80" />
            ))}
          </div>
        ) : displayedItems.length === 0 ? (
          <div className="bg-charcoal-900 border border-charcoal-800 p-12 text-center max-w-lg mx-auto my-12 space-y-4">
            <AlertCircle className="w-10 h-10 text-terracotta-400 mx-auto" />
            <h3 className="font-serif text-2xl text-cream-100 font-semibold">
              No dishes found. Try another craving.
            </h3>
            <p className="text-xs text-cream-400">
              Try adjusting your search keywords or switching category filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setVegOnly(false);
              }}
              className="mt-2 text-xs uppercase tracking-widest text-saffron-400 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {displayedItems.map((item) => (
                <motion.div
                  layout
                  key={item.id || item._id}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={`bg-charcoal-900 border border-charcoal-800 flex flex-col justify-between overflow-hidden group hover:border-charcoal-600 transition-colors ${
                    !item.available ? 'opacity-60' : ''
                  }`}
                >
                  {/* Image container */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-charcoal-850">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-transparent to-transparent" />

                    {/* Indicators */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <DietaryBadge vegetarian={item.vegetarian} />
                      <SpicyBadge spicy={item.spicy} />
                    </div>

                    {!item.available && (
                      <div className="absolute inset-0 bg-charcoal-950/75 backdrop-blur-[2px] flex items-center justify-center">
                        <span className="px-3 py-1 bg-charcoal-900 border border-terracotta-500 text-terracotta-400 text-xs uppercase tracking-widest font-bold">
                          Sold Out Today
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="font-serif text-xl text-cream-100 font-semibold group-hover:text-terracotta-400 transition-colors">
                          {item.name}
                        </h3>
                        <span className="font-serif text-lg font-bold text-saffron-400 shrink-0">
                          {formatPrice(item.price)}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-cream-400 leading-relaxed font-light mb-4">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-charcoal-800 flex items-center justify-between text-xs text-cream-400">
                      <span className="uppercase tracking-widest text-[10px] text-cream-400">
                        {item.category}
                      </span>
                      {item.available ? (
                        <span className="text-emerald-400/90 text-[11px] uppercase tracking-wider font-medium">
                          Available Fresh
                        </span>
                      ) : (
                        <span className="text-cream-500 text-[11px] uppercase tracking-wider font-medium">
                          Unavailable
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};
