import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ShieldAlert, MessageSquare, Navigation, ExternalLink } from 'lucide-react';
import { siteConfig } from '../config/site';
import { api } from '../lib/api';
import { Button } from '../components/common/Button';

export const ContactPage: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.message.trim()) {
      setError('Please complete all fields before sending your enquiry.');
      return;
    }

    if (form.message.trim().length < 10) {
      setError('Message must be at least 10 characters long.');
      return;
    }

    setLoading(true);
    try {
      await api.submitContact(form);
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err: any) {
      setError(err.message || 'Unable to submit enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal-950 pt-28 pb-32 md:pb-24 text-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-saffron-400 font-bold block mb-2">
            Get In Touch
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-cream-100 font-bold tracking-tight">
            Connect With Our Team
          </h1>
          <p className="text-sm sm:text-base text-cream-400 font-light mt-3 leading-relaxed">
            Planning a private celebration, seeking event catering, or wishing to share feedback on our cuisine? We are always glad to connect.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Details Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-charcoal-900 border border-charcoal-800 p-8 space-y-6">
              <h3 className="font-serif text-2xl text-cream-100 font-semibold mb-2">
                Hearth & Hospitality Details
              </h3>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-terracotta-500/10 border border-terracotta-500/30 text-terracotta-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base text-cream-100 font-semibold">Location (Demo)</h4>
                  <a
                    href={siteConfig.contact.address.mapsUrl || "https://www.google.com/maps/dir/?api=1&destination=Sector+17,+Chandigarh,+India"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                    title="Open in Google Maps"
                  >
                    <p className="text-xs sm:text-sm text-cream-300 group-hover:text-terracotta-400 transition-colors">
                      {siteConfig.contact.address.line1}
                    </p>
                    <p className="text-xs text-cream-400 group-hover:text-terracotta-400 transition-colors flex items-center gap-1.5 mt-0.5">
                      <span>{siteConfig.contact.address.display}</span>
                      <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                    </p>
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-saffron-500/10 border border-saffron-500/30 text-saffron-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base text-cream-100 font-semibold">Dining Hours</h4>
                  <p className="text-xs text-cream-300">{siteConfig.contact.hours.weekday}</p>
                  <p className="text-xs text-cream-300 mt-0.5">{siteConfig.contact.hours.weekend}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base text-cream-100 font-semibold">Telephone & WhatsApp</h4>
                  <a
                    href={`tel:${siteConfig.contact.phoneClean}`}
                    className="text-xs sm:text-sm text-cream-300 hover:text-terracotta-400 transition-colors block font-medium"
                    aria-label="Call restaurant"
                  >
                    {siteConfig.contact.phone}
                  </a>
                  <a
                    href={`https://wa.me/${siteConfig.contact.whatsappClean}?text=Hello%20Pind%20Da%20Dhaba,%20I%20would%20like%20to%20enquire%20about%20a%20table.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-cream-400 hover:text-emerald-400 transition-colors block"
                    aria-label="Chat with restaurant on WhatsApp"
                  >
                    WhatsApp: {siteConfig.contact.whatsapp}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-sky-500/10 border border-sky-500/30 text-sky-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base text-cream-100 font-semibold">Electronic Mail</h4>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-xs sm:text-sm text-cream-300 hover:text-terracotta-400 transition-colors block"
                    aria-label="Send email"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>

              {/* Get Directions Button */}
              <div className="pt-2">
                <a
                  href={siteConfig.contact.address.mapsUrl || "https://www.google.com/maps/dir/?api=1&destination=Sector+17,+Chandigarh,+India"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-terracotta-500 hover:bg-terracotta-600 text-white px-5 py-3 text-xs uppercase tracking-widest font-semibold transition-all duration-200 shadow-md border border-terracotta-400/40"
                >
                  <Navigation className="w-3.5 h-3.5 fill-white" />
                  <span>Get Directions (Google Maps)</span>
                  <ExternalLink className="w-3 h-3 opacity-75" />
                </a>
              </div>
            </div>

            {/* Disclaimer pill */}
            <div className="p-4 bg-charcoal-900 border border-charcoal-800 flex items-start gap-3 text-xs text-cream-400">
              <ShieldAlert className="w-4 h-4 text-saffron-400 shrink-0 mt-0.5" />
              <p>
                <strong className="text-saffron-400">Demo Concept Notice:</strong> Contact details are for demonstration purposes. Sent messages are stored in MongoDB and viewable in the <a href="/admin" className="text-terracotta-400 underline">Admin Console</a>.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-charcoal-900 border border-emerald-500/40 p-10 text-center space-y-6 shadow-2xl"
              >
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-950/60 border-2 border-emerald-500 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-3xl text-cream-100 font-semibold">
                  Enquiry Dispatched!
                </h3>
                <p className="text-sm text-cream-300 max-w-md mx-auto font-light leading-relaxed">
                  Your message has been captured in our demo system. We appreciate your interest in Pind Da Dhaba.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setSuccess(false)}
                    className="text-xs uppercase tracking-widest text-terracotta-400 hover:text-terracotta-300 font-semibold underline cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-charcoal-900 border border-charcoal-800 p-8 sm:p-10 shadow-2xl space-y-6"
              >
                <h3 className="font-serif text-2xl text-cream-100 font-semibold mb-2 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-terracotta-400" />
                  Send an Enquiry
                </h3>

                {error && (
                  <div className="p-4 bg-rose-950/50 border border-rose-500 text-rose-200 text-xs sm:text-sm">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-cream-300 font-medium">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Navjot Sidhu"
                      className="w-full bg-charcoal-850 border border-charcoal-700 text-cream-100 px-4 py-3 text-base focus:outline-none focus:border-terracotta-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-cream-300 font-medium">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 98765 00000"
                      className="w-full bg-charcoal-850 border border-charcoal-700 text-cream-100 px-4 py-3 text-base focus:outline-none focus:border-terracotta-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-xs uppercase tracking-wider text-cream-300 font-medium">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full bg-charcoal-850 border border-charcoal-700 text-cream-100 px-4 py-3 text-base focus:outline-none focus:border-terracotta-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-xs uppercase tracking-wider text-cream-300 font-medium">
                      Your Message / Feedback *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us about your catering query, event inquiry, or thoughts..."
                      className="w-full bg-charcoal-850 border border-charcoal-700 text-cream-100 p-4 text-sm focus:outline-none focus:border-terracotta-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full flex items-center justify-center gap-2"
                    isLoading={loading}
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Enquiry Message (Demo)</span>
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
