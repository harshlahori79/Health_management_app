import express from 'express';
import Step from '../models/stepModel.js';
import { protect } from '../middleware/authMiddleware.js';
import { getstepList } from '../controllers/stepHistoryController.js';

const router = express.Router();

router.post('/', protect, async (req, res) => {
  const { steps, caloriesBurned, kilometersTraveled, date } = req.body;

  const step = new Step({
    user: req.user._id,
    steps,
    caloriesBurned,
    kilometersTraveled,
    date,
  });

  try {
    const savedStep = await step.save();
    res.status(201).json(savedStep);
  } catch (error) {
    res.status(500).json({ message: 'Error saving step data' });
  }
});

router.route('/history').get(protect, getstepList);

export default router;
