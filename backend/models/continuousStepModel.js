
import mongoose from 'mongoose';

const continuousStepSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
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
  timestamp: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

const ContinuousStep = mongoose.model('ContinuousStep', continuousStepSchema);

export default ContinuousStep;
