import { Router } from 'express';
import {
  createContactMessage,
  getContactMessages,
} from '../controllers/contactController.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

// Public submission
router.post('/', createContactMessage);

// Admin retrieval
router.get('/', requireAdmin, getContactMessages);

export default router;
