
import asyncHandler from 'express-async-handler';
import ContinuousStep from '../models/continuousStepModel.js';


const saveContinuousStepData = asyncHandler(async (req, res) => {
  const { steps, caloriesBurned, kilometersTraveled } = req.body;

  if (steps == null || caloriesBurned == null || kilometersTraveled == null) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  const existingData = await ContinuousStep.findOne({ user: req.user });

  if (existingData) {
    existingData.steps = steps;
    existingData.caloriesBurned = caloriesBurned;
    existingData.kilometersTraveled = kilometersTraveled;

    const updatedStepData = await existingData.save();
    res.status(200).json(updatedStepData);
  } else {
    const stepData = new ContinuousStep({
      user: req.user._id,
      steps,
      caloriesBurned,
      kilometersTraveled,
    });

    const savedStepData = await stepData.save();
    res.status(201).json(savedStepData);
  }
});

const getContinuousStepData = asyncHandler(async (req, res) => {
    const stepData = await ContinuousStep.findOne({ user: req.user });
  
    if (stepData) {
      res.json(stepData);
    } else {
      res.status(404);
      throw new Error('Step data not found');
    }
  });

export { saveContinuousStepData , getContinuousStepData};
