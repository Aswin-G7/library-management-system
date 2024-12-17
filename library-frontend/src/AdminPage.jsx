import { useNavigate } from 'react-router-dom';
import './AdminPage.css';
import { FaBook, FaUserMinus, FaUsers, FaUserCheck } from 'react-icons/fa';
import AnimatedButton from './AnimatedButton.jsx';

const AdminPage = () => {
  const navigate = useNavigate();

  const goToAddBookPage = () => {
    navigate('/admin/add-book');
  };

  const goToRemoveBookPage = () => {
    navigate('/admin/remove-book');
  };

  const goToBorrowedUsersPage = () => {
    navigate('/admin/borrowed-users');
  };

  const handleLogout = () => {
    console.log('Logged out successfully');
    // Add your logout logic here (e.g., clear tokens, navigate to login page)
  };

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <AnimatedButton
          text="Logout"
          onClick={handleLogout}
        />
      </header>
      <div className="admin-grid">
        <div className="admin-card" onClick={goToAddBookPage}>
          <FaBook className="admin-icon" />
          <h3>Add a Book</h3>
        </div>
        <div className="admin-card" onClick={goToRemoveBookPage}>
          <FaUserMinus className="admin-icon" />
          <h3>Remove a Book</h3>
        </div>
        <div className="admin-card">
          <FaUsers className="admin-icon" />
          <h3>Registered Users</h3>
        </div>
        <div className="admin-card" onClick={goToBorrowedUsersPage}>
          <FaUserCheck className="admin-icon" />
          <h3>Borrowed Users</h3>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
