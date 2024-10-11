// Import necessary modules
const express = require('express');
const BorrowedHistory = require('./models/BorrowedHistory'); // Import the BorrowedHistory model
const router = express.Router();

// Get all borrowed history
router.get('/borrowed-history', async (req, res) => {
  try {
    const history = await BorrowedHistory.find();
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
