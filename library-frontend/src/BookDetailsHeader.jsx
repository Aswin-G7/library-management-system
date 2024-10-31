// BookDetailsHeader.jsx
import './BookDetailsHeader.css';

const BookDetailsHeader = ({ title }) => {
  return (
    <header className="book-details-header">
      <h1>{title}</h1>
      {/* Add any additional styling or elements here */}
    </header>
  );
};

export default BookDetailsHeader;
