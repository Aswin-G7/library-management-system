import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ toggleSidebar, handleLogout, isAuthenticated }) => {
  const navigate = useNavigate(); // Now this is inside a component wrapped by Router

  const onLogout = () => {
    handleLogout(); // Clear local storage and set authentication state
    navigate('/login'); // Navigate to login page after logout
  };

  return (
    <header className="header">
      <button className="hamburger-btn" onClick={toggleSidebar}>
        &#9776;
      </button>
      <h1>Library Management System</h1>
      {/* Conditionally render the logout button based on authentication */}
      {isAuthenticated && (
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      )}
    </header>
  );
};

export default Header;
