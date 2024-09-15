const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Import user routes
const { router: userRoutes } = require('./routes/auth');
const bookRoutes = require('./routes/book'); // Book routes
const Book = require('./models/Book'); // Import the Book model

// Use the user routes
app.use('/api/users', userRoutes);   // User routes
app.use('/api/books', bookRoutes);   // Book routes

// const bookSchema = new mongoose.Schema({
//   title: String,
//   author: String,
//   coverImage: String,
//   genre: String,
//   rating: Number,
//   description: String,
// });

// const Book = mongoose.model('Book', bookSchema);

app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new book
app.post('/api/books', async (req, res) => {
  const newBook = new Book(req.body);
  try {
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Route for borrowing a book
// app.post('/api/books/:id/borrow', async (req, res) => {
//   try {
//     const book = await Book.findById(req.params.id);
//     if (!book) {
//       return res.status(404).json({ message: 'Book not found' });
//     }

//     // Logic to update the borrowed information
//     const { firstName, lastName, rollNumber } = req.body; // Assuming user info is in req.body

//     // Check if the user has already borrowed the book
//     const alreadyBorrowed = book.borrowedUsers.some(
//       (user) => user.rollNumber === rollNumber
//     );

//     if (alreadyBorrowed) {
//       return res.status(400).json({ message: 'User has already borrowed this book' });
//     }

//     // Add the user to the "borrowedUsers" array in the book document
//     book.borrowedUsers = book.borrowedUsers || [];
//     book.borrowedUsers.push({ firstName, lastName, rollNumber });

//     await book.save(); // Save the updated book

//     res.status(200).json({ message: `Book borrowed successfully by ${firstName} ${lastName}` });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to borrow book', error });
//   }
// });


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
