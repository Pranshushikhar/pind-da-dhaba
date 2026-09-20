import { Request, Response, NextFunction } from 'express';
import { ENV } from '../config/env.js';

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  const adminKey = req.headers['x-admin-key'] || req.query.adminKey;

  // In demo portfolio mode, if no key or incorrect key is provided
  if (!adminKey || adminKey !== ENV.ADMIN_SECRET_KEY) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Valid Admin Secret Key required for administrative actions.',
    });
  }

  next();
};
