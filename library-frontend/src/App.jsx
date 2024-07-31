// src/App.jsx
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import BookList from './BookList';
import BookDetails from './BookDetails';
import SearchBar from './SearchBar';
import { books as booksData } from './booksData'; // Importing books data
import './App.css';

// Sample data for categories
const categories = ['Spiritual', 'Self-Help'];

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const selectCategory = (category) => {
    setSelectedCategory(category);
    setIsSidebarOpen(false); // Close sidebar after selecting category
  };

  const filteredBooks = booksData.filter(book => {
    return (
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory ? book.genre === selectedCategory : true)
    );
  });

  return (
    <Router>
      <div className="App">
        <Header toggleSidebar={toggleSidebar} />
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          categories={categories}
          selectCategory={selectCategory}
        />
        <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
        <div className="content">
          <Routes>
            <Route path="/" element={<BookList books={filteredBooks} />} />
            <Route path="/book/:id" element={<BookDetails books={booksData} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
