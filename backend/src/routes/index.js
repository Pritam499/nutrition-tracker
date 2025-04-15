// src/routes/index.js

import express from 'express';
const router = express.Router();


// import userRoutes from './user.js';
// router.use('/users',createOrder,makePayment,orderUpdate,viewPaymentDetails,getOrderDetails);
import authRouter from '../routes/auth/index.js';
import dashboardRouter from './dashboardRoutes.js';
router.use('/auth', authRouter);
router.use('/dashboard', dashboardRouter);


export default router;   
