import { useNavigate, useLocation } from 'react-router-dom';
import AnimatedButton from './AnimatedButton';
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
      <h1>“The only thing you absolutely have to know is the location of the library.”</h1>
      <h1>– Albert Einstein</h1>
      {showLogout && (
        <AnimatedButton text="Logout" onClick={onLogout} />
      )}
    </header>
  );
};

export default Header;
