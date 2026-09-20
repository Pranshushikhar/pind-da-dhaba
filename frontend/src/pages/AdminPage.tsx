import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Utensils,
  Calendar,
  MessageSquare,
  Plus,
  Trash2,
  Edit2,
  Database,
  RefreshCw,
  Key,
} from 'lucide-react';
import type { MenuItem, Reservation, ContactMessage, AdminStats } from '../types';
import { api } from '../lib/api';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { DietaryBadge, SpicyBadge, StatusBadge } from '../components/common/Badge';
import { formatPrice } from '../lib/utils';

export const AdminPage: React.FC = () => {
  const defaultKey = import.meta.env.VITE_ADMIN_DEMO_KEY || 'dhaba_demo_admin_2026';
  const [adminKey, setAdminKey] = useState<string>(
    localStorage.getItem('pdd_admin_token') || defaultKey
  );
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [keyInput, setKeyInput] = useState('');
  const [activeTab, setActiveTab] = useState<'reservations' | 'menu' | 'enquiries'>('reservations');

  const handleSaveKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyInput.trim()) {
      localStorage.setItem('pdd_admin_token', keyInput.trim());
      setAdminKey(keyInput.trim());
      setIsKeyModalOpen(false);
      setKeyInput('');
    }
  };

  // Dashboard Data
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Modals state
  const [isDishModalOpen, setIsDishModalOpen] = useState<boolean>(false);
  const [editingDish, setEditingDish] = useState<MenuItem | null>(null);
  const [dishForm, setDishForm] = useState({
    name: '',
    description: '',
    price: 299,
    category: 'Veg' as MenuItem['category'],
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    vegetarian: true,
    spicy: false,
    available: true,
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [statsData, resData, menuData, msgData] = await Promise.all([
        api.getAdminStats(adminKey),
        api.getReservations(adminKey),
        api.getMenu(),
        api.getContactMessages(adminKey),
      ]);
      setStats(statsData);
      setReservations(resData);
      setMenuItems(menuData);
      setMessages(msgData);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [adminKey]);

  // Reservation Status Toggle
  const handleUpdateReservation = async (id: string, status: 'confirmed' | 'cancelled') => {
    try {
      await api.updateReservationStatus(id, status, adminKey);
      loadData();
    } catch (err: any) {
      alert(err.message || 'Failed to update reservation');
    }
  };

  // Toggle Menu Availability
  const handleToggleMenuAvailability = async (item: MenuItem) => {
    const id = item.id || item._id;
    if (!id) return;
    try {
      await api.updateMenuItem(id, { available: !item.available }, adminKey);
      loadData();
    } catch (err: any) {
      alert(err.message || 'Failed to toggle availability');
    }
  };

  // Delete Menu Item
  const handleDeleteMenuItem = async (id?: string) => {
    if (!id) return;
    if (!confirm('Are you sure you want to delete this menu item?')) return;
    try {
      await api.deleteMenuItem(id, adminKey);
      loadData();
    } catch (err: any) {
      alert(err.message || 'Failed to delete dish');
    }
  };

  // Save Dish (Create or Update)
  const handleSaveDish = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingDish) {
        const id = editingDish.id || editingDish._id;
        if (id) await api.updateMenuItem(id, dishForm, adminKey);
      } else {
        await api.createMenuItem(dishForm, adminKey);
      }
      setIsDishModalOpen(false);
      setEditingDish(null);
      loadData();
    } catch (err: any) {
      alert(err.message || 'Failed to save dish');
    }
  };

  const openAddDishModal = () => {
    setEditingDish(null);
    setDishForm({
      name: '',
      description: '',
      price: 299,
      category: 'Veg',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
      vegetarian: true,
      spicy: false,
      available: true,
    });
    setIsDishModalOpen(true);
  };

  const openEditDishModal = (item: MenuItem) => {
    setEditingDish(item);
    setDishForm({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      image: item.image,
      vegetarian: item.vegetarian,
      spicy: item.spicy,
      available: item.available,
    });
    setIsDishModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-charcoal-950 pt-28 pb-32 md:pb-24 text-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header & Demo Banner */}
        <div className="bg-charcoal-900 border border-charcoal-800 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] uppercase tracking-[0.25em] text-saffron-400 font-bold">
                Portfolio Demonstration Dashboard
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-cream-100 font-bold">
              Restaurant Manager Console
            </h1>
            <p className="text-xs sm:text-sm text-cream-400 mt-1">
              Manage menu availability, accept table bookings, and review inquiries in real-time.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsKeyModalOpen(true)}
              className="p-2.5 bg-charcoal-800 border border-charcoal-700 text-cream-200 hover:text-white transition-colors cursor-pointer flex items-center gap-2 text-xs uppercase tracking-wider"
              title="Configure Admin Key"
            >
              <Key className="w-4 h-4 text-saffron-400" />
              <span className="hidden sm:inline">Admin Key</span>
            </button>

            <button
              onClick={loadData}
              className="p-2.5 bg-charcoal-800 border border-charcoal-700 text-cream-200 hover:text-white transition-colors cursor-pointer flex items-center gap-2 text-xs uppercase tracking-wider"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <div className="flex items-center gap-2 px-3 py-2 bg-charcoal-800/80 border border-charcoal-700 text-xs text-cream-300">
              <Database className="w-4 h-4 text-terracotta-400" />
              <span>{stats?.dbConnected ? 'MongoDB Live' : 'Demo State Store'}</span>
            </div>
          </div>
        </div>

        {/* 5 Stats Cards Grid per PRD Section 28 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="p-5 bg-charcoal-900 border border-charcoal-800 space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-cream-400">Total Dishes</span>
            <p className="font-serif text-3xl font-bold text-cream-100">{stats?.totalMenuItems ?? 12}</p>
          </div>
          <div className="p-5 bg-charcoal-900 border border-charcoal-800 space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-emerald-400">Available Fresh</span>
            <p className="font-serif text-3xl font-bold text-emerald-400">{stats?.availableMenuItems ?? 12}</p>
          </div>
          <div className="p-5 bg-charcoal-900 border border-charcoal-800 space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-cream-400">Total Bookings</span>
            <p className="font-serif text-3xl font-bold text-cream-100">{stats?.totalReservations ?? 3}</p>
          </div>
          <div className="p-5 bg-charcoal-900 border border-charcoal-800 space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-amber-400">Pending Requests</span>
            <p className="font-serif text-3xl font-bold text-amber-400">{stats?.pendingReservations ?? 1}</p>
          </div>
          <div className="p-5 bg-charcoal-900 border border-charcoal-800 space-y-1 col-span-2 sm:col-span-1">
            <span className="text-[11px] uppercase tracking-wider text-sky-400">Total Enquiries</span>
            <p className="font-serif text-3xl font-bold text-sky-400">{stats?.totalEnquiries ?? 2}</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-charcoal-800 gap-6">
          <button
            onClick={() => setActiveTab('reservations')}
            className={`pb-3 text-xs uppercase tracking-widest font-semibold transition-colors flex items-center gap-2 cursor-pointer relative ${
              activeTab === 'reservations'
                ? 'text-terracotta-400'
                : 'text-cream-400 hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Table Reservations ({reservations.length})</span>
            {activeTab === 'reservations' && (
              <motion.div layoutId="adminTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-terracotta-500" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('menu')}
            className={`pb-3 text-xs uppercase tracking-widest font-semibold transition-colors flex items-center gap-2 cursor-pointer relative ${
              activeTab === 'menu'
                ? 'text-terracotta-400'
                : 'text-cream-400 hover:text-white'
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>Menu Management ({menuItems.length})</span>
            {activeTab === 'menu' && (
              <motion.div layoutId="adminTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-terracotta-500" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('enquiries')}
            className={`pb-3 text-xs uppercase tracking-widest font-semibold transition-colors flex items-center gap-2 cursor-pointer relative ${
              activeTab === 'enquiries'
                ? 'text-terracotta-400'
                : 'text-cream-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Customer Enquiries ({messages.length})</span>
            {activeTab === 'enquiries' && (
              <motion.div layoutId="adminTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-terracotta-500" />
            )}
          </button>
        </div>

        {/* Tab 1: Reservations Table */}
        {activeTab === 'reservations' && (
          <div className="bg-charcoal-900 border border-charcoal-800 overflow-hidden shadow-2xl">
            <div className="p-4 sm:p-6 border-b border-charcoal-800 flex items-center justify-between">
              <h3 className="font-serif text-xl text-cream-100 font-semibold">
                Incoming Table Requests
              </h3>
              <span className="text-xs text-cream-400">
                Click Confirm or Cancel to manage status
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm text-cream-300">
                <thead className="bg-charcoal-850 text-cream-400 uppercase text-[10px] tracking-wider border-b border-charcoal-800">
                  <tr>
                    <th className="py-3 px-4">Guest</th>
                    <th className="py-3 px-4">Date & Time</th>
                    <th className="py-3 px-4">Party Size</th>
                    <th className="py-3 px-4">Special Notes</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-charcoal-800">
                  {reservations.map((res) => {
                    const id = res.id || res._id;
                    return (
                      <tr key={id} className="hover:bg-charcoal-850/50 transition-colors">
                        <td className="py-4 px-4 font-medium text-cream-100">
                          <div>{res.name}</div>
                          <div className="text-xs text-cream-400">{res.phone}</div>
                          <div className="text-xs text-cream-400">{res.email}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-cream-200 font-medium">{res.date}</div>
                          <div className="text-xs text-cream-400">{res.time}</div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-serif text-base font-bold text-saffron-400">
                            {res.guests}
                          </span>{' '}
                          guests
                        </td>
                        <td className="py-4 px-4 max-w-xs text-xs text-cream-300 italic">
                          {res.specialRequest || 'None'}
                        </td>
                        <td className="py-4 px-4">
                          <StatusBadge status={res.status} />
                        </td>
                        <td className="py-4 px-4 text-right space-x-2 whitespace-nowrap">
                          {res.status !== 'confirmed' && (
                            <button
                              onClick={() => id && handleUpdateReservation(id, 'confirmed')}
                              className="px-2.5 py-1 bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 text-xs font-semibold hover:bg-emerald-900 transition-colors cursor-pointer"
                              title="Confirm Reservation"
                            >
                              Confirm
                            </button>
                          )}
                          {res.status !== 'cancelled' && (
                            <button
                              onClick={() => id && handleUpdateReservation(id, 'cancelled')}
                              className="px-2.5 py-1 bg-rose-950/80 border border-rose-500/60 text-rose-300 text-xs font-semibold hover:bg-rose-900 transition-colors cursor-pointer"
                              title="Cancel Reservation"
                            >
                              Cancel
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Menu Management */}
        {activeTab === 'menu' && (
          <div className="bg-charcoal-900 border border-charcoal-800 overflow-hidden shadow-2xl">
            <div className="p-4 sm:p-6 border-b border-charcoal-800 flex items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-xl text-cream-100 font-semibold">
                  Live Dhaba Menu
                </h3>
                <p className="text-xs text-cream-400">
                  Toggle daily availability or add fresh culinary offerings
                </p>
              </div>

              <Button variant="primary" size="sm" onClick={openAddDishModal} className="flex items-center gap-1.5">
                <Plus className="w-4 h-4" />
                <span>Add Dish</span>
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm text-cream-300">
                <thead className="bg-charcoal-850 text-cream-400 uppercase text-[10px] tracking-wider border-b border-charcoal-800">
                  <tr>
                    <th className="py-3 px-4">Dish Details</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Dietary</th>
                    <th className="py-3 px-4">Availability</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-charcoal-800">
                  {menuItems.map((dish) => {
                    const id = dish.id || dish._id;
                    return (
                      <tr key={id} className="hover:bg-charcoal-850/50 transition-colors">
                        <td className="py-4 px-4 flex items-center gap-3">
                          <img
                            src={dish.image}
                            alt={dish.name}
                            className="w-12 h-12 object-cover border border-charcoal-700 shrink-0"
                          />
                          <div>
                            <div className="font-medium text-cream-100">{dish.name}</div>
                            <div className="text-xs text-cream-400 max-w-xs truncate">{dish.description}</div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="px-2 py-0.5 bg-charcoal-800 border border-charcoal-700 text-xs">
                            {dish.category}
                          </span>
                        </td>
                        <td className="py-4 px-4 font-serif font-bold text-saffron-400">
                          {formatPrice(dish.price)}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <DietaryBadge vegetarian={dish.vegetarian} />
                            <SpicyBadge spicy={dish.spicy} />
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <button
                            onClick={() => handleToggleMenuAvailability(dish)}
                            className={`px-2.5 py-1 text-xs font-semibold uppercase tracking-wider border cursor-pointer transition-colors ${
                              dish.available
                                ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-300'
                                : 'bg-charcoal-800 border-charcoal-700 text-cream-400'
                            }`}
                          >
                            {dish.available ? 'In Stock' : 'Sold Out'}
                          </button>
                        </td>
                        <td className="py-4 px-4 text-right space-x-2">
                          <button
                            onClick={() => openEditDishModal(dish)}
                            className="p-1.5 bg-charcoal-800 hover:bg-charcoal-700 text-cream-300 hover:text-white transition-colors cursor-pointer"
                            title="Edit Dish"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteMenuItem(id)}
                            className="p-1.5 bg-charcoal-800 hover:bg-rose-900 text-rose-300 transition-colors cursor-pointer"
                            title="Delete Dish"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Enquiries Table */}
        {activeTab === 'enquiries' && (
          <div className="bg-charcoal-900 border border-charcoal-800 overflow-hidden shadow-2xl">
            <div className="p-4 sm:p-6 border-b border-charcoal-800">
              <h3 className="font-serif text-xl text-cream-100 font-semibold">
                Guest Messages & Enquiries
              </h3>
            </div>

            <div className="divide-y divide-charcoal-800">
              {messages.length === 0 ? (
                <div className="p-8 text-center text-cream-400">No enquiries received yet.</div>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id || msg._id} className="p-6 hover:bg-charcoal-850/40 transition-colors space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-cream-100">{msg.name}</span>
                        <span className="text-xs text-cream-400">• {msg.email}</span>
                        <span className="text-xs text-cream-400">• {msg.phone}</span>
                      </div>
                      <StatusBadge status={msg.status} />
                    </div>
                    <p className="text-sm text-cream-300 font-light bg-charcoal-850 p-4 border border-charcoal-750">
                      "{msg.message}"
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Add/Edit Dish Modal */}
        <Modal
          isOpen={isDishModalOpen}
          onClose={() => setIsDishModalOpen(false)}
          title={editingDish ? 'Edit Dish' : 'Add New Dish to Menu'}
          maxWidth="max-w-2xl"
        >
          <form onSubmit={handleSaveDish} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-cream-300">Dish Name *</label>
                <input
                  type="text"
                  required
                  value={dishForm.name}
                  onChange={(e) => setDishForm({ ...dishForm, name: e.target.value })}
                  placeholder="e.g. Malai Kofta"
                  className="w-full bg-charcoal-850 border border-charcoal-700 text-cream-100 px-3 py-2 text-sm focus:outline-none focus:border-terracotta-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-cream-300">Price (₹) *</label>
                <input
                  type="number"
                  required
                  min={0}
                  value={dishForm.price}
                  onChange={(e) => setDishForm({ ...dishForm, price: Number(e.target.value) })}
                  className="w-full bg-charcoal-850 border border-charcoal-700 text-cream-100 px-3 py-2 text-sm focus:outline-none focus:border-terracotta-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-cream-300">Category *</label>
                <select
                  value={dishForm.category}
                  onChange={(e) => setDishForm({ ...dishForm, category: e.target.value as any })}
                  className="w-full bg-charcoal-850 border border-charcoal-700 text-cream-100 px-3 py-2 text-sm focus:outline-none focus:border-terracotta-500"
                >
                  <option value="Veg">Veg</option>
                  <option value="Non-Veg">Non-Veg</option>
                  <option value="Tandoor">Tandoor</option>
                  <option value="Breads">Breads</option>
                  <option value="Rice">Rice</option>
                  <option value="Desserts">Desserts</option>
                  <option value="Drinks">Drinks</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-cream-300">Image URL *</label>
                <input
                  type="url"
                  required
                  value={dishForm.image}
                  onChange={(e) => setDishForm({ ...dishForm, image: e.target.value })}
                  className="w-full bg-charcoal-850 border border-charcoal-700 text-cream-100 px-3 py-2 text-sm focus:outline-none focus:border-terracotta-500"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs uppercase tracking-wider text-cream-300">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={dishForm.description}
                  onChange={(e) => setDishForm({ ...dishForm, description: e.target.value })}
                  placeholder="Ingredients, slow-cooking notes, aromatics..."
                  className="w-full bg-charcoal-850 border border-charcoal-700 text-cream-100 p-3 text-sm focus:outline-none focus:border-terracotta-500"
                />
              </div>

              <div className="sm:col-span-2 flex flex-wrap gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs uppercase tracking-wider">
                  <input
                    type="checkbox"
                    checked={dishForm.vegetarian}
                    onChange={(e) => setDishForm({ ...dishForm, vegetarian: e.target.checked })}
                    className="accent-terracotta-500"
                  />
                  <span>Vegetarian</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs uppercase tracking-wider">
                  <input
                    type="checkbox"
                    checked={dishForm.spicy}
                    onChange={(e) => setDishForm({ ...dishForm, spicy: e.target.checked })}
                    className="accent-terracotta-500"
                  />
                  <span>Spicy Dish</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs uppercase tracking-wider">
                  <input
                    type="checkbox"
                    checked={dishForm.available}
                    onChange={(e) => setDishForm({ ...dishForm, available: e.target.checked })}
                    className="accent-terracotta-500"
                  />
                  <span>Available Currently</span>
                </label>
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-charcoal-800">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsDishModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                {editingDish ? 'Save Changes' : 'Add Dish'}
              </Button>
            </div>
          </form>
        </Modal>

        {/* Admin Secret Key Configuration Modal */}
        <Modal
          isOpen={isKeyModalOpen}
          onClose={() => setIsKeyModalOpen(false)}
          title="Admin Secret Key"
        >
          <form onSubmit={handleSaveKey} className="space-y-4">
            <p className="text-xs text-cream-300 leading-relaxed">
              Enter your backend <code className="text-saffron-400 font-mono">ADMIN_SECRET_KEY</code> to authenticate administrative requests. Stored locally in your browser session only.
            </p>

            <div>
              <label className="block text-xs uppercase tracking-wider text-cream-300 font-medium mb-1">
                Admin Secret Key
              </label>
              <input
                type="password"
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                placeholder="Enter secret key..."
                required
                className="w-full bg-charcoal-800 border border-charcoal-700 text-cream-100 px-4 py-2.5 text-sm focus:outline-none focus:border-terracotta-500 font-mono"
              />
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-charcoal-800">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsKeyModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Save & Authenticate
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};
