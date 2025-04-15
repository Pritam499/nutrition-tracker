// // src/routes/auth/verifyOtp.js

// import express from 'express';
// import { body, validationResult } from 'express-validator';
// import generateResponse from '../../utils/generateResponse.js';
// import verifyOtpController from '../../controllers/auth/verifyOtpController.js';

// const router = express.Router();

// router.post(
//   '/',
//   [
//     body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
//     body('otp')
//       .isNumeric().withMessage('OTP must be numeric')
//       .isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits')
//       .trim(),
//   ],
//   (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json(generateResponse(false, {}, 'Validation failed', { errors: errors.array() }));
//     }
    
//     // Clean the OTP input (remove any spaces or dashes user might have entered)
//     if (req.body.otp) {
//       req.body.otp = req.body.otp.toString().replace(/\D/g, '');
//     }
    
//     next();
//   },
//   verifyOtpController
// );

// export default router;

import express from 'express';
import { body, validationResult } from 'express-validator';
import verifyOtpController from '../../controllers/auth/verifyOtpController.js';
import generateResponse from '../../utils/generateResponse.js';

const router = express.Router();

router.post(
  '/',
  [
    body('email')
      .isEmail().withMessage('Valid email is required')
      .normalizeEmail(),
    body('otp')
      .isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits')
      .matches(/^\d+$/).withMessage('OTP must contain only numbers')
      .trim()
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(
        generateResponse(false, null, 'Validation failed', errors.array())
      );
    }
    
    // Clean OTP input
    req.body.otp = req.body.otp.replace(/\D/g, '');
    next();
  },
  verifyOtpController
);

// Debug endpoint
router.get('/debug/:email', async (req, res) => {
  try {
    const user = await Users.findOne({
      where: { email: req.params.email },
      attributes: ['email', 'otp', 'otp_expires_at', 'isVerified'],
      raw: true
    });

    if (!user) {
      return res.status(404).json(
        generateResponse(false, null, 'User not found')
      );
    }

    res.json(generateResponse(true, {
      currentTime: new Date(),
      user: user
    }));
  } catch (error) {
    res.status(500).json(
      generateResponse(false, null, 'Debug error', error.message)
    );
  }
});
export default router;