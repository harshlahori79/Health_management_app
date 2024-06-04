// controllers/userController.js
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';


const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      age:user.age
      // Add other user details here
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export { getUserProfile };
