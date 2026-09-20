import mongoose from 'mongoose';
import { ENV } from './env.js';

let isDbConnected = false;

// Real-time connection event listeners
mongoose.connection.on('connected', () => {
  isDbConnected = true;
  console.log('[Database] MongoDB connection state: CONNECTED');
});

mongoose.connection.on('disconnected', () => {
  isDbConnected = false;
  console.warn('[Database] MongoDB connection state: DISCONNECTED');
});

mongoose.connection.on('error', (err) => {
  isDbConnected = false;
  console.error('[Database Error]:', err.message);
});

export const connectDB = async (): Promise<boolean> => {
  try {
    const conn = await mongoose.connect(ENV.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    isDbConnected = conn.connection.readyState === 1;
    console.log(`[Database] MongoDB Connected successfully to: ${conn.connection.host}`);
    return true;
  } catch (error: any) {
    isDbConnected = false;
    console.warn(`[Database Warning] Could not establish connection to MongoDB at ${ENV.MONGODB_URI}: ${error?.message || 'Connection failed'}`);
    if (ENV.NODE_ENV === 'production') {
      console.error(`[Database Critical] MongoDB is REQUIRED in production. In-memory fallback is disabled.`);
    } else {
      console.warn(`[Database Notice] Server operating in development fallback mode with transparent state reporting.`);
    }
    return false;
  }
};

export const getDbStatus = (): boolean => {
  return mongoose.connection.readyState === 1 || isDbConnected;
};

