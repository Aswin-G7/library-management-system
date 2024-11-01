const express = require('express');
const Comment = require('../models/Comment');
const router = express.Router();

// Post a new comment
router.post('/:bookId', async (req, res) => {
  try {
    const { user, text } = req.body;
    const newComment = new Comment({ bookId: req.params.bookId, user, text });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to post comment' });
  }
});

// Get comments for a book
router.get('/:bookId', async (req, res) => {
  try {
    const comments = await Comment.find({ bookId: req.params.bookId });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

module.exports = router;
