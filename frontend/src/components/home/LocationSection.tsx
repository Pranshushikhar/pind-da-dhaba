import React from 'react';
import { MapPin, Clock, Phone, Navigation, ExternalLink } from 'lucide-react';
import { siteConfig } from '../../config/site';

export const LocationSection: React.FC = () => {
  const mapsUrl = siteConfig.contact.address.mapsUrl || "https://www.google.com/maps/dir/?api=1&destination=Sector+17,+Chandigarh,+India";

  return (
    <section className="py-24 sm:py-32 bg-charcoal-900 border-t border-charcoal-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-terracotta-400 font-bold block mb-2">
            The Destination
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-cream-100 font-semibold tracking-tight">
            Visit Our Hearth in Chandigarh
          </h2>
          <p className="text-sm sm:text-base text-cream-400 font-light mt-3">
            Located in the heart of Sector 17, offering generous courtyard seating and an open clay-tandoor station.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Details Card */}
          <div className="lg:col-span-5 bg-charcoal-850 border border-charcoal-700/80 p-8 sm:p-10 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              {/* Clickable Address on Mobile and Desktop */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-terracotta-500/10 border border-terracotta-500/30 text-terracotta-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-cream-100 font-semibold mb-1">
                    Address (Demo Location)
                  </h3>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                    title="Open demo location in Google Maps"
                  >
                    <p className="text-sm text-cream-300 group-hover:text-terracotta-400 transition-colors">
                      {siteConfig.contact.address.line1}
                    </p>
                    <p className="text-sm text-cream-400 group-hover:text-terracotta-400 transition-colors flex items-center gap-1.5 mt-0.5">
                      <span>{siteConfig.contact.address.display}</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                    </p>
                  </a>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-saffron-500/10 border border-saffron-500/30 text-saffron-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-cream-100 font-semibold mb-1">
                    Operating Hours
                  </h3>
                  <p className="text-xs text-cream-300">
                    {siteConfig.contact.hours.weekday}
                  </p>
                  <p className="text-xs text-cream-300 mt-1">
                    {siteConfig.contact.hours.weekend}
                  </p>
                </div>
              </div>

              {/* Phone & Inquiries */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-cream-100 font-semibold mb-1">
                    Reservations & Inquiries
                  </h3>
                  <a
                    href={`tel:${siteConfig.contact.phoneClean}`}
                    className="text-sm text-cream-300 hover:text-terracotta-400 transition-colors block font-medium"
                    aria-label="Call restaurant"
                  >
                    {siteConfig.contact.phone}
                  </a>
                  <a
                    href={`https://wa.me/${siteConfig.contact.whatsappClean}?text=Hello%20Pind%20Da%20Dhaba,%20I%20would%20like%20to%20enquire%20about%20a%20table.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-cream-400 hover:text-emerald-400 transition-colors block mt-0.5"
                    aria-label="Chat with restaurant on WhatsApp"
                  >
                    WhatsApp: {siteConfig.contact.whatsapp}
                  </a>
                </div>
              </div>

              {/* Prominent GET DIRECTIONS Button */}
              <div className="pt-2">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 bg-terracotta-500 hover:bg-terracotta-600 active:bg-terracotta-700 text-white px-6 py-3.5 text-xs uppercase tracking-widest font-semibold transition-all duration-200 shadow-lg shadow-terracotta-500/25 border border-terracotta-400/40 cursor-pointer"
                >
                  <Navigation className="w-4 h-4 fill-white" />
                  <span>Get Directions (Google Maps)</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-75" />
                </a>
              </div>
            </div>

            {/* Note badge */}
            <div className="p-3.5 bg-charcoal-900 border border-charcoal-700 text-xs text-cream-400">
              <span className="text-saffron-400 font-semibold">Demo Notice:</span> Pind Da Dhaba is a fictional demo concept. The location directs to Sector 17, Chandigarh as an illustrative showcase.
            </div>
          </div>

          {/* Right: Bespoke Styled Demo Map Graphic with Get Directions Action */}
          <div className="lg:col-span-7 bg-charcoal-850 border border-charcoal-700/80 relative min-h-[380px] overflow-hidden flex flex-col items-center justify-center p-8 text-center">
            <div className="absolute inset-0 bg-noise opacity-40 pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#22201e_1px,transparent_1px),linear-gradient(to_bottom,#22201e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />

            <div className="relative z-10 max-w-md space-y-5">
              <div className="w-16 h-16 mx-auto rounded-full bg-terracotta-500/15 border-2 border-terracotta-500 flex items-center justify-center text-terracotta-400 shadow-xl shadow-terracotta-500/20">
                <Navigation className="w-7 h-7" />
              </div>

              <div>
                <h3 className="font-serif text-2xl text-cream-100 font-bold tracking-wide">
                  Sector 17, Chandigarh
                </h3>
                <p className="text-xs uppercase tracking-wider text-saffron-400 font-medium mt-1">
                  Demo Concept Location — Punjab, India
                </p>
              </div>

              <p className="text-xs sm:text-sm text-cream-300 font-light leading-relaxed">
                Situated in the iconic plaza district of Chandigarh, nestled amidst leafy promenades and warm evening lanterns.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-saffron-500 hover:bg-saffron-400 text-charcoal-950 px-5 py-2.5 text-xs uppercase tracking-wider font-semibold transition-colors shadow-md cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5 fill-charcoal-950" />
                  <span>Open Directions</span>
                </a>

                <div className="inline-block px-3.5 py-2 border border-charcoal-700 bg-charcoal-900/90 text-[11px] text-cream-400 uppercase tracking-wider font-medium">
                  Stylized Demo Map
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
