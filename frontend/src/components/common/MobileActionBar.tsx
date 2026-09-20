import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Navigation, Calendar } from 'lucide-react';
import { siteConfig } from '../../config/site';

export const MobileActionBar: React.FC = () => {
  const mapsUrl = siteConfig.contact.address.mapsUrl || "https://www.google.com/maps/dir/?api=1&destination=Sector+17,+Chandigarh,+India";

  return (
    <nav
      aria-label="Quick Mobile Actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-charcoal-900/95 backdrop-blur-lg border-t border-charcoal-700/80 shadow-[0_-8px_20px_rgba(0,0,0,0.5)] pb-safe"
    >
      <div className="grid grid-cols-3 divide-x divide-charcoal-800 text-center">
        {/* 1. CALL */}
        <a
          href={`tel:${siteConfig.contact.phoneClean}`}
          className="flex flex-col items-center justify-center py-3 px-2 text-cream-200 hover:text-white hover:bg-charcoal-800/50 transition-colors active:bg-charcoal-800"
          aria-label="Call restaurant"
        >
          <Phone className="w-5 h-5 text-saffron-400 mb-1" />
          <span className="text-[11px] font-medium tracking-wider uppercase">Call</span>
        </a>

        {/* 2. GET DIRECTIONS / MAP */}
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-3 px-2 text-cream-200 hover:text-white hover:bg-charcoal-800/50 transition-colors active:bg-charcoal-800"
          aria-label="Get Directions in Google Maps"
        >
          <Navigation className="w-5 h-5 text-terracotta-400 mb-1" />
          <span className="text-[11px] font-medium tracking-wider uppercase">Directions</span>
        </a>

        {/* 3. BOOK A TABLE */}
        <Link
          to="/reserve"
          className="flex flex-col items-center justify-center py-3 px-2 bg-terracotta-500 text-white font-semibold hover:bg-terracotta-600 transition-colors active:bg-terracotta-700 shadow-inner"
          aria-label="Book a table"
        >
          <Calendar className="w-5 h-5 text-white mb-1" />
          <span className="text-[11px] tracking-wider uppercase font-bold">Book Table</span>
        </Link>
      </div>
    </nav>
  );
};
