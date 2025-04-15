// src/routes/dashboardRoutes.js
import express from 'express';
import {
  getUserSummary,
  getMacroProgress,
  getRecentActivities,
  getAITips,
  getWaterIntake
} from '../controllers/dashboard/dashboardController.js';

import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/summary', authMiddleware, getUserSummary);
router.get('/macros', authMiddleware, getMacroProgress);
router.get('/activities', authMiddleware, getRecentActivities);
router.get('/ai-tips', authMiddleware, getAITips);
router.get('/water', authMiddleware, getWaterIntake);

export default router;
