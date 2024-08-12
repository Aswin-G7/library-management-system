import { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar'; // Import the SearchBar component
import './RemoveBookPage.css';

const RemoveBookPage = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="remove-book-page">
      <h2>Remove a Book</h2>
      {/* Use the existing SearchBar component */}
      <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
      <div className="book-list">
        {filteredBooks.map(book => (
          <div key={book._id} className="book-item">
            <img 
              src={book.coverImage.startsWith('http') ? book.coverImage : `http://localhost:5000${book.coverImage}`} 
              alt={book.title} 
            />
            <div className="book-details">
              <h3>{book.title}</h3>
              <p>{book.author}</p>
            </div>
            <button className="delete-button" onClick={() => removeBook(book._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RemoveBookPage;
