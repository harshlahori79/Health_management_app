import express from 'express';
import Bmi from '../models/bmiModel.js';
import { protect } from '../middleware/authMiddleware.js';
import { getBmiList } from '../controllers/bmicontroller.js';

const router = express.Router();

router.post('/', protect, async (req, res) => {
  const { bmi, healthLevel } = req.body;

  const bmiEntry = new Bmi({
    user: req.user._id,
    bmi,
    healthLevel,
  });

  try {
    const savedBmi = await bmiEntry.save();
    res.status(201).json(savedBmi);
  } catch (error) {
    res.status(500).json({ message: 'Error saving BMI data' });
  }
});





router.route('/history').get(protect, getBmiList);


export default router;
