// models/Fine.js
const mongoose = require('mongoose');

const fineSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  rollNumber: {
    type: String,
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
