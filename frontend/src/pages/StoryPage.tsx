import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';

export const StoryPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-charcoal-950 pt-28 pb-32 md:pb-24 text-cream-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Story Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-saffron-400 font-bold block">
            Our Culinary Genesis
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-cream-100 font-bold tracking-tight">
            Born From The Warmth Of The Pind
          </h1>
          <p className="text-sm sm:text-base text-cream-300 font-light leading-relaxed">
            A fictional tribute to the Grand Trunk Road — where centuries of traveler folklore and slow-charcoal cooking converge into a celebration of Punjab's authentic soul.
          </p>
        </div>

        {/* Feature Image Banner */}
        <div className="relative aspect-[21/9] w-full overflow-hidden border border-charcoal-800 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85"
            alt="Warm Punjabi dhaba ambience"
            className="w-full h-full object-cover filter brightness-[0.6] contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 max-w-md">
            <span className="text-[11px] uppercase tracking-[0.2em] text-terracotta-400 font-semibold block mb-1">
              Sector 17, Chandigarh (Concept Showcase)
            </span>
            <p className="font-serif text-xl sm:text-2xl text-cream-100 italic">
              "When you break bread here, you aren't a customer — you are family arriving home from a long journey."
            </p>
          </div>
        </div>

        {/* Editorial Story Chapters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-widest text-saffron-400 font-bold block">
              Chapter I — The Roadside Legacy
            </span>
            <h2 className="font-serif text-3xl text-cream-100 font-semibold leading-tight">
              The Grand Trunk Road & The Spirit of Dhaba Culture
            </h2>
            <p className="text-sm text-cream-300 leading-relaxed font-light">
              Across Punjab's golden mustard fields, the roadside dhaba has served as a sanctuary for generations of truck drivers, wanderers, and weekend families. Fired with seasoned sheesham logs, huge iron kadhais simmer through the chill of winter nights, creating hearty meals meant to nourish both body and soul.
            </p>
            <p className="text-sm text-cream-400 leading-relaxed font-light">
              Pind Da Dhaba preserves these foundational values — the generous dollops of freshly churned white butter (makhan), the smoky fragrance of earthen tandoors, and the unpretentious warmth of true northern hospitality.
            </p>
          </div>

          <div className="aspect-[4/3] bg-charcoal-900 border border-charcoal-800 overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=900&q=80"
              alt="Smoky charcoal cooking"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Chapter II */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
          <div className="order-2 md:order-1 aspect-[4/3] bg-charcoal-900 border border-charcoal-800 overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=80"
              alt="Authentic Dal Makhani simmering"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="order-1 md:order-2 space-y-6">
            <span className="text-xs uppercase tracking-widest text-terracotta-400 font-bold block">
              Chapter II — The 18-Hour Ritual
            </span>
            <h2 className="font-serif text-3xl text-cream-100 font-semibold leading-tight">
              Patience, Coal Embers & Heirloom Spices
            </h2>
            <p className="text-sm text-cream-300 leading-relaxed font-light">
              We believe shortcuts have no place in a Punjabi kitchen. Our legendary Dal Makhani begins its journey before sunrise, slow-simmering over dying charcoal embers for 18 continuous hours. Each spice blend is measured by instinct and memory rather than digital timers.
            </p>
            <p className="text-sm text-cream-400 leading-relaxed font-light">
              From our crisp, hand-stretched Amritsari Kulchas to our tender tandoori chicken, every dish is an ode to patience, warmth, and the generous spirit of the pind.
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-charcoal-900 border border-charcoal-800 p-8 sm:p-12 text-center space-y-6">
          <h3 className="font-serif text-2xl sm:text-3xl text-cream-100 font-semibold">
            Experience Our Hospitality Firsthand
          </h3>
          <p className="text-xs sm:text-sm text-cream-400 max-w-xl mx-auto font-light">
            We invite you to sit at our table, break crisp breads fresh from the flame, and create lasting memories with those who matter most.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link to="/reserve">
              <Button variant="primary" size="md">
                Book a Table Now
              </Button>
            </Link>
            <Link to="/menu">
              <Button variant="outline" size="md">
                Explore The Menu
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
