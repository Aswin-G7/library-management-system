// routes/auth.js
const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Sign-up route
router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, rollNumber, password } = req.body;  // Include firstName and lastName

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user with firstName and lastName
    const user = await User.create({
      firstName,   // Save first name
      lastName,    // Save last name
      email,
      rollNumber,
      password,
    });

    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,  // Return first name
      lastName: user.lastName,    // Return last name
      email: user.email,
      rollNumber: user.rollNumber,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        firstName: user.firstName,  // Return first name on login
        lastName: user.lastName,    // Return last name on login
        email: user.email,
        rollNumber: user.rollNumber,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Validate token route
router.post('/validateToken', (req, res) => {
  const token = req.body.token;

  if (!token) {
    return res.status(400).json({ message: 'No token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ valid: true });
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
});

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = router;
