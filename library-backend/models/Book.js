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
  borrowedUsers: [
    {
      firstName: String,
      lastName: String,
      rollNumber: String,
      borrowedDate: { type: Date, default: Date.now },  // Track the date of borrowing
    }
  ],
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
