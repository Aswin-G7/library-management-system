import { useEffect, useState } from 'react';
import axios from 'axios';
import './RemoveBookPage.css';

const RemoveBookPage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const removeBook = async (bookId) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${bookId}`);
      setBooks(books.filter(book => book._id !== bookId));
    } catch (error) {
      console.error('Error removing book:', error);
    }
  };

  return (
    <div className="remove-book-page">
      <h2>Remove a Book</h2>
      <div className="book-list">
        {books.map(book => (
          <div key={book._id} className="book-item">
            <img
              src={book.coverImage.startsWith('http') ? book.coverImage : `http://localhost:5000${book.coverImage}`}
              alt={book.title}
            />
            <div className="book-details">
              <h3>{book.title}</h3>
              <p>{book.author}</p>
            </div>
            <button className="delete-button" onClick={() => removeBook(book._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RemoveBookPage;
