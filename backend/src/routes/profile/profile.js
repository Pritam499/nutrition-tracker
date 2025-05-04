// src/routes/auth/profile.js

import express from 'express';
import { body, validationResult } from 'express-validator';
import updateProfileController from '../../controllers/auth/updateProfileController.js';
import authMiddleware from '../../middlewares/auth.js';
import generateResponse from '../../utils/generateResponse.js';

const router = express.Router();

router.patch(
  '/',
  authMiddleware,
  [
    body('name').optional().notEmpty().withMessage('Name is required'),

    body('age')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Age must be a positive integer'),

    body('weight')
      .optional()
      .isFloat({ min: 1 })
      .withMessage('Weight must be a positive number'),

    body('height')
      .optional()
      .isFloat({ min: 1 })
      .withMessage('Height must be a positive number'),

    body('goal_weight')
      .optional()
      .isFloat({ min: 1 })
      .withMessage('Goal weight must be a positive number'),

    body('gender')
      .optional()
      .isIn(['male', 'female', 'other'])
      .withMessage('Gender must be one of male, female, other'),

    body('activity_level')
      .optional()
      .isIn(['sedentary', 'active', 'athlete'])
      .withMessage('Activity level must be sedentary, active, or athlete'),

    body('fitness_goal')
      .optional()
      .isIn(['muscle_gain', 'fat_loss', 'maintenance'])
      .withMessage('Fitness goal must be muscle_gain, fat_loss, or maintenance'),

    body('diet_preference')
      .optional()
      .isIn(['vegan', 'vegetarian', 'non-veg', 'keto', 'paleo', 'other'])
      .withMessage('Diet preference must be vegan, vegetarian, non-veg, keto, paleo, or other'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(generateResponse(false, {}, 'Validation failed', { errors: errors.array() }));
    }
    next();
  },
  updateProfileController
);

export default router;
