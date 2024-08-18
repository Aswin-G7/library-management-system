import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Sidebar from './Sidebar';
import BookList from './BookList';
import MainContent from './MainContent';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';
import './App.css';

const categories = ['Spiritual', 'Self-Help'];

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [books, setBooks] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

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

  const handleLogin = () => {
    setIsAuthenticated(true);
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
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route
            path="/*"
            element={
              isAuthenticated ? (
                <MainContent
                  books={filteredBooks}
                  searchTerm={searchTerm}
                  handleSearch={handleSearch}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
