// src/BookDetails.jsx
import { useParams, useNavigate } from 'react-router-dom';
import './BookDetails.css';

const BookDetails = ({ books }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = books.find(b => b._id === parseInt(id));

  if (!book) return <div>Book not found</div>;

  return (
    <div className="book-details">
      <button onClick={() => navigate(-1)}>Back to list</button>
      <h2>{book.title}</h2>
      <img src={book.coverImage} alt={book.title} className="book-image" />
      <div className="details-section">
        <h3>Ratings</h3>
        <hr />
        <p>{book.rating}</p>
      </div>
      <div className="details-section">
        <h3>Description</h3>
        <hr />
        <p>{book.description}</p>
      </div>
    </div>
  );
};

export default BookDetails;
