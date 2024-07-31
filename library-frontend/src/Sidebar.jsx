// src/Sidebar.jsx
import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar, categories, selectCategory }) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const toggleCategory = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={toggleSidebar}>
        &times;
      </button>
      <ul>
        <li>ALL</li>
        <li onClick={toggleCategory}>CATEGORIES</li>
        {isCategoryOpen && (
          <ul className="dropdown">
            {categories.map((category) => (
              <li key={category} onClick={() => selectCategory(category)}>
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
