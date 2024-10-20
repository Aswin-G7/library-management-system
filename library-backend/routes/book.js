const express = require('express');
const Book = require('../models/Book');
const Fine = require('../models/Fines'); // Assuming Fine model is set up
const router = express.Router();
const { protect } = require('../routes/auth'); // Import protect middleware

// Get borrowed books for the logged-in user
router.get('/borrowed-books', protect, async (req, res) => {
  try {
    const user = req.user; // Get the logged-in user info from the protect middleware
    //console.log('Fetching borrowed books for:', user); // Log user info
    
    const borrowedBooks = await Book.find({ 'borrowedUsers.rollNumber': user.rollNumber });
    console.log('User rollNumber:', user.rollNumber);

    //console.log('Borrowed books:', borrowedBooks); // See if the query returns any data

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


    // Calculate the due date as 7 days from the current date
    const borrowedDate = new Date();
    const dueDate = new Date(borrowedDate);
    dueDate.setDate(borrowedDate.getDate() + 7); // Set due date to 7 days after borrowing

    // Add the user to the borrowedUsers array
    book.borrowedUsers.push({
      firstName: user.firstName,
      lastName: user.lastName,
      rollNumber: user.rollNumber,
      borrowedDate: borrowedDate,  // Add current date
      dueDate: dueDate,  // Add the calculated due date
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

    // Find the user in the borrowedUsers array
    const borrowedUser = book.borrowedUsers.find(user => user.rollNumber === rollNumber);

    if (!borrowedUser) {
      return res.status(400).json({ message: 'User not found in the borrowed users list' });
    }

    // Check if the user is overdue
    const today = new Date();
    const dueDate = new Date(borrowedUser.dueDate);
    const daysOverdue = Math.floor((today - dueDate) / (1000 * 60 * 60 * 24)); // Calculate overdue days

    if (daysOverdue > 0) {
      // Calculate the fine
      const fineAmount = daysOverdue * 10; // Assuming 10 units fine per day

      // Create a new fine record
      const newFine = new Fine({
        firstName: borrowedUser.firstName,
        lastName: borrowedUser.lastName,
        rollNumber: borrowedUser.rollNumber,
        book: book._id,
        dueDate: borrowedUser.dueDate,
        daysOverdue,
        fineAmount,
      });
      await newFine.save(); // Save the fine record
    }

    // Remove the user from the borrowedUsers array (book return)
    book.borrowedUsers = book.borrowedUsers.filter(user => user.rollNumber !== rollNumber);
    await book.save();

    res.json({ message: 'Book returned successfully' });
  } catch (error) {
    console.error('Error returning book:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
