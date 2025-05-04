import express from 'express';
import authMiddleware from '../../middlewares/auth.js';
import aiMealController from '../../controllers/ai/aiMealController.js';

const router = express.Router();

router.get('/meal-suggestions', authMiddleware, aiMealController);

export default router;
