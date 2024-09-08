import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';  
import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';
import AdminPage from './AdminPage';
import AddBookPage from './AddBookPage';
import RemoveBookPage from './RemoveBookPage';
import './App.css';

const categories = ['Spiritual', 'Self-Help'];

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [books, setBooks] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);  

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      axios.post('http://localhost:5000/api/users/validateToken', { token })
        .then(response => {
          setIsAuthenticated(true);
        })
        .catch(() => {
          localStorage.removeItem('authToken');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
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

  const handleLogout = () => {
    localStorage.removeItem('authToken'); 
    setIsAuthenticated(false);  
  };

  const filteredBooks = books.filter(book => {
    return (
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory ? book.genre === selectedCategory : true)
    );
  });

  if (loading) {
    return <div>Loading...</div>;  
  }

  return (
    <Router>
      <div className="App">
        {/* Now Header is inside Router */}
        <Header toggleSidebar={toggleSidebar} handleLogout={handleLogout} isAuthenticated={isAuthenticated} />
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          categories={categories}
          selectCategory={selectCategory}
        />
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/add-book" element={<AddBookPage />} />
          <Route path="/admin/remove-book" element={<RemoveBookPage books={books} />} />

          {/* User Routes */}
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
