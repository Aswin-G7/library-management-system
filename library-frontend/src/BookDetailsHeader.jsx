// BookDetailsHeader.jsx
import './BookDetailsHeader.css';

const BookDetailsHeader = ({ title, author }) => {
  return (
    <header className="book-details-header">
      <h1>{title}</h1>
      <p className="author-name">by {author}</p> {/* Add the author's name below the title */}
    </header>
  );
};

export default BookDetailsHeader;
