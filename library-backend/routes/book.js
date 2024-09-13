const express = require('express');
const Book = require('../models/Book');
const User = require('../models/User');
const router = express.Router();
const { protect } = require('../routes/auth'); // Import protect middleware

// Get a book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Borrow a book (Protected Route)
router.post('/:id/borrow', protect, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    const user = req.user; // Get the logged-in user info from the protect middleware

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Check if the user has already borrowed the book
    const alreadyBorrowed = book.borrowedUsers.some(
      borrowedUser => borrowedUser.rollNumber === user.rollNumber
    );
    
    if (alreadyBorrowed) {
      return res.status(400).json({ message: 'User has already borrowed this book' });
    }

    // Add the user to the borrowedUsers array
    book.borrowedUsers.push({
      firstName: user.firstName,
      lastName: user.lastName,
      rollNumber: user.rollNumber,
    });
    await book.save();

    res.json({ 
      message: 'Book borrowed successfully',  
     });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all borrowed users for a book
router.get('/:id/borrowed-users', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book.borrowedUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
