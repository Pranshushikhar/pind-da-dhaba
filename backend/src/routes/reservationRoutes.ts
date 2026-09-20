import { Router } from 'express';
import {
  createReservation,
  getReservations,
  updateReservationStatus,
} from '../controllers/reservationController.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

// Public submission
router.post('/', createReservation);

// Admin retrieval & status update
router.get('/', requireAdmin, getReservations);
router.put('/:id', requireAdmin, updateReservationStatus);

export default router;
