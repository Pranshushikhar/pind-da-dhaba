import type { MenuItem, Reservation, ContactMessage, AdminStats, ApiResponse } from '../types';
import { siteConfig } from '../config/site';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Local storage fallback keys for offline demo mode
const LOCAL_STORAGE_KEY_MENU = 'pdd_demo_menu';
const LOCAL_STORAGE_KEY_RESERVATIONS = 'pdd_demo_reservations';
const LOCAL_STORAGE_KEY_MESSAGES = 'pdd_demo_messages';

// Initialize local storage fallbacks if empty
const getLocalFallbackMenu = (): MenuItem[] => {
  const cached = localStorage.getItem(LOCAL_STORAGE_KEY_MENU);
  if (cached) {
    try { return JSON.parse(cached); } catch { /* ignore */ }
  }
  localStorage.setItem(LOCAL_STORAGE_KEY_MENU, JSON.stringify(siteConfig.initialMenuItems));
  return siteConfig.initialMenuItems;
};

const getLocalFallbackReservations = (): Reservation[] => {
  const cached = localStorage.getItem(LOCAL_STORAGE_KEY_RESERVATIONS);
  if (cached) {
    try { return JSON.parse(cached); } catch { /* ignore */ }
  }
  const defaultRes: Reservation[] = [
    {
      id: 'res-demo-1',
      name: 'Rajeshwar Verma',
      phone: '+91 98111 22334',
      email: 'rajeshwar.verma@example.com',
      date: '2026-09-24',
      time: '20:00',
      guests: 4,
      specialRequest: 'Courtyard charpai table preferred for family anniversary',
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'res-demo-2',
      name: 'Ananya Sharma',
      phone: '+91 98222 33445',
      email: 'ananya.sharma@example.com',
      date: '2026-09-25',
      time: '19:30',
      guests: 2,
      specialRequest: 'Mild spices for Dal Makhani, window seating',
      status: 'pending',
      createdAt: new Date().toISOString(),
    }
  ];
  localStorage.setItem(LOCAL_STORAGE_KEY_RESERVATIONS, JSON.stringify(defaultRes));
  return defaultRes;
};

const getLocalFallbackMessages = (): ContactMessage[] => {
  const cached = localStorage.getItem(LOCAL_STORAGE_KEY_MESSAGES);
  if (cached) {
    try { return JSON.parse(cached); } catch { /* ignore */ }
  }
  const defaultMsgs: ContactMessage[] = [
    {
      id: 'msg-demo-1',
      name: 'Pooja Batra',
      email: 'pooja.batra@example.com',
      phone: '+91 98444 55667',
      message: 'Do you host private culinary events and corporate catering for 40 guests in Sector 17?',
      status: 'unread',
      createdAt: new Date().toISOString(),
    }
  ];
  localStorage.setItem(LOCAL_STORAGE_KEY_MESSAGES, JSON.stringify(defaultMsgs));
  return defaultMsgs;
};

async function fetchWithTimeout(url: string, options: RequestInit = {}, timeout = 6000): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

export const api = {
  // Menu APIs
  async getMenu(params?: { category?: string; search?: string; available?: boolean }): Promise<MenuItem[]> {
    const searchParams = new URLSearchParams();
    if (params?.category && params.category !== 'All') searchParams.append('category', params.category);
    if (params?.search) searchParams.append('search', params.search);
    if (params?.available !== undefined) searchParams.append('available', String(params.available));

    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/menu?${searchParams.toString()}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json: ApiResponse<MenuItem[]> = await res.json();
      return json.data || [];
    } catch {
      // Graceful offline fallback
      let items = getLocalFallbackMenu();
      if (params?.category && params.category !== 'All') {
        items = items.filter(i => i.category.toLowerCase() === params.category!.toLowerCase());
      }
      if (params?.available !== undefined) {
        items = items.filter(i => i.available === params.available);
      }
      if (params?.search) {
        const query = params.search.toLowerCase();
        items = items.filter(i => i.name.toLowerCase().includes(query) || i.description.toLowerCase().includes(query));
      }
      return items;
    }
  },

  async createMenuItem(item: Omit<MenuItem, 'id' | '_id'>, adminKey: string): Promise<MenuItem> {
    try {
      const res = await fetch(`${API_BASE_URL}/menu`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey,
        },
        body: JSON.stringify(item),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Failed to create menu item');
      return json.data;
    } catch {
      // Local fallback
      const items = getLocalFallbackMenu();
      const newItem: MenuItem = {
        ...item,
        id: `mock-menu-${Date.now()}`,
        _id: `mock-menu-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      items.unshift(newItem);
      localStorage.setItem(LOCAL_STORAGE_KEY_MENU, JSON.stringify(items));
      return newItem;
    }
  },

  async updateMenuItem(id: string, updates: Partial<MenuItem>, adminKey: string): Promise<MenuItem> {
    try {
      const res = await fetch(`${API_BASE_URL}/menu/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey,
        },
        body: JSON.stringify(updates),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Failed to update menu item');
      return json.data;
    } catch {
      const items = getLocalFallbackMenu();
      const idx = items.findIndex(i => i.id === id || i._id === id);
      if (idx !== -1) {
        items[idx] = { ...items[idx], ...updates };
        localStorage.setItem(LOCAL_STORAGE_KEY_MENU, JSON.stringify(items));
        return items[idx];
      }
      throw new Error('Menu item not found in local fallback');
    }
  },

  async deleteMenuItem(id: string, adminKey: string): Promise<void> {
    try {
      const res = await fetch(`${API_BASE_URL}/menu/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-key': adminKey },
      });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.message || 'Failed to delete');
      }
    } catch {
      const items = getLocalFallbackMenu().filter(i => i.id !== id && i._id !== id);
      localStorage.setItem(LOCAL_STORAGE_KEY_MENU, JSON.stringify(items));
    }
  },

  // Reservation APIs
  async createReservation(data: Omit<Reservation, 'id' | '_id' | 'status'>): Promise<Reservation> {
    try {
      const res = await fetch(`${API_BASE_URL}/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || (json.errors ? json.errors.join(', ') : 'Reservation request failed'));
      return json.data;
    } catch (err: any) {
      if (err.message && !err.message.includes('Failed to fetch')) {
        throw err;
      }
      const list = getLocalFallbackReservations();
      const created: Reservation = {
        ...data,
        id: `res-demo-${Date.now()}`,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      list.unshift(created);
      localStorage.setItem(LOCAL_STORAGE_KEY_RESERVATIONS, JSON.stringify(list));
      return created;
    }
  },

  async getReservations(adminKey: string, status?: string): Promise<Reservation[]> {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/reservations${status ? `?status=${status}` : ''}`, {
        headers: { 'x-admin-key': adminKey },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      return json.data || [];
    } catch {
      let list = getLocalFallbackReservations();
      if (status && status !== 'all') {
        list = list.filter(r => r.status === status);
      }
      return list;
    }
  },

  async updateReservationStatus(id: string, status: 'pending' | 'confirmed' | 'cancelled', adminKey: string): Promise<Reservation> {
    try {
      const res = await fetch(`${API_BASE_URL}/reservations/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey,
        },
        body: JSON.stringify({ status }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Failed to update reservation');
      return json.data;
    } catch {
      const list = getLocalFallbackReservations();
      const idx = list.findIndex(r => r.id === id || r._id === id);
      if (idx !== -1) {
        list[idx].status = status;
        localStorage.setItem(LOCAL_STORAGE_KEY_RESERVATIONS, JSON.stringify(list));
        return list[idx];
      }
      throw new Error('Reservation not found');
    }
  },

  // Contact APIs
  async submitContact(data: Omit<ContactMessage, 'id' | '_id' | 'status'>): Promise<ContactMessage> {
    try {
      const res = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || (json.errors ? json.errors.join(', ') : 'Failed to send message'));
      return json.data;
    } catch (err: any) {
      if (err.message && !err.message.includes('Failed to fetch')) {
        throw err;
      }
      const list = getLocalFallbackMessages();
      const created: ContactMessage = {
        ...data,
        id: `msg-demo-${Date.now()}`,
        status: 'unread',
        createdAt: new Date().toISOString(),
      };
      list.unshift(created);
      localStorage.setItem(LOCAL_STORAGE_KEY_MESSAGES, JSON.stringify(list));
      return created;
    }
  },

  async getContactMessages(adminKey: string): Promise<ContactMessage[]> {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/contact`, {
        headers: { 'x-admin-key': adminKey },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      return json.data || [];
    } catch {
      return getLocalFallbackMessages();
    }
  },

  // Admin Stats
  async getAdminStats(adminKey: string): Promise<AdminStats> {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/admin/stats`, {
        headers: { 'x-admin-key': adminKey },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      return json.data;
    } catch {
      const menu = getLocalFallbackMenu();
      const reservations = getLocalFallbackReservations();
      const msgs = getLocalFallbackMessages();
      return {
        totalMenuItems: menu.length,
        availableMenuItems: menu.filter(m => m.available).length,
        totalReservations: reservations.length,
        pendingReservations: reservations.filter(r => r.status === 'pending').length,
        totalEnquiries: msgs.length,
        dbConnected: false,
      };
    }
  },

  // Health check
  async checkHealth(): Promise<{ status: string; database?: string }> {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/health`, {}, 3000);
      if (!res.ok) return { status: 'offline' };
      return await res.json();
    } catch {
      return { status: 'offline' };
    }
  }
};
