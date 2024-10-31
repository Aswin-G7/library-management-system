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

const MainContent = ({ books, searchTerm, handleSearch }) => {
  const location = useLocation();

    // Get the book title based on the current route
    const bookId = location.pathname.split('/').pop(); // Extract the ID from the URL
    //console.log(bookId);
    const currentBook = books.find(book => book._id === bookId); // Find the book by ID
    //console.log(currentBook);
    const bookTitle = currentBook ? currentBook.title : ''; // Get the title or set to an empty string
    //console.log(bookTitle);

  return (
    <div className="content">
      {location.pathname === '/' && (
        <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
      )}

      {/* Conditionally render the BookDetailsHeader for BookDetails page */}
      {/* {location.pathname === `/book/${bookId}` ? ( 
        <BookDetailsHeader title={bookTitle} />
      ) : (
        null
      )} */}

      <Routes>
        <Route path="/" element={<BookList books={books} />} />
        <Route path="/book/:id" element={<BookDetails books={books} />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/add-book" element={<AddBookPage />} />
        <Route path="/admin/remove-book" element={<RemoveBookPage books={books} />} /> {/* New Route */}
      </Routes>
    </div>
  );
};

export default MainContent;
