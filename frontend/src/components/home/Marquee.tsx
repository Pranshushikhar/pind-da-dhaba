import React from 'react';
import { Sparkles } from 'lucide-react';
import { siteConfig } from '../../config/site';

export const Marquee: React.FC = () => {
  const phrases = siteConfig.marqueePhrases;

  return (
    <div
      aria-label="Restaurant Highlights Ticker"
      className="py-5 bg-charcoal-900 border-y border-charcoal-800 overflow-hidden relative select-none"
    >
      <div className="flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused]">
        {/* Render sequence twice for continuous infinite scroll */}
        {[...phrases, ...phrases].map((text, idx) => (
          <div key={`${text}-${idx}`} className="flex items-center mx-8">
            <span className="font-serif text-lg sm:text-xl md:text-2xl text-cream-200 uppercase tracking-[0.2em] font-semibold">
              {text}
            </span>
            <Sparkles className="w-4 h-4 text-terracotta-500 fill-terracotta-500 ml-8 shrink-0 opacity-80" />
          </div>
        ))}
      </div>
    </div>
  );
};
