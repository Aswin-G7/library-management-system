// src/BookList.jsx
import { Link } from 'react-router-dom';
import './BookList.css';

const BookList = ({ books }) => {
  return (
    <div className="book-list">
      {books.map(book => (
        <div key={book._id} className="book-item">
          <Link to={`/book/${book._id}`}>
            <img src={book.coverImage} alt={book.title} />
            <h3>{book.title}</h3>
            <p>{book.author}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BookList;
