import express from 'express';
import { getFoodRecommendations } from '../../controllers/food/foodRecommendationController.js';
import { authMiddleware } from '../../middlewares/authMiddleware.js';
import { query, validationResult } from 'express-validator';
import generateResponse from '../../utils/generateResponse.js';

const router = express.Router();

router.get(
  '/',
  authMiddleware,
  [
    query('nutrient').notEmpty().withMessage('Nutrient is required'),
    query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
    query('maxCalories').optional().isFloat({ min: 0 }).withMessage('maxCalories must be non-negative')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(generateResponse(false, {}, 'Validation error', { errors: errors.array() }));
    }
    next();
  },
  getFoodRecommendations
);

export default router;
