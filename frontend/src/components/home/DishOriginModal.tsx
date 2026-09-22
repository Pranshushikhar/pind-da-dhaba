import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Utensils, Flame, MapPin, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { MenuItemType } from '../../config/site';
import { formatPrice } from '../../lib/utils';
import { DietaryBadge, SpicyBadge } from '../common/Badge';
import { Button } from '../common/Button';

interface DishOriginModalProps {
  dish: MenuItemType | null;
  isOpen: boolean;
  onClose: () => void;
}

interface DishJourneyData {
  region: string;
  preparation: string;
  hearthMethod: string;
  tableServing: string;
  heritageStory: string;
  ingredients: string[];
}

const DISH_STORIES: Record<string, DishJourneyData> = {
  'sig-1': {
    region: 'Walled City of Amritsar',
    preparation: 'Stone-crushed anardana (pomegranate) and potato folded into 16 gossamer layers of leavened dough.',
    hearthMethod: 'Slapped by hand onto the vertical clay walls of a 900°F tandoor until crisp and blistered.',
    tableServing: 'Crushed while boiling hot to release steam, crowned with melting churned white desi makhan.',
    heritageStory: 'The Amritsari Kulcha is a sacred tradition of the Majha region. Baked directly onto earthen terracotta, the crust blisters into crisp shards while locking in spicy aromatics.',
    ingredients: ['Fine Wheat Flour', 'Anardana Seeds', 'Spiced Potatoes', 'Churned White Butter', 'Ajwain'],
  },
  'sig-2': {
    region: 'Old GT Road Dhabas',
    preparation: 'Bone-in chicken scored deep and rested for 14 hours in hung curd, ginger garlic paste, and mustard oil.',
    hearthMethod: 'Lowered into the deep charcoal belly on heavy iron seekhs, dripping fat over glowing coals.',
    tableServing: 'Rushed sizzling to the table with sliced laccha onions, fresh mint chutney, and a squeeze of lime.',
    heritageStory: 'Born from Punjab’s roadside dhaba culture along the Grand Trunk road. The smoky char from wood embers caramelizes the spiced crust while keeping the bone-in meat tender and juicy.',
    ingredients: ['Bone-In Spring Chicken', 'Hung Curd', 'Kashmiri Deggi Mirch', 'Cold-Pressed Mustard Oil', 'Kasuri Methi'],
  },
  'sig-3': {
    region: 'Heritage Punjabi Hearths',
    preparation: 'Whole black urad lentils and red kidney beans washed four times and slow-soaked over dawn.',
    hearthMethod: 'Simmered continuously for 18 hours over spent tandoor embers with pureed vine tomatoes.',
    tableServing: 'Ladle-poured velvety smooth, laced with fresh dairy cream and a dollop of churned farmhouse butter.',
    heritageStory: 'True Dal Makhani is born from patient overnight simmering. As the embers die down, the lentils break down naturally, yielding an unctuous silkiness that cannot be rushed by high pressure.',
    ingredients: ['Whole Black Urad Lentils', 'Kashmiri Rajma', 'Vine-Ripened Tomatoes', 'Slow Butter', 'Dried Fenugreek'],
  },
  'sig-4': {
    region: 'Post-Partition Culinary Innovation',
    preparation: 'Tandoori chicken tikka charred in the oven, then diced and rested to absorb aromatic smoke.',
    hearthMethod: 'Folded gently into a velvety, reduced makhani gravy enriched with stone-ground cashew cream.',
    tableServing: 'Garnished with fine ginger juliennes, swirled dairy cream, and served with smoking garlic naan.',
    heritageStory: 'An iconic triumph of Punjabi hospitality. Created to give crispy tandoori chicken a lush, buttery bath of sun-ripened tomatoes and fragrant fenugreek leaves.',
    ingredients: ['Charred Chicken Tikka', 'Roasted Tomato Puree', 'Cashew Paste', 'Desi Ghee', 'Kasoori Methi'],
  },
};

export const DishOriginModal: React.FC<DishOriginModalProps> = ({ dish, isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!dish) return null;

  const journey = DISH_STORIES[dish.id] || {
    region: 'Heart of Punjab',
    preparation: 'Handcrafted daily using heirloom Punjabi spice blends and traditional stone pestles.',
    hearthMethod: 'Charcoal-fired inside our authentic clay tandoor at searing heat.',
    tableServing: 'Garnished with aromatic herbs and rushed fresh to your family table.',
    heritageStory: dish.description,
    ingredients: ['Heirloom Punjabi Spices', 'Pure Desi Ghee', 'Fresh Local Ingredients'],
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-charcoal-950/92 backdrop-blur-xl transition-all"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-4xl bg-charcoal-900 border border-charcoal-700 shadow-2xl overflow-hidden rounded-xs my-8 max-h-[92vh] flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-labelledby="dish-origin-title"
          >
            {/* Top Bar with Close */}
            <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-charcoal-900/95 border-b border-charcoal-800 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-saffron-400" />
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-saffron-400 font-bold font-sans">
                  Dish Origin Journey • Culinary Lore
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-full text-cream-300 hover:text-white bg-charcoal-800/80 hover:bg-charcoal-700 border border-charcoal-700 transition-colors cursor-pointer"
                aria-label="Close dish story modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
              {/* Header Grid: Image + Title/Price */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-6 relative aspect-[4/3] rounded-xs overflow-hidden border border-charcoal-750 bg-charcoal-850">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-105"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <DietaryBadge vegetarian={dish.vegetarian} />
                    <SpicyBadge spicy={dish.spicy} />
                  </div>
                </div>

                <div className="md:col-span-6 space-y-3">
                  <span className="text-xs uppercase tracking-[0.2em] text-terracotta-400 font-semibold font-sans">
                    {dish.category} • Signature Selection
                  </span>
                  <h2 id="dish-origin-title" className="font-serif text-3xl sm:text-4xl text-cream-100 font-bold tracking-tight">
                    {dish.name}
                  </h2>
                  <div className="text-2xl font-serif font-bold text-saffron-400">
                    {formatPrice(dish.price)}
                  </div>
                  <p className="text-xs sm:text-sm text-cream-300 font-light leading-relaxed pt-1">
                    {journey.heritageStory}
                  </p>
                </div>
              </div>

              {/* 4-Step Origin Progression Journey */}
              <div className="border-t border-charcoal-800 pt-6">
                <h4 className="text-xs uppercase tracking-[0.25em] text-cream-400 font-semibold mb-6">
                  The Four Rituals of Preparation
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Step 1 */}
                  <div className="p-4 bg-charcoal-850/70 border border-charcoal-750 rounded-xs space-y-2">
                    <div className="flex items-center gap-2 text-saffron-400 text-xs font-semibold uppercase tracking-wider">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>1. Origin</span>
                    </div>
                    <p className="text-xs font-semibold text-cream-100">{journey.region}</p>
                  </div>

                  {/* Step 2 */}
                  <div className="p-4 bg-charcoal-850/70 border border-charcoal-750 rounded-xs space-y-2">
                    <div className="flex items-center gap-2 text-terracotta-400 text-xs font-semibold uppercase tracking-wider">
                      <Utensils className="w-3.5 h-3.5" />
                      <span>2. Handcraft</span>
                    </div>
                    <p className="text-xs text-cream-300 leading-relaxed font-light">{journey.preparation}</p>
                  </div>

                  {/* Step 3 */}
                  <div className="p-4 bg-charcoal-850/70 border border-charcoal-750 rounded-xs space-y-2">
                    <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                      <Flame className="w-3.5 h-3.5" />
                      <span>3. The Hearth</span>
                    </div>
                    <p className="text-xs text-cream-300 leading-relaxed font-light">{journey.hearthMethod}</p>
                  </div>

                  {/* Step 4 */}
                  <div className="p-4 bg-charcoal-850/70 border border-charcoal-750 rounded-xs space-y-2">
                    <div className="flex items-center gap-2 text-saffron-300 text-xs font-semibold uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>4. Table Feast</span>
                    </div>
                    <p className="text-xs text-cream-300 leading-relaxed font-light">{journey.tableServing}</p>
                  </div>
                </div>
              </div>

              {/* Key Ingredients Pill List */}
              <div className="border-t border-charcoal-800 pt-6">
                <h4 className="text-xs uppercase tracking-[0.25em] text-cream-400 font-semibold mb-3">
                  Key Aromatics & Ingredients
                </h4>
                <div className="flex flex-wrap gap-2">
                  {journey.ingredients.map((ing) => (
                    <span
                      key={ing}
                      className="px-3 py-1 bg-charcoal-800 border border-charcoal-700 text-xs text-cream-200 rounded-full font-sans"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Reservation Call to Action */}
              <div className="pt-4 border-t border-charcoal-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-[11px] uppercase tracking-wider text-cream-400">
                  Demo Concept Showcase • Fresh daily batch
                </span>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Button variant="outline" size="sm" onClick={onClose} className="w-full sm:w-auto">
                    Close Story
                  </Button>
                  <Link to="/reserve" className="w-full sm:w-auto" onClick={onClose}>
                    <Button variant="primary" size="sm" className="w-full sm:w-auto flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Table to Taste</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
