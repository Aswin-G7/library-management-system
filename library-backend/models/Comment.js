// models/Comment.js
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  likedBy: [{ type: String }], // Track rollNumbers who liked this comment
  dislikedBy: [{ type: String }],
});

module.exports = mongoose.model('Comment', commentSchema);
