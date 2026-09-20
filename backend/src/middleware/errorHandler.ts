import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error('[API Error]:', err);

  // Handle Zod Validation Errors
  if (err instanceof ZodError) {
    const messages = err.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`);
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: messages,
    });
  }

  // Handle Mongoose Cast Error (Invalid ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: `Invalid resource identifier: ${err.value}`,
    });
  }

  // Centralized production-safe error response
  const statusCode = err.statusCode || 500;
  const isProd = process.env.NODE_ENV === 'production';

  return res.status(statusCode).json({
    success: false,
    message: isProd && statusCode >= 500 ? 'Internal Server Error' : (err.message || 'Internal Server Error'),
  });
};
