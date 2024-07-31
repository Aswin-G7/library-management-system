// src/Sidebar.jsx
import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar, categories, selectCategory }) => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={toggleSidebar}>
        &times;
      </button>
      <ul>
        <li onClick={() => selectCategory('')}>ALL</li>
        <li onClick={toggleCategories} className="categories-dropdown">
          CATEGORIES
        </li>
        {isCategoriesOpen && (
          <ul className="categories-list">
            {categories.map((category, index) => (
              <li key={index} onClick={() => selectCategory(category)}>
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
