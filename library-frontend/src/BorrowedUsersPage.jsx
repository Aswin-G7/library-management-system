import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import './BorrowedUsersPage.css'; // For styling the boxes

const BorrowedUsersPage = () => {
  const [borrowedUsers, setBorrowedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBorrowedUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/books'); // Fetch all books
        const borrowedData = response.data.flatMap(book => 
          book.borrowedUsers.map(user => ({
            ...user, 
            bookId: book._id,  // Attach book ID to each borrowed user
            bookTitle: book.title,
            borrowedDate: new Date(user.borrowedDate) }))
        ); // Map users and attach the book they borrowed
        setBorrowedUsers(borrowedData);
      } catch (error) {
        console.error('Error fetching borrowed users:', error);
      }
    };

    fetchBorrowedUsers();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value); // Update search term as user types
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleReturnBook = async (bookId, rollNumber) => {
    try {  
      await axios.delete(`http://localhost:5000/api/books/${bookId}/return`, {
        data: { rollNumber },  // Pass data as part of request body for DELETE method
      });
      
      // Update the frontend to reflect the change
      setBorrowedUsers(prevUsers => 
        prevUsers.filter(
          (user) => user.rollNumber !== rollNumber || user.bookId !== bookId
        )
      );
      alert('Book returned successfully');
    } catch (error) {
      console.error('Error returning book:', error);
      alert('Failed to return the book.');
    }
  };

  // Filter users based on search term (case-insensitive)
  const filteredUsers = borrowedUsers.filter((user) =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.rollNumber.toString().includes(searchTerm)
  );

  return (
    <div className="borrowed-users-page">
      <h2>Borrowed Users</h2>

      {/* Search Bar */}
      <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />

      <div className="borrowed-users-container">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <div key={index} className="user-box">
              <p className="user-name">Name: {user.firstName} {user.lastName}</p>
              <p className="user-roll">Roll Number: {user.rollNumber}</p>
              <p className="book-title">Book Borrowed: {user.bookTitle}</p>
              <p className="borrowed-date">Borrowed Date: {formatDate(user.borrowedDate)}</p> {/* Displaying date */}
              <button
                className="return-button"
                onClick={() => handleReturnBook(user.bookId, user.rollNumber)}
              >
                Mark as Returned
              </button>
            </div>
          ))
        ) : (
          <p className="no-users-message">No users have borrowed books yet</p>
        )}
      </div>
    </div>
  );
};

export default BorrowedUsersPage;
