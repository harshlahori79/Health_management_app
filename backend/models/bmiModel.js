import mongoose from 'mongoose';

const bmiSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    bmi: {
      type: Number,
      required: true,
    },
    healthLevel: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Bmi = mongoose.model('Bmi', bmiSchema);

export default Bmi;
