const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  available: { type: Boolean, default: true },
  rating: { type: Number, default: 0 },
  coverImage: { type: String } // URL for the cover image
});

module.exports = mongoose.model('Book', bookSchema);
