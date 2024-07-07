// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
import User from '../models/UserSchema.js';


const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

const User = mongoose.model('User', userSchema);

// Signup route
app.post('/api/signup', async (req, res) => {
  console.log('Signup request received:', req.body);
  try {
    const { name, email, password, phone, gender, bloodType } = req.body;
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword, // Use the hashed password
      phone,
      gender,
      bloodType,
    });

    await user.save();
    res.json({ success: true, message: 'User signed up successfully!' });
  } catch (error) {
    console.error('Error signing up:', error);
    if (error.code === 11000) { // Assuming 11000 is Mongo's duplicate key error
      res.status(400).json({ success: false, message: 'Email already exists.' });
    } else {
      res.status(500).json({ success: false, message: 'An error occurred while signing up.' });
    }
  }
});

// Signin route
app.post('/api/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }
    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: 'Incorrect password.' });
    }
    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
    res.json({ success: true, token });
  } catch (error) {
    console.error('Error signing in:', error);
    res.status(500).json({ success: false, message: 'An error occurred while signing in.' });
  }
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ success: false, message: 'Token not provided.' });
  }
  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Failed to authenticate token.' });
    }
    req.userId = decoded.userId;
    next();
  });
};

// Example protected route
app.get('/api/protected', verifyToken, (req, res) => {
  res.json({ success: true, message: 'This is a protected route.' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
