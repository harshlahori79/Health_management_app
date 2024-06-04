import mongoose from 'mongoose';

const stepSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  steps: {
    type: Number,
    required: true,
  },
  caloriesBurned: {
    type: Number,
    required: true,
  },
  kilometersTraveled: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const Step = mongoose.model('Step', stepSchema);

export default Step;
