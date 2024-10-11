// src/BorrowedBooksPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookList from './BookList'; // Import the BookList component

const BorrowedBooksPage = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const token = sessionStorage.getItem('authToken'); // Make sure this matches the token name you set
        console.log("Token:", token); // This should log the token
        if (!token) {
          throw new Error('No token found');
        }

        console.log("Request Config:", {
          method: 'GET',
          url: 'http://localhost:5000/api/books/borrowed-books',
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        const response = await axios.get('http://localhost:5000/api/books/borrowed-books', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setBorrowedBooks(response.data);
      } catch (error) {
        console.log(error);
        setError('Error fetching borrowed books');
      } finally {
        setLoading(false);
      }
    };

    fetchBorrowedBooks();
  }, []);

  if (loading) {
    return <div>Loading borrowed books...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="borrowed-books-container">
      <h2>Borrowed Books</h2>
      {borrowedBooks.length === 0 ? (
        <p>You haven't borrowed any books yet.</p>
      ) : (
        <BookList books={borrowedBooks} /> // Use the BookList component here
      )}
    </div>
  );
};

export default BorrowedBooksPage;
