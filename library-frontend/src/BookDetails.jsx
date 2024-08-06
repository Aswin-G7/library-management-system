import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './BookDetails.css';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };

    fetchBook();
  }, [id]);

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
      <button className="borrow-button">Borrow</button>
    </div>
  );
};

export default BookDetails;
