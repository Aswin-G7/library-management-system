// src/AdminPage.jsx
import './AdminPage.css';

const AdminPage = () => {
  return (
    <div className="admin-page">
      <h2>Admin Dashboard</h2>
      <div className="admin-grid">
        <div className="admin-box add-book">
          <h3>Add a Book</h3>
        </div>
        <div className="admin-box remove-book">
          <h3>Remove a Book</h3>
        </div>
        <div className="admin-box registered-users">
          <h3>List of Registered Users</h3>
        </div>
        <div className="admin-box borrowed-users">
          <h3>Borrowed Users</h3>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
