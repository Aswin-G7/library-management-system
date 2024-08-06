import React from 'react';
import { Link } from 'react-router-dom';
import './BookList.css';

const BookList = ({ books }) => {
  return (
    <div className="book-list">
      {books.map(book => (
        <div key={book._id} className="book-item">
          <Link to={`/book/${book._id}`}>
            <img
              src={book.coverImage.startsWith('http') ? book.coverImage : `http://localhost:5000${book.coverImage}`}
              alt={book.title}
            />
          </Link>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
        </div>
      ))}
    </div>
  );
};

export default BookList;
