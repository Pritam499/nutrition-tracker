import express from 'express';
import authMiddleware from '../../middlewares/auth.js';
import summaryController from '../../controllers/dashboard/summaryController.js';

const router = express.Router();

router.get('/', authMiddleware, summaryController);
export default router;
