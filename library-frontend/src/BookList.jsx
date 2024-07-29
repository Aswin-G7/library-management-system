// src/BookList.jsx
import './BookList.css';

const BookList = ({ books }) => {
  return (
    <div className="book-list">
      {books.map((book) => (
        <div key={book._id} className="book-card">
          <img src={book.coverImage} alt={book.title} className="book-cover" />
          <h3>{book.title}</h3>
          <p>{book.author}</p>
        </div>
      ))}
    </div>
  );
};

export default BookList;
