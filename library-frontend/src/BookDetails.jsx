import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './BookDetails.css';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [message, setMessage] = useState('');
  const [isBorrowed, setIsBorrowed] = useState(false); // State to track if user has already borrowed

  // Fetch current user from sessionStorage
  const user = JSON.parse(sessionStorage.getItem('user')); // { firstName, lastName, rollNumber }

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/books/${id}`);
        setBook(response.data);

        // Check if the current user has already borrowed the book
        const userHasBorrowed = response.data.borrowedUsers?.some(
          (borrowedUser) => borrowedUser.rollNumber === user.rollNumber
        );
        setIsBorrowed(userHasBorrowed);
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };

    fetchBook();
  }, [id, user.rollNumber]);

  const handleBorrow = async () => {
    try {
      const token = sessionStorage.getItem('authToken'); // Get the token from sessionStorage
  
      const response = await axios.post(
        `http://localhost:5000/api/books/${id}/borrow`,
        {
          firstName: user.firstName,
          lastName: user.lastName,
          rollNumber: user.rollNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Send the token in the request headers
          },
        }
      );
  
      setMessage(response.data.message);
      setIsBorrowed(true); // After borrowing, set the user as having borrowed the book
    } catch (error) {
      if (error.response) {
        setMessage('Error borrowing the book: ' + error.response.data.message);
      } else {
        setMessage('Error borrowing the book.');
      }
    }
  };

  if (!book) {
    return <div>Book not found</div>;
  }

  const coverImageUrl = book.coverImage.startsWith('http') ? book.coverImage : `http://localhost:5000${book.coverImage}`;

  return (
    <div className="book-details">
      <h1>{book.title}</h1>
      <div className="underline"></div>
      <div className="book-info">
        <img src={coverImageUrl} alt={book.title} />
        <div className="book-meta">
          <h2>Rating: {book.rating}</h2>
          <div className="underline"></div>
          <h3>Description</h3>
          <p>{book.description}</p>
        </div>
      </div>
      <button 
        className="borrow-button" 
        onClick={handleBorrow} 
        disabled={isBorrowed} // Disable button if the user has already borrowed
      >
        {isBorrowed ? 'Already Borrowed' : 'Borrow'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default BookDetails;
