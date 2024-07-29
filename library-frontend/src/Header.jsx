// src/Header.jsx
import './Header.css';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="header">
      <button className="hamburger-btn" onClick={toggleSidebar}>
        &#9776;
      </button>
      <h1>Library Management System</h1>
    </header>
  );
};

export default Header;
