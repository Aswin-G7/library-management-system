const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
  },
  genre: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
  },
  description: {
    type: String,
  },
  authorBio: { 
    type: String 
  },  // New field for author's bio
  location: { 
    type: String 
  },  // New field for library location
  borrowedUsers: [
    {
      firstName: String,
      lastName: String,
      rollNumber: String,
      borrowedDate: { type: Date, default: Date.now },  // Track the date of borrowing
      dueDate: { type: Date },  // Due date for returning the book
    }
  ],
  borrowedCount: {
    type: Number,
    default: 0, // Initializes the borrow count to zero
  },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
