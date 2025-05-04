// src/routes/subscriptionRoutes.js
import express from 'express';
import { createSubscription, verifyPayment } from '../../controllers/subscription/subscriptionController.js';
import { protect } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create', protect, createSubscription);
router.post('/verify', protect, verifyPayment);

export default router;
