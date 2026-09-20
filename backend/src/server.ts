import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { ENV } from './config/env.js';
import { connectDB } from './config/db.js';
import healthRoutes from './routes/healthRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration (allow local dev + deployed origins)
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);
      
      const allowedOrigins = [
        ENV.CORS_ORIGIN,
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        'http://localhost:3000',
        'http://localhost:4173',
      ];

      // Allow configured origin, Cloudflare Pages (*.pages.dev), and Vercel preview domains
      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith('.pages.dev') ||
        origin.endsWith('.vercel.app')
      ) {
        return callback(null, true);
      }
      
      // Strict CORS in production mode
      if (ENV.NODE_ENV === 'production') {
        return callback(new Error(`Origin ${origin} not allowed by CORS policy`));
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// Body parser
app.use(express.json({ limit: '2mb' }));

// Rate limiter for reservation & contact spam prevention
const submissionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 50 submissions per 15 minutes
  message: {
    success: false,
    message: 'Too many submissions from this IP, please try again in 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Mount Routes
app.use('/api/health', healthRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/reservations', submissionLimiter, reservationRoutes);
app.use('/api/contact', submissionLimiter, contactRoutes);
app.use('/api/admin', adminRoutes);

// Root fallback message
app.get('/', (_req, res) => {
  res.status(200).json({
    service: 'Pind Da Dhaba REST API',
    status: 'online',
    documentation: '/api/health',
    demo: 'Fictional Modern Punjabi Restaurant Showcase',
  });
});

// Centralized error handling
app.use(errorHandler);

// Start server
const startServer = async () => {
  await connectDB();
  app.listen(ENV.PORT, () => {
    console.log(`[Pind Da Dhaba API] Running on http://localhost:${ENV.PORT}`);
    console.log(`[Pind Da Dhaba API] Health endpoint at http://localhost:${ENV.PORT}/api/health`);
  });
};

startServer();
