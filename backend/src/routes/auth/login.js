import express from 'express';
import { body, validationResult } from 'express-validator';
import generateResponse from '../../utils/generateResponse.js';
import loginController from '../../controllers/auth/loginController.js';

const router = express.Router();

router.post(
  '/',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(generateResponse(false, {}, 'Validation failed', { errors: errors.array() }));
    }
    next();
  },
  loginController
);

export default router;