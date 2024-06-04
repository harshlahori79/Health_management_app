import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import nodemailer from 'nodemailer';
import { getUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// JWT secret
const jwtSecret = 'your_jwt_secret';

// Register
router.post('/register', async (req, res) => {
  const { name, email, phone, age, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, phone, age, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
});

//view profile

router.route('/profile').get(protect, getUserProfile);

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in user' });
  }
});

// Verify Token
router.get('/verify-token', (req, res) => {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) return res.status(500).json({ message: 'Failed to authenticate token' });
    res.status(200).json({ message: 'Token is valid', userId: decoded.id });
  });
});

// Request Password Reset
router.post('/request-password-reset', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetOtp = otp;
    await user.save();

    // Send OTP via email 
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'zackstar136@gmail.com',
        pass: 'dogbitch'
      }
    });

    let mailOptions = {
      from: 'zackstar136@gmail.com',
      to: user.email,
      subject: 'Password Reset OTP',
      text: `Your OTP for password reset is ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).json({ message: 'Error sending OTP' });
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).json({ message: 'OTP sent successfully' });
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Error requesting password reset' });
  }
});

// Reset Password
router.post('/reset-password', async (req, res) => {
  const { email, otp, newPassword } = req.body;
  try {
    const user = await User.findOne({ email, resetOtp: otp });
    if (!user) return res.status(400).json({ message: 'Invalid OTP' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetOtp = null;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error resetting password' });
  }
});

export default router;
