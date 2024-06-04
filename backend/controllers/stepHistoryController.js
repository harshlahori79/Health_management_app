import asyncHandler from 'express-async-handler';
import Step from '../models/stepModel.js';


const getstepList = asyncHandler(async (req, res) => {
  const stepList = await Step.find({ user: req.user });
  res.json(stepList);
});

export { getstepList };