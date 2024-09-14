import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BorrowedUsersPage.css'; // For styling the boxes

const BorrowedUsersPage = () => {
  const [borrowedUsers, setBorrowedUsers] = useState([]);

  useEffect(() => {
    const fetchBorrowedUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/books'); // Fetch all books
        const borrowedData = response.data.flatMap(book => 
          book.borrowedUsers.map(user => ({ ...user, bookTitle: book.title }))
        ); // Map users and attach the book they borrowed
        setBorrowedUsers(borrowedData);
      } catch (error) {
        console.error('Error fetching borrowed users:', error);
      }
    };

    fetchBorrowedUsers();
  }, []);

  return (
    <div className="borrowed-users-page">
      <h2>Borrowed Users</h2>
      <div className="borrowed-users-container">
        {borrowedUsers.length > 0 ? (
          borrowedUsers.map((user, index) => (
            <div key={index} className="user-box">
              <p className="user-name">Name: {user.firstName} {user.lastName}</p>
              <p className="user-roll">Roll Number: {user.rollNumber}</p>
              <p className="book-title">Book Borrowed: {user.bookTitle}</p>
            </div>
          ))
        ) : (
          <p>No users have borrowed books yet</p>
        )}
      </div>
    </div>
  );
};

export default BorrowedUsersPage;
