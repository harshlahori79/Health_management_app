
import express from 'express';
import { saveContinuousStepData } from '../controllers/continuousStepController.js';
import { protect } from '../middleware/authMiddleware2.js';
import { getContinuousStepData } from '../controllers/continuousStepController.js';


const router = express.Router();

router.route('/').post(protect, saveContinuousStepData);
router.get('/data', protect, getContinuousStepData);

export default router;
