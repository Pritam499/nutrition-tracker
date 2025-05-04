// src/routes/index.js

import express from 'express';
const router = express.Router();

import authRouter from '../routes/auth/index.js';
import ProfileUpdateRoute from '../routes/profile/profile.js';
import dashboardRouter from './dashboardRoutes.js';
import AIrecommendation from './ai/proteinRecommendation.js';
import FoodSearch from './food/foodSearch.js';
import FoodDeatil from './food/foodDetail.js';
import FoodLog from './food/foodLog.js';
import CustomFood from './food/customFoodRoutes.js';
import foodRecommmendation from './food/foodRecommendation.js';

router.use('/auth', authRouter);
router.use('/profile', ProfileUpdateRoute);
router.use('/dashboard', dashboardRouter);
router.use('/ai', AIrecommendation);

// ✅ Fix route priorities here
router.use('/food/recommendations', foodRecommmendation);
router.use('/food/search', FoodSearch);
router.use('/food/log', FoodLog);
router.use('/food/custom', CustomFood);
router.use('/food', FoodDeatil);  // dynamic route like /food/:fdcId comes last

export default router;
