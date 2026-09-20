import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Phone } from 'lucide-react';
import { siteConfig } from '../../config/site';
import { Button } from '../common/Button';
import { fadeUp } from '../../animations/variants';

export const ReservationCTA: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-charcoal-950 border-t border-charcoal-800 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative bg-gradient-to-r from-earth-900 via-charcoal-900 to-earth-950 border border-terracotta-500/30 p-8 sm:p-14 md:p-16 text-center shadow-2xl overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-terracotta-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-saffron-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-saffron-400 font-bold">
              Join Our Punjabi Table
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-cream-100 font-bold tracking-tight">
              A Warm Seat & Smoky Clay Tandoor Await
            </h2>

            <p className="text-sm sm:text-base text-cream-300 font-light leading-relaxed">
              Whether celebrating with extended family or craving slow-simmered Dal Makhani after dusk, reserve your table and let us serve you with the soul of Punjab.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link to="/reserve" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full sm:w-auto flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Reserve Table Online</span>
                </Button>
              </Link>

              <a
                href={`tel:${siteConfig.contact.phoneClean}`}
                className="w-full sm:w-auto"
              >
                <Button variant="outline" size="lg" className="w-full sm:w-auto flex items-center gap-2 border-cream-300/40">
                  <Phone className="w-4 h-4 text-saffron-400" />
                  <span>Call For Enquiries</span>
                </Button>
              </a>
            </div>

            <p className="text-[11px] text-cream-400 uppercase tracking-wider pt-2">
              Instant demo booking confirmation • No credit card needed
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
