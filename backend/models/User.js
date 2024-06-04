import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },
  resetOtp: { type: String },
});

export default mongoose.model('User', userSchema);