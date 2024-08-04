import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import BookList from './BookList';
import BookDetails from './BookDetails';
import SearchBar from './SearchBar';
import AdminPage from './AdminPage';

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
      </Routes>
    </div>
  );
};

export default MainContent;
