import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import BookList from './BookList';
import BookDetails from './BookDetails';
import SearchBar from './SearchBar';
import BookDetailsHeader from './BookDetailsHeader'; // Import the new header
import BorrowedBooksPage from './BorrowedBooksPage'; // Import the new BorrowedBooksPage component
import AdminPage from './AdminPage';
import AddBookPage from './AddBookPage';
import RemoveBookPage from './RemoveBookPage'; // Import the new component
import Header from './Header';

const MainContent = ({ books, searchTerm, handleSearch, selectedCategory }) => {
  const location = useLocation();

    // Get the book title based on the current route
    const bookId = location.pathname.split('/').pop(); // Extract the ID from the URL
    //console.log(bookId);
    const currentBook = books.find(book => book._id === bookId); // Find the book by ID
    //console.log(currentBook);
    const bookTitle = currentBook ? currentBook.title : ''; // Get the title or set to an empty string
    //console.log(bookTitle);

   // Filter books based on the selected category
  const filteredBooks = books.filter(book => {
    return !selectedCategory || book.genre === selectedCategory; // Display all books if no category is selected
  });

  return (
    <div className="content">
      {/* Show search bar only on the main page */}
      {location.pathname === '/' && (
        <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
      )}

      <Routes>
        <Route path="/" element={<BookList books={filteredBooks} />} />
        <Route path="/book/:id" element={<BookDetails books={books} />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/add-book" element={<AddBookPage />} />
        <Route path="/admin/remove-book" element={<RemoveBookPage books={books} />} /> {/* New Route */}
      </Routes>
    </div>
  );
};

export default MainContent;
