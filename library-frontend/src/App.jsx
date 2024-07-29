// src/App.jsx
import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import BookList from './BookList';
import './App.css';

// Import images
import thePowerOfNow from './assets/TPON_Cover_LG.jpg';
import feelingGood from './assets/5176Hgp9x-L.jpg';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Sample data for books
  const books = [
    {
      _id: 1,
      title: 'The Power of Now',
      author: 'Eckhart Tolle',
      coverImage: thePowerOfNow,
      genre: 'Neurology'
    },
    {
      _id: 2,
      title: 'Feeling Good',
      author: 'David D. Burns, M.D',
      coverImage: feelingGood,
      genre: 'Anesthesiology'
    },
    // Add more book data as needed
  ];

  return (
    <div className="App">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="content">
        <BookList books={books} />
      </div>
    </div>
  );
};

export default App;
