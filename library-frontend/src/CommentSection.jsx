import '@fortawesome/fontawesome-free/css/all.min.css';
import './CommentSection.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

const CommentSection = ({ initialComments, bookId }) => {
  const [comments, setComments] = useState(initialComments);
  const user = JSON.parse(sessionStorage.getItem('user')); // Assume user details are in session storage
  console.log("sessionStorage.getItem('user'):", sessionStorage.getItem('user'));

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  
  const handleLikeToggle = async (commentId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/comments/${commentId}/like`,
        { rollNumber: user.rollNumber }
      );

      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === commentId
            ? {
                ...comment,
                likes: response.data.likes,
                dislikes: response.data.dislikes,
                userHasLiked: response.data.userHasLiked,
                userHasDisliked: response.data.userHasDisliked,
              }
            : comment
        )
      );
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleDislikeToggle = async (commentId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/comments/${commentId}/dislike`,
        { rollNumber: user.rollNumber }
      );

      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === commentId
            ? {
                ...comment,
                likes: response.data.likes,
                dislikes: response.data.dislikes,
                userHasLiked: response.data.userHasLiked,
                userHasDisliked: response.data.userHasDisliked,
              }
            : comment
        )
      );
    } catch (error) {
      console.error('Error toggling dislike:', error);
    }
  };

  return (
    <section className="content-item" id="comments">
      <h3>{comments.length} Comments</h3>
      {comments.map((comment) => (
        <div className="media" key={comment._id}>
          <div className="media-body">
            <h4 className="media-heading">{comment.userName}</h4>
            <p>{comment.text}</p>
            <ul className="list-unstyled list-inline media-detail">
              <li>
                <i className="fas fa-calendar"></i>{' '}
                {new Date(comment.date).toLocaleDateString()}
              </li>
              <li>
                <button
                  onClick={() => handleLikeToggle(comment._id)}
                  className={comment.userHasLiked ? 'active' : ''}
                >
                  <i className="fas fa-thumbs-up"></i> {comment.likes}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleDislikeToggle(comment._id)}
                  className={comment.userHasDisliked ? 'active' : ''}
                >
                  <i className="fas fa-thumbs-down"></i> {comment.dislikes}
                </button>
              </li>
            </ul>
          </div>
        </div>
      ))}
    </section>
  );
};

export default CommentSection;
