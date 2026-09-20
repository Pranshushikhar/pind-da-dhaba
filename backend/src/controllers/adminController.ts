import { Request, Response, NextFunction } from 'express';
import { MenuItem } from '../models/MenuItem.js';
import { Reservation } from '../models/Reservation.js';
import { ContactMessage } from '../models/ContactMessage.js';
import { getDbStatus } from '../config/db.js';
import { ENV } from '../config/env.js';

export const getDashboardStats = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const dbConnected = getDbStatus();

    if (dbConnected) {
      const [
        totalMenuItems,
        availableMenuItems,
        totalReservations,
        pendingReservations,
        totalEnquiries
      ] = await Promise.all([
        MenuItem.countDocuments(),
        MenuItem.countDocuments({ available: true }),
        Reservation.countDocuments(),
        Reservation.countDocuments({ status: 'pending' }),
        ContactMessage.countDocuments(),
      ]);

      return res.status(200).json({
        success: true,
        persisted: true,
        storage: 'mongodb',
        data: {
          totalMenuItems,
          availableMenuItems,
          totalReservations,
          pendingReservations,
          totalEnquiries,
          dbConnected: true,
        }
      });
    }

    if (ENV.NODE_ENV === 'production') {
      return res.status(503).json({
        success: false,
        persisted: false,
        error: 'Database unavailable',
        message: 'MongoDB connection is unavailable in production mode.',
      });
    }

    // Default fallback demo counts with explicit notice
    return res.status(200).json({
      success: true,
      persisted: false,
      storage: 'in-memory-fallback',
      warning: 'MongoDB is offline. Stats are based on in-memory demo store.',
      data: {
        totalMenuItems: 12,
        availableMenuItems: 12,
        totalReservations: 3,
        pendingReservations: 1,
        totalEnquiries: 2,
        dbConnected: false,
      }
    });
  } catch (err) {
    next(err);
  }
};
