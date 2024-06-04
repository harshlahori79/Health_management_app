
import asyncHandler from 'express-async-handler';
import Bmi from '../models/bmiModel.js';

const getBmiList = asyncHandler(async (req, res) => {
  const bmiList = await Bmi.find({ user: req.user });
  res.json(bmiList);
});

export { getBmiList };
