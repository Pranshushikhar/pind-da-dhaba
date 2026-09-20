import { z } from 'zod';

export const menuItemSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().min(5, 'Description must be at least 5 characters'),
  price: z.coerce.number().min(0, 'Price must be greater than or equal to 0'),
  category: z.enum(['Veg', 'Non-Veg', 'Tandoor', 'Breads', 'Rice', 'Desserts', 'Drinks']),
  image: z.string().url('Image must be a valid URL'),
  vegetarian: z.boolean().default(false),
  spicy: z.boolean().default(false),
  available: z.boolean().default(true),
  featured: z.boolean().default(false),
});

export const reservationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(8, 'Phone must be a valid number').max(16, 'Phone is too long'),
  email: z.string().email('Please provide a valid email address'),
  date: z.string().min(4, 'Valid date is required'),
  time: z.string().min(2, 'Valid time is required'),
  guests: z.coerce.number().int().min(1, 'Guests must be at least 1').max(20, 'Maximum party size is 20 for online booking'),
  specialRequest: z.string().optional().default(''),
});

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please provide a valid email address'),
  phone: z.string().min(8, 'Phone number must be at least 8 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export const updateReservationStatusSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'cancelled']),
});
