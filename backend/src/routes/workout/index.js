import express from 'express';
import authMiddleware from '../../middlewares/auth.js';
import {
  logWorkoutController,
  getWorkoutHistoryController,
} from '../../controllers/workout/workoutController.js';

const router = express.Router();

router.post('/', authMiddleware, logWorkoutController);
router.get('/history', authMiddleware, getWorkoutHistoryController);

export default router;
