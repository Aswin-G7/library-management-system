// src/Sidebar.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar, categories, selectCategory }) => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const navigate = useNavigate(); // Use navigate for routing

  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  const handleLinkClick = () => {
    toggleSidebar(); // Close the sidebar
  };

  //Handle category click: select category, close sidebar, and navigate to home page
  const handleCategoryClick = (category) => {
    selectCategory(category);  // Update selected category in parent component
    handleLinkClick();         // Close sidebar
    navigate('/');             // Navigate to home page
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={toggleSidebar}>
        &times;
      </button>
      <ul>
      <li onClick={() => {
          selectCategory('');  // Reset selectedCategory to an empty string
          handleLinkClick();   // Close the sidebar
        }}>
          <Link to="/">ALL</Link>
        </li>
        <li>
          <Link to="/borrowed-books" onClick={handleLinkClick}>BORROWED BOOKS</Link>
        </li>
        <li>
          <Link to="/fines" onClick={handleLinkClick}>FINES</Link>
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
        <li>
          <Link to="/test" onClick={toggleSidebar}>TEST</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
