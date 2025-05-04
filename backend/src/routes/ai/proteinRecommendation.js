import express from 'express';
import { getProteinRecommendation } from '../../controllers/ai/aiProteinRecommendation.js';
import { authMiddleware as protect } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/protein-recommendation', protect, getProteinRecommendation);

export default router;
