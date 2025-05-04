import express from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware.js';
import { query, validationResult } from 'express-validator';
import { searchFoods } from '../../controllers/food/searchFoodController.js';
import generateResponse from '../../utils/generateResponse.js';

const router = express.Router();

router.get(
  '/',
  authMiddleware,
  [
    query('query').isString().notEmpty().withMessage('Query parameter is required'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json(generateResponse(false, {}, 'Validation failed', { errors: errors.array() }));
    }
    next();
  },
  searchFoods
);

export default router;
