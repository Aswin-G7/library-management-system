import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import BookList from './BookList';
import BookDetails from './BookDetails';
import SearchBar from './SearchBar';
import BorrowedBooksPage from './BorrowedBooksPage'; // Import the new BorrowedBooksPage component
import AdminPage from './AdminPage';
import AddBookPage from './AddBookPage';
import RemoveBookPage from './RemoveBookPage'; // Import the new component

const MainContent = ({ books, searchTerm, handleSearch }) => {
  const location = useLocation();

  return (
    <div className="content">
      {location.pathname === '/' && (
        <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
      )}
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
