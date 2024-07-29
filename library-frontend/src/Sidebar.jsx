// src/Sidebar.jsx
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={toggleSidebar}>
        &times;
      </button>
      <ul>
        <li>ALL</li>
        <li>CATEGORIES</li>
      </ul>
    </div>
  );
};

export default Sidebar;
