// src/Sidebar.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar, categories, selectCategory }) => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  const handleLinkClick = () => {
    toggleSidebar(); // Close the sidebar
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={toggleSidebar}>
        &times;
      </button>
      <ul>
        <li onClick={handleLinkClick}>
          <Link to="/">ALL</Link>
        </li>
        <li>
          <Link to="/borrowed-books" onClick={handleLinkClick}>BORROWED BOOKS</Link>
        </li>
        <li onClick={toggleCategories} className="categories-dropdown">
          CATEGORIES
        </li>
        {isCategoriesOpen && (
          <ul className="categories-list">
            {categories.map((category, index) => (
              <li key={index} onClick={() => {
                selectCategory(category);
                handleLinkClick(); // Close the sidebar when a category is selected
              }}>
                {category}
              </li>
            ))}
          </ul>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
