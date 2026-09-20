import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu as MenuIcon, X, Phone } from 'lucide-react';
import { siteConfig } from '../../config/site';
import { Button } from './Button';
import { cn } from '../../lib/utils';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Our Story', path: '/story' },
    { name: 'Menu', path: '/menu' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Contact', path: '/contact' },
  ];

  const isReviewsActive = location.hash === '#reviews' || location.pathname === '/reviews';
  const isHomeActive = location.pathname === '/' && !isReviewsActive;

  const handleReviewsClick = (e: React.MouseEvent) => {
    if (location.pathname === '/' || location.pathname === '/reviews') {
      e.preventDefault();
      const elem = document.getElementById('reviews');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', '#reviews');
      }
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          isScrolled
            ? "glass-header border-b border-charcoal-700/80 shadow-2xl py-3 sm:py-3.5"
            : "bg-gradient-to-b from-charcoal-950/90 via-charcoal-950/40 to-transparent py-4 sm:py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex flex-col group focus:outline-none"
            aria-label="Pind Da Dhaba Home"
          >
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-widest text-cream-100 group-hover:text-terracotta-400 transition-colors uppercase">
              {siteConfig.siteName}
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-saffron-400 font-medium -mt-1">
              {siteConfig.tagline}
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive =
                link.name === 'Reviews'
                  ? isReviewsActive
                  : link.name === 'Home'
                  ? isHomeActive
                  : location.pathname === link.path;

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={link.name === 'Reviews' ? handleReviewsClick : undefined}
                  className={cn(
                    "text-xs uppercase tracking-widest transition-colors py-1 relative font-medium group",
                    isActive ? "text-terracotta-400 font-semibold" : "text-cream-300 hover:text-white"
                  )}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="navUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-terracotta-500"
                    />
                  )}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-terracotta-400 transition-all duration-300 group-hover:w-full md:block hidden" />
                </Link>
              );
            })}
          </nav>

          {/* Right Header CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={`tel:${siteConfig.contact.phoneClean}`}
              className="text-xs text-cream-300 hover:text-saffron-400 flex items-center gap-1.5 font-medium transition-colors tracking-wider"
              aria-label="Call restaurant"
            >
              <Phone className="w-3.5 h-3.5 text-saffron-500" />
              <span>{siteConfig.contact.phone}</span>
            </a>

            <Link to="/reserve">
              <Button variant="primary" size="sm">
                Book a Table
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-3 md:hidden">
            <Link to="/reserve">
              <Button variant="primary" size="sm" className="px-3 py-1.5 text-[11px]">
                Book
              </Button>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-cream-200 hover:text-white bg-charcoal-800/80 border border-charcoal-700/60 transition-colors focus:outline-none focus:ring-2 focus:ring-terracotta-500 cursor-pointer"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-charcoal-950/98 backdrop-blur-2xl flex flex-col pt-24 pb-32 px-6 md:hidden overflow-y-auto"
          >
            <div className="flex flex-col space-y-4 text-center my-auto">
              <span className="text-xs uppercase tracking-[0.3em] text-saffron-400 font-semibold">
                — Menu & Navigation —
              </span>

              {navLinks.map((link) => {
                const isActive =
                  link.name === 'Reviews'
                    ? isReviewsActive
                    : link.name === 'Home'
                    ? isHomeActive
                    : location.pathname === link.path;

                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      if (link.name === 'Reviews') {
                        if (location.pathname === '/' || location.pathname === '/reviews') {
                          e.preventDefault();
                          setTimeout(() => {
                            const elem = document.getElementById('reviews');
                            if (elem) {
                              elem.scrollIntoView({ behavior: 'smooth' });
                              window.history.pushState(null, '', '#reviews');
                            }
                          }, 120);
                        }
                      }
                    }}
                    className={cn(
                      "font-serif text-2xl uppercase tracking-widest transition-colors py-2.5 min-h-[44px] flex items-center justify-center",
                      isActive ? "text-terracotta-400 font-bold" : "text-cream-100 hover:text-terracotta-400"
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <div className="pt-6 border-t border-charcoal-800 flex flex-col items-center gap-4">
                <Link to="/reserve" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" size="lg" className="w-full">
                    Book a Table
                  </Button>
                </Link>

                <a
                  href={`tel:${siteConfig.contact.phoneClean}`}
                  className="flex items-center gap-2 text-cream-300 hover:text-white text-sm tracking-wider"
                >
                  <Phone className="w-4 h-4 text-terracotta-400" />
                  <span>{siteConfig.contact.phone}</span>
                </a>

                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs uppercase tracking-widest text-cream-400 hover:text-saffron-400 pt-2"
                >
                  Demo Admin Portal →
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
