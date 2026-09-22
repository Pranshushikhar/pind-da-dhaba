import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Flame, Thermometer } from 'lucide-react';
import { cn } from '../../lib/utils';
import { fadeUp } from '../../animations/variants';

interface HeatStage {
  id: string;
  step: string;
  title: string;
  temperature: string;
  tagline: string;
  description: string;
  image: string;
  heatLevel: number; // 1 to 4
  glowColor: string;
}

const HEAT_STAGES: HeatStage[] = [
  {
    id: 'stage-1',
    step: 'STAGE 01',
    title: 'Raw Earth & River Clay',
    temperature: 'Ambient • 75°F',
    tagline: 'Hand-sculpted traditional clay vessel',
    description: 'Our tandoor begins with dense silt from Punjab’s riverbeds, bound with straw and dried in natural sunshine to create a porous, heat-retaining ceramic heart.',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1000&q=80',
    heatLevel: 1,
    glowColor: 'rgba(200, 90, 50, 0.12)',
  },
  {
    id: 'stage-2',
    step: 'STAGE 02',
    title: 'Sheesham Wood Ignition',
    temperature: 'Pre-Heat • 380°F',
    tagline: 'Fragrant hardwood & charcoal embers',
    description: 'Dried Sheesham logs ignite beneath seasoned charcoal lumps, releasing a gentle, perfumed smoke that impregnates the interior clay walls.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80',
    heatLevel: 2,
    glowColor: 'rgba(229, 169, 60, 0.22)',
  },
  {
    id: 'stage-3',
    step: 'STAGE 03',
    title: 'The 900°F Clay Inferno',
    temperature: 'Peak Heat • 900°F',
    tagline: 'Searing radiant convection',
    description: 'At peak heat, the clay radiates fierce 360-degree infrared heat. Hand-stretched breads adhere to vertical walls while skewered meats seal instantaneously.',
    image: '/dishes/tandoori_chicken.jpg',
    heatLevel: 3,
    glowColor: 'rgba(224, 114, 76, 0.35)',
  },
  {
    id: 'stage-4',
    step: 'STAGE 04',
    title: 'The Charred Offering',
    temperature: 'Plating • Golden Crust',
    tagline: 'Blistered edges, churned ghee, smoky soul',
    description: 'Caramelized crust meets succulent tenderness. Pulled with long iron seekhs, brushed with melted white butter, and rushed straight to your table.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=80',
    heatLevel: 4,
    glowColor: 'rgba(243, 192, 104, 0.4)',
  },
];

export const TandoorHeatSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeStage, setActiveStage] = useState<number>(2); // Default to peak heat

  const current = HEAT_STAGES[activeStage];

  return (
    <section className="relative py-24 sm:py-32 bg-charcoal-950 overflow-hidden border-t border-charcoal-800 select-none">
      {/* Dynamic Background Heat Bloom responding to selected stage */}
      <motion.div
        animate={{
          backgroundColor: current.glowColor,
          opacity: [0.6, 0.85, 0.6],
        }}
        transition={{
          duration: shouldReduceMotion ? 0 : 3.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-[140px] pointer-events-none transition-colors duration-1000"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-terracotta-500/30 bg-charcoal-900/80 mb-4"
          >
            <Flame className="w-3.5 h-3.5 text-terracotta-400 animate-pulse" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-bold text-terracotta-400 font-sans">
              Tandoor Heat Mode
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-serif text-3xl sm:text-4xl md:text-6xl text-cream-100 font-bold uppercase tracking-tight"
          >
            From Fire, <span className="text-transparent bg-clip-text bg-gradient-to-r from-terracotta-400 via-amber-300 to-saffron-400">Flavour.</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-sm sm:text-base text-cream-300 font-light mt-4 max-w-xl mx-auto leading-relaxed"
          >
            Experience the culinary metamorphosis of clay, wood charcoal, and raw spice inside our 900°F artisanal hearth.
          </motion.p>
        </div>

        {/* Heat Stage Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {HEAT_STAGES.map((stage, idx) => {
            const isActive = idx === activeStage;
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setActiveStage(idx)}
                className={cn(
                  "relative px-4 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer flex items-center gap-2",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400",
                  isActive
                    ? "bg-gradient-to-r from-terracotta-600 via-terracotta-500 to-amber-600 text-cream-50 shadow-[0_4px_18px_rgba(200,90,50,0.35)] border border-amber-400/40"
                    : "bg-charcoal-900/80 hover:bg-charcoal-850 text-cream-400 hover:text-cream-200 border border-charcoal-750"
                )}
                aria-pressed={isActive}
              >
                <span className={cn("w-1.5 h-1.5 rounded-full", isActive ? "bg-amber-300 animate-ping" : "bg-charcoal-600")} />
                <span>{stage.step}: {stage.title}</span>
              </button>
            );
          })}
        </div>

        {/* Central Display: Image + Stage Storyboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-charcoal-900/80 border border-charcoal-750 p-6 sm:p-10 lg:p-12 shadow-2xl backdrop-blur-md">
          {/* Left: Atmospheric Food & Hearth Imagery */}
          <div className="lg:col-span-7 relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-xs border border-charcoal-700/80 group">
            <motion.img
              key={current.id}
              initial={{ scale: 1.08, opacity: 0.2 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              src={current.image}
              alt={current.title}
              className="w-full h-full object-cover object-center filter brightness-[0.95] contrast-105"
            />
            {/* Subtle Heat Bloom Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/30 to-transparent" />

            {/* Live Temperature Plaque */}
            <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-charcoal-950/85 border border-amber-500/40 backdrop-blur-md shadow-lg">
              <Thermometer className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[11px] font-mono uppercase tracking-wider text-amber-300 font-semibold">
                {current.temperature}
              </span>
            </div>
          </div>

          {/* Right: Narrative Story & Progression */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-[0.25em] text-saffron-400 font-bold font-sans">
                  {current.step}
                </span>
                <span className="text-charcoal-600">•</span>
                <span className="text-xs uppercase tracking-wider text-cream-400 font-sans">
                  Flame Metamorphosis
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-cream-100 font-bold tracking-tight">
                {current.title}
              </h3>

              <p className="text-xs sm:text-sm font-serif italic text-terracotta-400">
                "{current.tagline}"
              </p>

              <p className="text-xs sm:text-sm text-cream-300 font-light leading-relaxed pt-2">
                {current.description}
              </p>
            </div>

            {/* Heat Level Progress Bar */}
            <div className="pt-4 border-t border-charcoal-800 space-y-2">
              <div className="flex justify-between text-[11px] uppercase tracking-wider text-cream-400 font-sans">
                <span>Thermal Intensity</span>
                <span className="text-amber-400 font-semibold">{current.heatLevel * 25}% Energy</span>
              </div>
              <div className="h-1.5 w-full bg-charcoal-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-terracotta-500 via-amber-500 to-saffron-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${current.heatLevel * 25}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
