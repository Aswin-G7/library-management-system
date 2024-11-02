const express = require('express');
const Comment = require('../models/Comment');
const router = express.Router();

// Post a new comment
router.post('/:bookId', async (req, res) => {
  try {
    const { userName, text } = req.body;
    const newComment = new Comment({ 
      bookId: req.params.bookId, 
      userName, 
      text,
    });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error posting comment:", error.message);
    res.status(500).json({ error: 'Failed to post comment', details: error.message });
  }
});

// Get comments for a book
router.get('/:bookId', async (req, res) => {
  try {
    const comments = await Comment.find({ bookId: req.params.bookId })
      .sort({ date: -1 }); // Sort by date in descending order
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

module.exports = router;
