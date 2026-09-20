import { Request, Response, NextFunction } from 'express';
import { Reservation } from '../models/Reservation.js';
import { getDbStatus } from '../config/db.js';
import { ENV } from '../config/env.js';
import { INITIAL_RESERVATIONS } from '../utils/initialData.js';
import { reservationSchema, updateReservationStatusSchema } from '../utils/validation.js';

let inMemoryReservations = INITIAL_RESERVATIONS.map(res => ({
  ...res,
  _id: res.id,
  createdAt: res.createdAt || new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));

export const createReservation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = reservationSchema.parse(req.body);

    if (getDbStatus()) {
      const reservation = await Reservation.create(validatedData);
      return res.status(201).json({
        success: true,
        persisted: true,
        storage: 'mongodb',
        data: reservation,
        message: 'Your table reservation has been requested successfully! (Stored in MongoDB)',
      });
    }

    // In production, NEVER silently replace MongoDB
    if (ENV.NODE_ENV === 'production') {
      return res.status(503).json({
        success: false,
        persisted: false,
        storage: 'none',
        error: 'Database unavailable',
        message: 'MongoDB connection is unavailable. In-memory fallback is disabled in production mode.',
      });
    }

    // Development mode fallback with transparent reporting
    const mockRes = {
      ...validatedData,
      id: `res-demo-${Date.now()}`,
      _id: `res-demo-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    inMemoryReservations.unshift(mockRes as any);

    return res.status(201).json({
      success: true,
      persisted: false,
      storage: 'in-memory-fallback',
      warning: 'MongoDB is offline. Stored in temporary in-memory demo cache only (not persisted).',
      data: mockRes,
      message: 'Your table reservation has been requested successfully! (Demo showcase)',
    });
  } catch (err) {
    next(err);
  }
};

export const getReservations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status } = req.query;

    if (getDbStatus()) {
      const query: Record<string, any> = {};
      if (status && status !== 'all') {
        query.status = status;
      }
      const reservations = await Reservation.find(query).sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        persisted: true,
        storage: 'mongodb',
        count: reservations.length,
        data: reservations,
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

    let filtered = [...inMemoryReservations];
    if (status && status !== 'all') {
      filtered = filtered.filter(r => r.status === status);
    }

    return res.status(200).json({
      success: true,
      persisted: false,
      storage: 'in-memory-fallback',
      warning: 'MongoDB is offline. Serving from temporary in-memory demo cache.',
      count: filtered.length,
      data: filtered,
    });
  } catch (err) {
    next(err);
  }
};

export const updateReservationStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { status } = updateReservationStatusSchema.parse(req.body);

    if (getDbStatus()) {
      const updated = await Reservation.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true }
      );
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Reservation not found' });
      }
      return res.status(200).json({
        success: true,
        persisted: true,
        storage: 'mongodb',
        data: updated,
        message: `Reservation status updated to ${status}`,
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

    const idx = inMemoryReservations.findIndex(r => r.id === id || (r as any)._id === id);
    if (idx === -1) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }

    inMemoryReservations[idx].status = status;
    inMemoryReservations[idx].updatedAt = new Date().toISOString();

    return res.status(200).json({
      success: true,
      persisted: false,
      storage: 'in-memory-fallback',
      warning: 'MongoDB is offline. Updated in temporary in-memory demo cache.',
      data: inMemoryReservations[idx],
      message: `Reservation status updated to ${status} (in-memory demo)`,
    });
  } catch (err) {
    next(err);
  }
};
