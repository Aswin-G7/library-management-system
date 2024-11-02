import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BookDetailsHeader from './BookDetailsHeader';
import StarRating from './StarRating';
import CommentSection from './CommentSection';
import './BookDetails.css';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [message, setMessage] = useState('');
  const [isBorrowed, setIsBorrowed] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const user = JSON.parse(sessionStorage.getItem('user'));

  useEffect(() => {
    // Fetch book details and comments on component mount
    const fetchBookAndComments = async () => {
      try {
        const bookResponse = await axios.get(`http://localhost:5000/api/books/${id}`);
        setBook(bookResponse.data);

        // Check if the user has borrowed this book
        const userHasBorrowed = bookResponse.data.borrowedUsers?.some(
          (borrowedUser) => borrowedUser.rollNumber === user.rollNumber
        );
        setIsBorrowed(userHasBorrowed);

        // Fetch comments for this book
        const commentsResponse = await axios.get(`http://localhost:5000/api/comments/${id}`);
        setComments(commentsResponse.data);
      } catch (error) {
        console.error('Error fetching book or comments:', error);
      }
    };

    fetchBookAndComments();
  }, [id, user.rollNumber]);

  const handleBorrow = async () => {
    try {
      const token = sessionStorage.getItem('authToken');
      const response = await axios.post(
        `http://localhost:5000/api/books/${id}/borrow`,
        {
          firstName: user.firstName,
          lastName: user.lastName,
          rollNumber: user.rollNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message);
      setIsBorrowed(true);

      // Re-fetch book data to update the borrowed count
      const updatedBookResponse = await axios.get(`http://localhost:5000/api/books/${id}`);
      setBook(updatedBookResponse.data);
    } catch (error) {
      setMessage('Error borrowing the book.');
    }
  };

  const handleCommentSubmit = async () => {
    if (newComment.trim()) {
      try {
        await axios.post(`http://localhost:5000/api/comments/${id}`, {
          userName: user.firstName,
          text: newComment,
        });

        // Include the createdAt date from the response or set it manually
        const date = new Date(); // Set the date to now if not returned from API
        const newCommentObject = {
          userName: user.firstName,
          text: newComment,
          date: date.toISOString(), // Store the date in ISO format
        };

        setComments([...comments, newCommentObject]);
        setNewComment('');
      } catch (error) {
        console.error('Error adding comment:', error.response?.data || error.message); 
      }
    }
  };

  if (!book) {
    return <div>Book not found</div>;
  }

  const coverImageUrl = book.coverImage.startsWith('http') ? book.coverImage : `http://localhost:5000${book.coverImage}`;

  return (
    <div className="book-details">
      <BookDetailsHeader title={book.title} author={book.author} />
      {book.rating && <StarRating rating={book.rating} />}
      <div className="underline"></div>
      <div className="book-info">
        <div className="book-meta-left">
          <div className="book-image">
            <img src={coverImageUrl} alt={book.title} />
          </div>
          <div className="book-description">
            <h2>Description</h2>
            <p>{book.description}</p>
          </div>
        </div>

        <div className="book-meta-right">
          <h2>About the Author</h2>
          <p>{book.authorBio}</p>
          <h2>Location in Library</h2>
          <p>{book.location}</p>
        </div>
      </div>

      <h3>Number of Borrows: {book.borrowedCount}</h3>

      <button 
        className="borrow-button" 
        onClick={handleBorrow} 
        disabled={isBorrowed}
      >
        {isBorrowed ? 'Already Borrowed' : 'Borrow'}
      </button>
      {message && <p>{message}</p>}

      <div className="comment-section">
        <h3>Comments</h3>
        <CommentSection comments={comments} />
        <input
        type="text"
        placeholder="Add a comment"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleCommentSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default BookDetails;
