import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './BookDetails.css';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [message, setMessage] = useState('');
  const [isBorrowed, setIsBorrowed] = useState(false);

  const user = JSON.parse(sessionStorage.getItem('user')); 

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/books/${id}`);
        setBook(response.data);

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
      {book.rating && <h2>Rating: {book.rating} / 5</h2>}
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
    </div>
  );
};

export default BookDetails;
