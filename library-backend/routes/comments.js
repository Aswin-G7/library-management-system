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
      likes: 0, // Initialize with 0 likes
      dislikes: 0, // Initialize with 0 dislikes
      likedBy: [], // Array to track users who liked the comment
      dislikedBy: [], // Array to track users who disliked the comment
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
    console.error("Error fetching comments:", error.message);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

// Toggle like status for a comment
router.post('/:commentId/like', async (req, res) => {
  try {
    const { rollNumber } = req.body;
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    // Check if the user has already liked the comment
    const userHasLiked = comment.likedBy.includes(rollNumber);
    const userHasDisliked = comment.dislikedBy.includes(rollNumber);
    console.log(userHasLiked);
    
    if (userHasLiked) {
      // If liked, unlike the comment
      comment.likes -= 1; // Prevents negative likes
      comment.likedBy = comment.likedBy.filter((roll) => roll !== rollNumber);
    } else {
      // If not liked, like the comment
      comment.likes += 1;
      comment.likedBy.push(rollNumber);

      if (userHasDisliked) {
        comment.dislikes -= 1;
        comment.dislikedBy = comment.dislikedBy.filter((roll) => roll !== rollNumber);
      }
    }

    await comment.save();

    res.json({
      likes: comment.likes,
      dislikes: comment.dislikes,
      userHasLiked: !userHasLiked,
      userHasDisliked: false,
    });
  } catch (error) {
    console.error("Error toggling like:", error.message);
    res.status(500).json({ error: 'Failed to toggle like', details: error.message });
  }
});

// Toggle dislike status for a comment
router.post('/:commentId/dislike', async (req, res) => {
  try {
    const { rollNumber } = req.body; // Use rollNumber instead of userId
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    const userHasLiked = comment.likedBy.includes(rollNumber);
    const userHasDisliked = comment.dislikedBy.includes(rollNumber);

    if (userHasDisliked) {
      // Remove dislike
      comment.dislikes -= 1;
      comment.dislikedBy = comment.dislikedBy.filter((roll) => roll !== rollNumber);
    } else {
      // Dislike the comment
      comment.dislikes += 1;
      comment.dislikedBy.push(rollNumber);

      // Remove like if previously liked
      if (userHasLiked) {
        comment.likes -= 1;
        comment.likedBy = comment.likedBy.filter((roll) => roll !== rollNumber);
      }
    }

    await comment.save();

    res.json({
      likes: comment.likes,
      dislikes: comment.dislikes,
      userHasLiked: false,
      userHasDisliked: !userHasDisliked,
    });
  } catch (error) {
    console.error('Error toggling dislike:', error.message);
    res.status(500).json({ error: 'Failed to toggle dislike', details: error.message });
  }
});

module.exports = router;
