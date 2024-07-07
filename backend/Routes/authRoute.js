import express from "express";
import { signup , signin } from "../Controllers/authController.js";
const router = express.Router();
import User from '../models/UserSchema.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


router.post('/signup', async (req, res) => {
  console.log('Signup request body:', req.body);
  console.log('Request headers: ', req.headers);
    try {
      const { name, email, password, phone, gender, bloodType } = req.body;

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const user = new User({
        name,
        email,
        password: hashedPassword,
        phone,
        gender,
        bloodType,
      });
  
      await user.save();
      console.log('User saved successfully');
  
      res.json({ success: true, message: 'User signed up successfully!' });
    } catch (error) {
      console.error('Error signing up:', error);
      if (error.code === 11000) { // Handle duplicate email
        res.status(400).json({ success: false, message: 'Email already exists.' });
      } else {
        res.status(500).json({ success: false, message: 'An error occurred while signing up.' });
      }
      console.log('Error response sent')
    }
    console.log('Sending response...');
  });

// Sign-in route
router.post('/signin', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found.' });
      }
  
      // Compare passwords
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(401).json({ success: false, message: 'Incorrect password.' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.json({ success: true, token }); 
    } catch (error) {
      console.error('Error signing in:', error);
      res.status(500).json({ success: false, message: 'An error occurred while signing in.' });
    }
  });


export default router