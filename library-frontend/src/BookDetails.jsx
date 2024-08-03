// src/BookDetails.jsx
import { useParams } from 'react-router-dom';
import './BookDetails.css';

const BookDetails = ({ books }) => {
  const { id } = useParams();
  const book = books.find(b => b._id === parseInt(id));

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <div className="book-details">
      <h2>{book.title}</h2>
      <div className="book-info">
        <img src={book.coverImage} alt={book.title} className="book-cover" />
        <button className="borrow-button">Borrow</button>
      </div>
      <h3>Rating</h3>
      <hr />
      <p>{book.rating}</p>
      <h3>Description</h3>
      <hr />
      <p>{book.description}</p>
    </div>
  );
};

export default BookDetails;
