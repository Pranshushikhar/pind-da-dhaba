import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  PORT: parseInt(process.env.PORT || '5000', 10),
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/pind_da_dhaba',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173',
  ADMIN_SECRET_KEY: process.env.ADMIN_SECRET_KEY || 'dhaba_demo_admin_2026',
  NODE_ENV: process.env.NODE_ENV || 'development',
};
