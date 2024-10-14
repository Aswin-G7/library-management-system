const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Calculate fine logic (adjust based on your fine structure)
const calculateFine = (daysOverdue) => {
  const finePerDay = 10;  // Set a fine amount per day, adjust as needed
  return daysOverdue > 0 ? daysOverdue * finePerDay : 0;
};

// Get fines for the logged-in user
router.get('/', async (req, res) => {
  try {
    const rollNumber = req.query.rollNumber;  // Assuming rollNumber is passed in the query
    const today = new Date();

    if (!rollNumber) {
      return res.status(400).json({ message: 'Missing roll number' });
    }

    // Find books borrowed by this user that are overdue
    const books = await Book.find({
      'borrowedUsers.rollNumber': rollNumber,
    });

    const fines = [];

    books.forEach(book => {
      book.borrowedUsers.forEach(borrowedUser => {
        if (borrowedUser.rollNumber === rollNumber) {
          const dueDate = new Date(borrowedUser.dueDate);
          const daysOverdue = Math.floor((today - dueDate) / (1000 * 60 * 60 * 24));
          const fineAmount = calculateFine(daysOverdue);

          if (daysOverdue > 0) {
            fines.push({
              bookTitle: book.title,
              dueDate: borrowedUser.dueDate,
              daysOverdue,
              fineAmount,
            });
          }
        }
      });
    });

    res.json(fines);

  } catch (error) {
    console.error('Error fetching fines:', error);
    res.status(500).json({ message: 'Error fetching fines' });
  }
});

module.exports = router;
