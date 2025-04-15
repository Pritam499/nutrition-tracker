import express from 'express';
import { body, validationResult } from 'express-validator';
import generateResponse from '../../utils/generateResponse.js';
import googleAuthController from '../../controllers/auth/googleAuthController.js';

const router = express.Router();

router.post(
  '/',
  [
    body('token').notEmpty().withMessage('Google token is required'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(generateResponse(false, {}, 'Validation failed', { errors: errors.array() }));
    }
    next();
  },
  googleAuthController
);

export default router;