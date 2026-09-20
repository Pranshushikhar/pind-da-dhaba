import { Router } from 'express';
import {
  getMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from '../controllers/menuController.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

// Public route
router.get('/', getMenuItems);

// Admin-protected routes
router.post('/', requireAdmin, createMenuItem);
router.put('/:id', requireAdmin, updateMenuItem);
router.delete('/:id', requireAdmin, deleteMenuItem);

export default router;
