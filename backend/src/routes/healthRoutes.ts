import { Router } from 'express';
import { getDbStatus } from '../config/db.js';
import { ENV } from '../config/env.js';

const router = Router();

router.get('/', (_req, res) => {
  const isDbConnected = getDbStatus();

  if (ENV.NODE_ENV === 'production' && !isDbConnected) {
    return res.status(503).json({
      status: 'unhealthy',
      database: 'disconnected',
      persisted: false,
      error: 'MongoDB is unavailable. Persistent storage required in production.',
      timestamp: new Date().toISOString(),
      service: 'Pind Da Dhaba API',
      environment: ENV.NODE_ENV,
    });
  }

  res.status(200).json({
    status: isDbConnected ? 'healthy' : 'degraded',
    database: isDbConnected ? 'connected' : 'disconnected',
    persisted: isDbConnected,
    storage: isDbConnected ? 'mongodb' : 'fallback-memory',
    timestamp: new Date().toISOString(),
    service: 'Pind Da Dhaba API',
    environment: ENV.NODE_ENV,
  });
});

export default router;
