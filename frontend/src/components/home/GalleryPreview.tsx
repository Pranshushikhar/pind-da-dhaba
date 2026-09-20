import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '../../config/site';
import { fadeUp } from '../../animations/variants';

export const GalleryPreview: React.FC = () => {
  // Show 6 preview items from the gallery collection
  const previewItems = siteConfig.galleryItems.slice(0, 6);

  return (
    <section className="py-24 sm:py-32 bg-charcoal-950 border-t border-charcoal-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-terracotta-400 font-bold block mb-2">
              Visual Chronicles
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-cream-100 font-semibold tracking-tight">
              Life Around The Dhaba
            </h2>
          </div>

          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-saffron-400 hover:text-saffron-300 font-semibold transition-colors group"
          >
            <span>Explore Full Gallery</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Dynamic Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewItems.map((item, idx) => (
            <motion.div
              key={item.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              custom={idx}
              className="group relative aspect-[4/3] overflow-hidden bg-charcoal-900 border border-charcoal-800 cursor-pointer"
            >
              <Link to="/gallery">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-[10px] uppercase tracking-widest text-saffron-400 font-medium">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-xl text-cream-100 font-semibold mt-1">
                    {item.title}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
