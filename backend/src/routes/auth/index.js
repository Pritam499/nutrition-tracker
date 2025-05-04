import express from 'express';


import sendOtp from './sendOtp.js';
import verifyOtpRouter from './verifyOtp.js';
import resendOtpRouter from './resendOtp.js';
import googleAuthRouter from './googleAuth.js';


const router = express.Router();

router.use('/send-otp', sendOtp);
router.use('/resend-otp', resendOtpRouter);
router.use('/verify-otp', verifyOtpRouter);
router.use('/google', googleAuthRouter);


export default router;