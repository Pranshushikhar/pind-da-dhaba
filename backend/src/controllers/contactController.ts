import { Request, Response, NextFunction } from 'express';
import { ContactMessage } from '../models/ContactMessage.js';
import { getDbStatus } from '../config/db.js';
import { ENV } from '../config/env.js';
import { INITIAL_MESSAGES } from '../utils/initialData.js';
import { contactSchema } from '../utils/validation.js';

let inMemoryMessages = INITIAL_MESSAGES.map(msg => ({
  ...msg,
  _id: msg.id,
  createdAt: msg.createdAt || new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));

export const createContactMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = contactSchema.parse(req.body);

    if (getDbStatus()) {
      const message = await ContactMessage.create(validatedData);
      return res.status(201).json({
        success: true,
        persisted: true,
        storage: 'mongodb',
        data: message,
        message: 'Thank you for your message! Our team will get back to you shortly (Stored in MongoDB).',
      });
    }

    if (ENV.NODE_ENV === 'production') {
      return res.status(503).json({
        success: false,
        persisted: false,
        storage: 'none',
        error: 'Database unavailable',
        message: 'MongoDB connection is unavailable. In-memory fallback is disabled in production mode.',
      });
    }

    const mockMsg = {
      ...validatedData,
      id: `msg-demo-${Date.now()}`,
      _id: `msg-demo-${Date.now()}`,
      status: 'unread',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    inMemoryMessages.unshift(mockMsg as any);

    return res.status(201).json({
      success: true,
      persisted: false,
      storage: 'in-memory-fallback',
      warning: 'MongoDB is offline. Stored in temporary in-memory demo cache only (not persisted).',
      data: mockMsg,
      message: 'Thank you for your message! Our team will get back to you shortly (Demo showcase).',
    });
  } catch (err) {
    next(err);
  }
};

export const getContactMessages = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    if (getDbStatus()) {
      const messages = await ContactMessage.find().sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        persisted: true,
        storage: 'mongodb',
        count: messages.length,
        data: messages,
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

    return res.status(200).json({
      success: true,
      persisted: false,
      storage: 'in-memory-fallback',
      warning: 'MongoDB is offline. Serving from temporary in-memory demo cache.',
      count: inMemoryMessages.length,
      data: inMemoryMessages,
    });
  } catch (err) {
    next(err);
  }
};
