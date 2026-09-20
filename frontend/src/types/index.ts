export interface MenuItem {
  id: string;
  _id?: string;
  name: string;
  description: string;
  price: number;
  category: 'Veg' | 'Non-Veg' | 'Tandoor' | 'Breads' | 'Rice' | 'Desserts' | 'Drinks';
  image: string;
  vegetarian: boolean;
  spicy: boolean;
  available: boolean;
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Reservation {
  id?: string;
  _id?: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  specialRequest?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt?: string;
  updatedAt?: string;
}

export interface ContactMessage {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'unread' | 'read' | 'resolved';
  createdAt?: string;
}

export interface AdminStats {
  totalMenuItems: number;
  availableMenuItems: number;
  totalReservations: number;
  pendingReservations: number;
  totalEnquiries: number;
  dbConnected: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  count?: number;
  message?: string;
  errors?: string[];
  fallbackMode?: boolean;
}
