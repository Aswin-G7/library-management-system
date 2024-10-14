// models/Fine.js
const mongoose = require('mongoose');

const fineSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  daysOverdue: {
    type: Number,
    default: 0,
  },
  fineAmount: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Fine', fineSchema);
