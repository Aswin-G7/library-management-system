const mongoose = require('mongoose');

const borrowedHistorySchema = new mongoose.Schema({
  bookTitle: { type: String, required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  rollNumber: { type: String, required: true },
  borrowedDate: { type: Date, required: true },
});

const BorrowedHistory = mongoose.model('BorrowedHistory', borrowedHistorySchema);
module.exports = BorrowedHistory;
