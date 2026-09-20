import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, ArrowUp, ShieldAlert, Heart } from 'lucide-react';
import { siteConfig } from '../../config/site';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-charcoal-900 border-t border-charcoal-700/80 pt-16 pb-24 md:pb-12 text-cream-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-charcoal-800">
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-serif text-3xl font-bold tracking-widest text-cream-100 uppercase">
                {siteConfig.siteName}
              </span>
              <p className="text-xs uppercase tracking-[0.2em] text-saffron-400 font-medium mt-0.5">
                {siteConfig.tagline}
              </p>
            </Link>
            <p className="text-sm text-cream-400 leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="pt-2">
              <Link
                to="/reserve"
                className="inline-flex items-center text-xs uppercase tracking-widest text-terracotta-400 hover:text-terracotta-300 font-semibold border-b border-terracotta-500 pb-0.5"
              >
                Reserve Your Table →
              </Link>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-cream-100 font-semibold tracking-wider uppercase">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-terracotta-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/story" className="hover:text-terracotta-400 transition-colors">Our Culinary Story</Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-terracotta-400 transition-colors">The Dhaba Menu</Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-terracotta-400 transition-colors">Visual Gallery</Link>
              </li>
              <li>
                <Link to="/reviews" className="hover:text-terracotta-400 transition-colors">Guest Reviews</Link>
              </li>
              <li>
                <Link to="/reserve" className="hover:text-terracotta-400 transition-colors">Book a Table</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-terracotta-400 transition-colors">Contact & Location</Link>
              </li>
              <li>
                <Link to="/admin" className="text-saffron-400 hover:text-saffron-300 transition-colors font-medium">Demo Admin Portal</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Operating Hours */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-cream-100 font-semibold tracking-wider uppercase flex items-center gap-2">
              <Clock className="w-4 h-4 text-terracotta-400" />
              Hours of Hospitality
            </h4>
            <div className="space-y-3 text-sm text-cream-400">
              <div>
                <p className="text-cream-200 font-medium">Monday – Thursday</p>
                <p className="text-xs text-cream-400 mt-0.5">11:00 AM – 11:00 PM</p>
              </div>
              <div>
                <p className="text-cream-200 font-medium">Friday – Sunday</p>
                <p className="text-xs text-cream-400 mt-0.5">11:00 AM – 12:00 AM (Midnight)</p>
              </div>
              <p className="text-xs text-terracotta-400/90 pt-1">
                * Clay tandoors remain active throughout operating hours.
              </p>
            </div>
          </div>

          {/* Col 4: Location & Contact */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-cream-100 font-semibold tracking-wider uppercase flex items-center gap-2">
              <MapPin className="w-4 h-4 text-terracotta-400" />
              Find Our Table
            </h4>
            <div className="space-y-2.5 text-sm text-cream-400">
              <p className="flex items-start gap-2">
                <span className="text-cream-200">{siteConfig.contact.address.display}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-saffron-500 shrink-0" />
                <a href={`tel:${siteConfig.contact.phoneClean}`} className="hover:text-white transition-colors">
                  {siteConfig.contact.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-saffron-500 shrink-0" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors">
                  {siteConfig.contact.email}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer Bar (PRD Section 12) */}
        <div className="my-8 p-4 bg-charcoal-950/60 border border-charcoal-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-saffron-400">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span className="font-semibold uppercase tracking-wider">{siteConfig.demoDisclaimer}</span>
          </div>
          <p className="text-cream-400 text-xs sm:text-right">
            Pind Da Dhaba is a fictional restaurant created for web engineering demonstration and portfolio showcase. Not a real operating commercial eatery.
          </p>
        </div>

        {/* Bottom copyright and scroll to top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream-400">
          <p className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} Pind Da Dhaba. Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-terracotta-500 fill-terracotta-500" />
            <span>and Punjab soul.</span>
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-cream-300 hover:text-white transition-colors cursor-pointer group"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};
