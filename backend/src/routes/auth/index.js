import express from 'express';
import signupRouter from './signup.js';
import verifyOtpRouter from './verifyOtp.js';
import resendOtpRouter from './resendOtp.js';
import loginRouter from './login.js';
import googleAuthRouter from './googleAuth.js';

const router = express.Router();

router.use('/signup', signupRouter);
router.use('/verify-otp', verifyOtpRouter);
router.use('/resend-otp', resendOtpRouter);
router.use('/login', loginRouter);
router.use('/google', googleAuthRouter);

export default router;