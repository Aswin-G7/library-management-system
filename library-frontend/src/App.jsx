import { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';  
import Header from './Header';
import Sidebar from './Sidebar';
import BorrowedBooksPage from './BorrowedBooksPage'; // Import the new BorrowedBooksPage component
import MainContent from './MainContent';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';
import AdminPage from './AdminPage';
import BorrowedUsersPage from './BorrowedUsersPage';
import AddBookPage from './AddBookPage';
import RemoveBookPage from './RemoveBookPage';
import FinesPage from './FinesPage';
import BookDetailsHeader from './BookDetailsHeader';

import './App.css';


const categories = [
  'Spiritual', 
  'Self-Help',
  'Art',
  'Biography',
  'Business',
  "Children's",
  'Christian',
  'Classics',
  'Comics',
  'Cookbooks',
  'Fantasy',
  'Fiction'
];

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [books, setBooks] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); 
  
  const location = useLocation(); // Get the current location

  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      axios.post('http://localhost:5000/api/users/validateToken', { token })
        .then(response => {
          setIsAuthenticated(true);
        })
        .catch(() => {
          sessionStorage.removeItem('authToken');
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
    sessionStorage.removeItem('authToken'); 
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

  // Determine which header to display based on the route
  const showHeader = location.pathname.startsWith('/book/')
  ? null
  : <Header toggleSidebar={toggleSidebar} handleLogout={handleLogout} isAuthenticated={isAuthenticated} />;

  return (
      <div className="App">
        {/* Now Header is inside Router */}
        {showHeader}
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
          <Route path="/admin/borrowed-users" element={<BorrowedUsersPage />} />
          <Route path="/admin/add-book" element={<AddBookPage />} />
          <Route path="/admin/remove-book" element={<RemoveBookPage books={books} />} />

          {/* User Routes */}
          <Route path="/borrowed-books" element={isAuthenticated ? <BorrowedBooksPage isSidebarOpen={isSidebarOpen} /> : <Navigate to="/login" />} />

          {/* Fines route */}
          <Route path="/fines" element={isAuthenticated ? <FinesPage /> : <Navigate to="/login" />} />

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
    
  );
};

export default App;
