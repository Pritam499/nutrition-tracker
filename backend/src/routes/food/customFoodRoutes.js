// src/routes/food/customFoodRoutes.js

import express from 'express';
import {authMiddleware} from '../../middlewares/authMiddleware.js';
import {
  createCustomFood,
  getCustomFoods,
  updateCustomFood,
  deleteCustomFood,
} from '../../controllers/food/customFoodController.js';

const router = express.Router();

router.post('/', authMiddleware, createCustomFood);
router.get('/', authMiddleware, getCustomFoods);
router.patch('/:id', authMiddleware, updateCustomFood);
router.delete('/:id', authMiddleware, deleteCustomFood);

export default router;
