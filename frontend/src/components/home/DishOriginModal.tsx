import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Utensils, Flame, MapPin, Calendar, ChefHat } from 'lucide-react';
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
  regionSub: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  step4Title: string;
  step4Desc: string;
  heritageStory: string;
  cookingMethod: string;
  ingredients: string[];
}

const DISH_DOCUMENTARIES: Record<string, DishJourneyData> = {
  'sig-1': {
    region: 'AMRITSAR',
    regionSub: 'Heritage Majha Grain Lands',
    step2Title: 'HAND-STUFFED',
    step2Desc: 'Sixteen gossamer layers of leavened flour folded with stone-crushed anardana, coriander seeds, and spiced Yukon potatoes.',
    step3Title: 'THE TANDOOR',
    step3Desc: 'Slapped by hand onto the searing vertical clay walls of a 900°F tandoor, blistering into golden crisp shards.',
    step4Title: 'THE TABLE',
    step4Desc: 'Crushed with bare palms while steaming hot, crowned with a generous slab of freshly churned white farmhouse butter.',
    heritageStory: 'The Amritsari Kulcha is a sacred tradition of the Majha region. Baked directly onto earthen terracotta, the crust blisters into crisp shards while locking in spicy aromatics.',
    cookingMethod: 'Direct Charcoal Clay Baking at 900°F • Zero Tawa Contact',
    ingredients: ['Fine Sharbati Wheat', 'Hand-Crushed Anardana', 'Spiced Earthen Potatoes', 'Desi Churned Butter', 'Carom Seeds (Ajwain)'],
  },
  'sig-2': {
    region: 'OLD GT ROAD',
    regionSub: 'Historic Grand Trunk Highway Dhabas',
    step2Title: 'THE MARINADE',
    step2Desc: 'Bone-in cuts deeply scored and rested for 14 hours in stone-churned hung curd, pungent cold-pressed mustard oil, and Kashmiri deggi mirch.',
    step3Title: 'THE TANDOOR',
    step3Desc: 'Mounted on heavy hand-forged iron seekhs, dripping fat over glowing sheesham charcoal embers in radiant convection.',
    step4Title: 'THE TABLE',
    step4Desc: 'Rushed sizzling to your plate with wafer-thin laccha onions, freshly pounded mint chutney, and quartered lime.',
    heritageStory: 'Born along the Grand Trunk Road that carried travellers across Punjab. The fiery char from hardwood embers caramelizes the spiced skin while preserving supreme juiciness to the bone.',
    cookingMethod: 'Vertical Charcoal Radiant Sealing • 14-Hour Double Cure',
    ingredients: ['Tender Spring Chicken', 'Hung Farm Curd', 'Cold-Pressed Mustard Oil', 'Kashmiri Deggi Mirch', 'Sun-Dried Kasuri Methi'],
  },
  'sig-3': {
    region: 'PUNJABI HEARTHS',
    regionSub: 'Rural Sanjha Chulha Tradition',
    step2Title: 'THE DAWN SOAK',
    step2Desc: 'Whole black urad lentils and red kidney beans washed four times in pure water, steeped from early sunrise.',
    step3Title: 'THE TANDOOR EMBERS',
    step3Desc: 'Slow-simmered continuously for 18 hours over spent clay oven embers with sweet vine tomatoes and clarified butter.',
    step4Title: 'THE TABLE',
    step4Desc: 'Ladle-poured velvety smooth, laced with dairy cream and an unashamed dollop of fresh churned makhan.',
    heritageStory: 'True Dal Makhani is an art of patience. As the nighttime hearth embers cool, the black lentils break down naturally, releasing an unctuous silkiness that no modern pressure cooker can replicate.',
    cookingMethod: '18-Hour Overnight Charcoal Ember Simmer',
    ingredients: ['Whole Black Urad', 'Kashmiri Red Rajma', 'Vine-Ripened Pureed Tomatoes', 'Slow Butter', 'Heirloom Garam Masala'],
  },
  'sig-4': {
    region: 'DELHI & PUNJAB',
    regionSub: 'Post-Partition Culinary Legend',
    step2Title: 'THE CHARRED TIKKA',
    step2Desc: 'Tender chicken charred inside the clay tandoor on iron skewers, then rested to absorb wood smoke.',
    step3Title: 'THE MAKHANI GRAVY',
    step3Desc: 'Folded gently into a simmering reduction of butter-roasted tomatoes, green cardamom, and stone-ground cashew cream.',
    step4Title: 'THE TABLE',
    step4Desc: 'Garnished with needle-thin ginger juliennes, swirled cream, and served alongside blistering hot garlic naan.',
    heritageStory: 'An iconic triumph of Punjabi hospitality. Created to give crispy tandoori chicken a lush, buttery bath of sun-ripened tomatoes and fragrant fenugreek leaves.',
    cookingMethod: 'Charcoal Tikka Roasting followed by Silken Tomato Butter Emulsion',
    ingredients: ['Tandoor-Charred Chicken', 'Sun-Ripened Tomato Reduction', 'Stone-Ground Cashews', 'Desi Ghee', 'Fragrant Kasoori Methi'],
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

  const doc = DISH_DOCUMENTARIES[dish.id] || {
    region: 'PUNJAB',
    regionSub: 'Earthen Farmsteads of the Heartland',
    step2Title: 'HAND-CRAFTED',
    step2Desc: 'Prepared daily using hand-ground spices and time-honoured techniques.',
    step3Title: 'THE TANDOOR',
    step3Desc: 'Charcoal-baked inside our authentic earthen hearth.',
    step4Title: 'THE TABLE',
    step4Desc: 'Plated hot with churned butter and fresh herbs.',
    heritageStory: dish.description,
    cookingMethod: 'Traditional Charcoal Hearth Craft',
    ingredients: ['Heirloom Punjabi Spices', 'Pure Desi Ghee', 'Fresh Farm Produce'],
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-charcoal-950/95 backdrop-blur-2xl transition-all"
            aria-hidden="true"
          />

          {/* Full-Screen Documentary Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 30 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-5xl bg-charcoal-950 border border-charcoal-700/80 shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden rounded-xs my-auto max-h-[94vh] flex flex-col select-none"
            role="dialog"
            aria-modal="true"
            aria-labelledby="dish-documentary-title"
          >
            {/* Top Bar with Editorial Badge & Close */}
            <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-charcoal-950/95 border-b border-charcoal-800 backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(229,169,60,0.8)]" />
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-amber-300 font-bold font-sans">
                  Origin Documentary • Culinary Heritage
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full text-cream-300 hover:text-white bg-charcoal-850 hover:bg-charcoal-750 border border-charcoal-700 transition-colors cursor-pointer"
                aria-label="Close documentary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Documentary Body */}
            <div className="overflow-y-auto p-6 sm:p-10 space-y-10">
              {/* Header Showcase: Hero Food Photo & Title */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 relative aspect-[16/10] rounded-xs overflow-hidden border border-charcoal-700 bg-charcoal-900 shadow-2xl">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.08]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/25 to-transparent" />

                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <DietaryBadge vegetarian={dish.vegetarian} />
                    <SpicyBadge spicy={dish.spicy} />
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-amber-300 font-sans font-semibold bg-charcoal-950/80 px-2.5 py-1 border border-amber-500/30 backdrop-blur-md">
                      Signature Hearth Selection
                    </span>
                    <span className="text-2xl sm:text-3xl font-serif font-bold text-saffron-400 drop-shadow-md">
                      {formatPrice(dish.price)}
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-4">
                  <span className="text-xs uppercase tracking-[0.28em] text-terracotta-400 font-bold font-sans">
                    {dish.category} • Authentic Recipe
                  </span>
                  <h2 id="dish-documentary-title" className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cream-100 font-bold tracking-tight">
                    {dish.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-cream-300 font-light leading-relaxed">
                    {doc.heritageStory}
                  </p>

                  <div className="p-3.5 rounded-xs bg-charcoal-900 border border-charcoal-800 flex items-center gap-3">
                    <ChefHat className="w-5 h-5 text-amber-400 shrink-0" />
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-cream-400 font-semibold block">
                        Master Hearth Method
                      </span>
                      <span className="text-xs text-cream-200 font-medium font-sans">
                        {doc.cookingMethod}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Documentary Progression: Region -> Preparation -> The Hearth -> The Table */}
              <div className="border-t border-charcoal-800 pt-8">
                <div className="flex items-center gap-2 mb-6">
                  <Flame className="w-4 h-4 text-terracotta-400" />
                  <h3 className="text-xs sm:text-sm uppercase tracking-[0.3em] text-cream-300 font-bold font-sans">
                    The Four-Stage Metamorphosis
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Step 1: Origin */}
                  <div className="p-5 bg-charcoal-900/90 border border-charcoal-800 hover:border-amber-500/40 rounded-xs space-y-2.5 transition-colors">
                    <div className="flex items-center gap-2 text-saffron-400 text-xs font-bold uppercase tracking-wider">
                      <MapPin className="w-4 h-4" />
                      <span>{doc.region}</span>
                    </div>
                    <span className="text-[11px] text-amber-300/90 font-medium block">
                      {doc.regionSub}
                    </span>
                    <p className="text-xs text-cream-300 leading-relaxed font-light">
                      Rooted in the agrarian soul and heritage grain traditions of Punjab.
                    </p>
                  </div>

                  {/* Step 2: Handcraft */}
                  <div className="p-5 bg-charcoal-900/90 border border-charcoal-800 hover:border-amber-500/40 rounded-xs space-y-2.5 transition-colors">
                    <div className="flex items-center gap-2 text-terracotta-400 text-xs font-bold uppercase tracking-wider">
                      <Utensils className="w-4 h-4" />
                      <span>{doc.step2Title}</span>
                    </div>
                    <p className="text-xs text-cream-300 leading-relaxed font-light">
                      {doc.step2Desc}
                    </p>
                  </div>

                  {/* Step 3: The Tandoor */}
                  <div className="p-5 bg-charcoal-900/90 border border-charcoal-800 hover:border-amber-500/40 rounded-xs space-y-2.5 transition-colors">
                    <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                      <Flame className="w-4 h-4" />
                      <span>{doc.step3Title}</span>
                    </div>
                    <p className="text-xs text-cream-300 leading-relaxed font-light">
                      {doc.step3Desc}
                    </p>
                  </div>

                  {/* Step 4: The Table */}
                  <div className="p-5 bg-charcoal-900/90 border border-charcoal-800 hover:border-amber-500/40 rounded-xs space-y-2.5 transition-colors">
                    <div className="flex items-center gap-2 text-saffron-300 text-xs font-bold uppercase tracking-wider">
                      <Sparkles className="w-4 h-4" />
                      <span>{doc.step4Title}</span>
                    </div>
                    <p className="text-xs text-cream-300 leading-relaxed font-light">
                      {doc.step4Desc}
                    </p>
                  </div>
                </div>
              </div>

              {/* Key Ingredients Pill Section */}
              <div className="border-t border-charcoal-800 pt-8">
                <h4 className="text-xs uppercase tracking-[0.25em] text-cream-400 font-semibold mb-4">
                  Signature Spices & Farm Ingredients
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {doc.ingredients.map((ing) => (
                    <span
                      key={ing}
                      className="px-3.5 py-1.5 bg-charcoal-900 border border-charcoal-750 text-xs text-cream-200 rounded-full font-sans tracking-wide"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Reservation Call to Action */}
              <div className="pt-6 border-t border-charcoal-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-[11px] uppercase tracking-wider text-cream-400 font-sans">
                  Crafted fresh in daily batches • Prepared to order
                </span>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Button variant="outline" size="sm" onClick={onClose} className="w-full sm:w-auto">
                    Close Documentary
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
