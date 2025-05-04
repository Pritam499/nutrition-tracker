// src/routes/reminderRoutes.js
import express from 'express';
import {
  createReminder,
  getReminders,
  updateReminder,
  deleteReminder
} from '../../controllers/reminders/reminderController.js';
import { protect } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createReminder);
router.get('/', protect, getReminders);
router.patch('/:id', protect, updateReminder);
router.delete('/:id', protect, deleteReminder);

export default router;
