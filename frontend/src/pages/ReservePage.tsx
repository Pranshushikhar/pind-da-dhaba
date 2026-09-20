import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Clock, CheckCircle2, ShieldAlert, Phone, Mail, User } from 'lucide-react';
import { api } from '../lib/api';
import { Button } from '../components/common/Button';

export const ReservePage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '19:30',
    guests: 2,
    specialRequest: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Set default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split('T')[0];
    setFormData(prev => ({ ...prev, date: dateStr }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      setErrorMessage('Please enter a valid phone number');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please enter a valid email address');
      return;
    }
    if (!formData.date) {
      setErrorMessage('Please select a reservation date');
      return;
    }

    setIsSubmitting(true);
    try {
      await api.createReservation({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        date: formData.date,
        time: formData.time,
        guests: Number(formData.guests),
        specialRequest: formData.specialRequest,
      });
      setIsSuccess(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to submit reservation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal-950 pt-28 pb-32 md:pb-24 text-cream-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-saffron-400 font-bold block mb-2">
            Table Hospitality
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-cream-100 font-bold tracking-tight">
            Reserve Your Table
          </h1>
          <p className="text-sm sm:text-base text-cream-400 font-light mt-3 leading-relaxed">
            Reserve an intimate corner or a large courtyard table for family gatherings. Hot breads, smoky clay tandoors, and Punjabi hospitality await.
          </p>
        </div>

        {/* Demo Notification Notice */}
        <div className="mb-8 p-4 bg-charcoal-900 border border-saffron-500/30 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-saffron-400 shrink-0 mt-0.5" />
          <div className="text-xs text-cream-300">
            <span className="font-bold text-saffron-400 uppercase tracking-wide">Fictional Demo Notice:</span> This reservation system is a portfolio demonstration showcasing real database storage and state handling. Submissions will be saved to the database and can be reviewed in the{' '}
            <a href="/admin" className="text-terracotta-400 underline hover:text-terracotta-300">
              Demo Admin Console
            </a>.
          </div>
        </div>

        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-charcoal-900 border border-emerald-500/40 p-8 sm:p-12 text-center space-y-6 shadow-2xl"
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-950/60 border-2 border-emerald-500 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-cream-100 font-semibold">
              Table Request Received!
            </h2>

            <p className="text-sm sm:text-base text-cream-300 max-w-lg mx-auto font-light leading-relaxed">
              Thank you, <strong className="text-white font-medium">{formData.name}</strong>. Your reservation for{' '}
              <strong className="text-saffron-400 font-medium">{formData.guests} guests</strong> on{' '}
              <strong className="text-cream-100 font-medium">{formData.date}</strong> at{' '}
              <strong className="text-cream-100 font-medium">{formData.time}</strong> has been logged in our demo system.
            </p>

            <div className="p-4 bg-charcoal-850 border border-charcoal-750 max-w-md mx-auto text-xs text-cream-400 space-y-1">
              <p>Status: <span className="text-amber-400 font-semibold uppercase">Pending Demo Confirmation</span></p>
              <p>Email Confirmation: {formData.email}</p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => {
                  setIsSuccess(false);
                  setFormData(prev => ({ ...prev, name: '', phone: '', email: '', specialRequest: '' }));
                }}
                className="text-xs uppercase tracking-widest text-terracotta-400 hover:text-terracotta-300 font-semibold underline cursor-pointer"
              >
                Book Another Table
              </button>
              <a href="/admin">
                <Button variant="secondary" size="md">
                  View in Admin Portal →
                </Button>
              </a>
            </div>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-charcoal-900 border border-charcoal-800 p-8 sm:p-10 shadow-2xl space-y-6"
          >
            {errorMessage && (
              <div className="p-4 bg-rose-950/50 border border-rose-500 text-rose-200 text-xs sm:text-sm">
                {errorMessage}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-cream-300 font-medium flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-terracotta-400" />
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Jasleen Kaur"
                  className="w-full bg-charcoal-850 border border-charcoal-700 text-cream-100 px-4 py-3 text-base focus:outline-none focus:border-terracotta-500 transition-colors"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-cream-300 font-medium flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-terracotta-400" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 00000"
                  className="w-full bg-charcoal-850 border border-charcoal-700 text-cream-100 px-4 py-3 text-base focus:outline-none focus:border-terracotta-500 transition-colors"
                />
              </div>

              {/* Email */}
              <div className="space-y-2 sm:col-span-2">
                <label className="text-xs uppercase tracking-wider text-cream-300 font-medium flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-terracotta-400" />
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full bg-charcoal-850 border border-charcoal-700 text-cream-100 px-4 py-3 text-base focus:outline-none focus:border-terracotta-500 transition-colors"
                />
              </div>

              {/* Date */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-cream-300 font-medium flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-saffron-400" />
                  Reservation Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full bg-charcoal-850 border border-charcoal-700 text-cream-100 px-4 py-3 text-base focus:outline-none focus:border-terracotta-500 transition-colors"
                />
              </div>

              {/* Time */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-cream-300 font-medium flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-saffron-400" />
                  Seating Time *
                </label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full bg-charcoal-850 border border-charcoal-700 text-cream-100 px-4 py-3 text-base focus:outline-none focus:border-terracotta-500 transition-colors"
                >
                  <option value="12:00">12:00 PM (Lunch)</option>
                  <option value="13:00">01:00 PM (Lunch)</option>
                  <option value="14:00">02:00 PM (Lunch)</option>
                  <option value="19:00">07:00 PM (Dinner)</option>
                  <option value="19:30">07:30 PM (Dinner)</option>
                  <option value="20:00">08:00 PM (Dinner)</option>
                  <option value="20:30">08:30 PM (Dinner)</option>
                  <option value="21:00">09:00 PM (Dinner)</option>
                  <option value="21:30">09:30 PM (Dinner)</option>
                  <option value="22:00">10:00 PM (Late Dining)</option>
                </select>
              </div>

              {/* Guests Count */}
              <div className="space-y-2 sm:col-span-2">
                <label className="text-xs uppercase tracking-wider text-cream-300 font-medium flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-terracotta-400" />
                  Number of Guests (1–20) *
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="1"
                    max="16"
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                    className="w-full accent-terracotta-500 cursor-pointer"
                  />
                  <span className="font-serif text-2xl font-bold text-saffron-400 w-12 text-center shrink-0">
                    {formData.guests}
                  </span>
                </div>
              </div>

              {/* Special Requests */}
              <div className="space-y-2 sm:col-span-2">
                <label className="text-xs uppercase tracking-wider text-cream-300 font-medium">
                  Special Requests / Table Preferences (Optional)
                </label>
                <textarea
                  rows={3}
                  value={formData.specialRequest}
                  onChange={(e) => setFormData({ ...formData, specialRequest: e.target.value })}
                  placeholder="e.g. Courtyard charpai table, anniversary celebration, mild spices for children..."
                  className="w-full bg-charcoal-850 border border-charcoal-700 text-cream-100 p-4 text-sm focus:outline-none focus:border-terracotta-500 transition-colors"
                />
              </div>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={isSubmitting}
              >
                Confirm Table Reservation (Demo)
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
