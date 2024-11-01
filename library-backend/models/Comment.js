const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  user: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Comment', commentSchema);
