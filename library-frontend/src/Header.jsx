import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

const Header = ({ toggleSidebar, handleLogout, isAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();  // This is safe to use here inside Router context

  const onLogout = () => {
    handleLogout();
    navigate('/login');
  };

  // Show the logout button only if authenticated and not on the login/signup/admin pages
  const showLogout = isAuthenticated && !location.pathname.startsWith('/admin') && !['/login', '/signup'].includes(location.pathname);

  return (
    <header className="header">
      <button className="hamburger-btn" onClick={toggleSidebar}>
        &#9776;
      </button>
      <h1>Library Management System</h1>
      {showLogout && (
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;
