import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Sidebar from './Sidebar';
import BookList from './BookList';
import BookDetails from './BookDetails';
import SearchBar from './SearchBar';
import AdminPage from './AdminPage';
import './App.css';

const categories = ['Spiritual', 'Self-Help'];

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const selectCategory = (category) => {
    setSelectedCategory(category);
    setIsSidebarOpen(false);
  };

  const filteredBooks = books.filter(book => {
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
            <Route path="/book/:id" element={<BookDetails books={books} />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
