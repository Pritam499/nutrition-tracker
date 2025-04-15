import express from 'express';
import { body, validationResult } from 'express-validator';
import generateResponse from '../../utils/generateResponse.js';
import signupController from '../../controllers/auth/signupController.js';

const router = express.Router();

router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(generateResponse(false, {}, 'Validation failed', { errors: errors.array() }));
    }
    next();
  },
  signupController
);

export default router;