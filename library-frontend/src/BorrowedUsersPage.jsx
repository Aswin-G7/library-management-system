import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BorrowedUsersPage.css';  // Optional: Create styling if necessary

const BorrowedUsersPage = () => {
  const [borrowedUsers, setBorrowedUsers] = useState([]);

  useEffect(() => {
    const fetchBorrowedUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/books');
        const borrowedUsersData = response.data.flatMap(book => book.borrowedUsers || []);
        setBorrowedUsers(borrowedUsersData);
      } catch (error) {
        console.error('Error fetching borrowed users:', error);
      }
    };

    fetchBorrowedUsers();
  }, []);

  return (
    <div className="borrowed-users-page">
      <h2>List of Borrowed Users</h2>
      <div className="borrowed-users-list">
        {borrowedUsers.length > 0 ? (
          <ul>
            {borrowedUsers.map((user, index) => (
              <li key={index}>
                {user?.firstName && user?.lastName ? (
                  `${user.firstName} ${user.lastName} (Roll Number: ${user.rollNumber})`
                ) : (
                  'User information missing'
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No users have borrowed books yet</p>
        )}
      </div>
    </div>
  );
};

export default BorrowedUsersPage;
