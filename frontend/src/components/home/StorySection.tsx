import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Utensils, Flame, Sparkles, Users } from 'lucide-react';
import { Button } from '../common/Button';
import { fadeUp, fadeLeft, fadeRight } from '../../animations/variants';

export const StorySection: React.FC = () => {
  const highlights = [
    {
      icon: Utensils,
      title: "Traditional Recipes",
      desc: "Heirloom family masalas stone-ground daily, preserving generations of rustic North Indian wisdom.",
    },
    {
      icon: Sparkles,
      title: "Fresh Ingredients",
      desc: "Farm-fresh dairy, desi makhan, and cold-pressed mustard oil sourced to recreate authentic village flavors.",
    },
    {
      icon: Flame,
      title: "Clay-Tandoor Cooking",
      desc: "Charcoal-fired bell-shaped clay ovens imparting unmatched smokiness and tender texture.",
    },
    {
      icon: Users,
      title: "Made To Share",
      desc: "Generous thalis and copper handis created specifically for community gatherings and shared feasts.",
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-charcoal-900 border-t border-charcoal-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Visual Composition */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden border border-charcoal-700 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=85"
                alt="Clay tandoor and rustic dining heritage"
                className="w-full h-full object-cover filter contrast-105 brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent" />
            </div>

            {/* Overlapping secondary vignette */}
            <div className="hidden sm:block absolute -bottom-8 -right-8 w-48 h-48 border-2 border-terracotta-500/40 p-2 bg-charcoal-950 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=400&q=80"
                alt="Smoky tandoor cooking"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Right Narrative & Feature Pillars */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <span className="text-xs uppercase tracking-[0.25em] text-saffron-400 font-bold block mb-2">
                Our Heritage
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-cream-100 font-semibold tracking-tight leading-tight">
                Born from the warmth of the pind.
              </h2>
              <p className="text-sm sm:text-base text-cream-300 font-light mt-4 leading-relaxed">
                In Punjab, the dhaba has always been more than an eatery — it is the soul of the Grand Trunk Road, where travelers, farmers, and dreamers rest their weary feet and break piping-hot breads. Pind Da Dhaba elevates this rustic magic into a contemporary luxury space without sacrificing the smoky sincerity of clay pots and woodfire.
              </p>
            </motion.div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {highlights.map((item, idx) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  custom={idx}
                  className="flex items-start gap-4 p-4 bg-charcoal-850/70 border border-charcoal-800"
                >
                  <div className="p-2.5 bg-terracotta-500/10 border border-terracotta-500/30 text-terracotta-400 shrink-0">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base text-cream-100 font-semibold mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-cream-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-4">
              <Link to="/story">
                <Button variant="outline" size="md">
                  Read The Complete Story →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
