const express = require('express');
const Book = require('../models/Book');
const router = express.Router();
const { protect } = require('../routes/auth'); // Import protect middleware

// Get borrowed books for the logged-in user
router.get('/borrowed-books', protect, async (req, res) => {
  try {
    const user = req.user; // Get the logged-in user info from the protect middleware
    console.log('Fetching borrowed books for:', user); // Log user info
    
    const borrowedBooks = await Book.find({ 'borrowedUsers.rollNumber': user.rollNumber });
    console.log('User rollNumber:', user.rollNumber);

    console.log('Borrowed books:', borrowedBooks); // See if the query returns any data

    if (!borrowedBooks || borrowedBooks.length === 0) {
      return res.status(404).json({ message: 'No borrowed books found' });
    }

    res.json(borrowedBooks);
  } catch (error) {
    console.error('Error in borrowed books route:', error);
    res.status(500).json({ message: error.message });
  }
});

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
      borrowedDate: new Date(),  // Add current date and time
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

// Return a book (Simplified to directly remove the user)
router.delete('/:id/return', async (req, res) => {
  try {
    const { rollNumber } = req.body;
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Find the index of the user in the borrowedUsers array
    const userIndex = book.borrowedUsers.findIndex(user => user.rollNumber === rollNumber);

    if (userIndex === -1) {
      return res.status(400).json({ message: 'User not found in the borrowed users list' });
    }

    // Remove the user from the borrowedUsers array
    book.borrowedUsers.splice(userIndex, 1);
    await book.save();

    res.json({ message: 'Book returned successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
