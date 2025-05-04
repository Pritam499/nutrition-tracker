// src/routes/food/foodLog.js

import express from 'express';
import { createFoodLog, getFoodDiary, deleteFoodLog } from '../../controllers/food/foodLogController.js';
import {authMiddleware} from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createFoodLog);         
router.get('/', authMiddleware, getFoodDiary);           // Get today's diary
router.delete('/:id', authMiddleware, deleteFoodLog);    // Delete log

export default router;
