import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FinesPage.css';

const FinesPage = () => {
  const [fines, setFines] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFines = async () => {
      try {
        // Get the rollNumber from sessionStorage or any other method you use
        const user = JSON.parse(sessionStorage.getItem('user'));
        const rollNumber = user?.rollNumber;

        if (!rollNumber) {
          setError('Roll number not found');
          return;
        }

        const response = await axios.get(`http://localhost:5000/api/fines?rollNumber=${rollNumber}`);
        setFines(response.data);
      } catch (error) {
        console.error('Error fetching fines:', error);
        setError('Error fetching fines');
      }
    };

    fetchFines();
  }, []);

  return (
    <div className="fines-page">
      <h1>Your Fines</h1>
      {error ? (
        <div className="error">{error}</div>
      ) : fines.length > 0 ? (
        <table className="fines-table">
          <thead>
            <tr>
              <th>Book Title</th>
              <th>Due Date</th>
              <th>Days Overdue</th>
              <th>Fine Amount</th>
            </tr>
          </thead>
          <tbody>
            {fines.map((fine, index) => (
              <tr key={index}>
                <td>{fine.bookTitle}</td>
                <td>{new Date(fine.dueDate).toLocaleDateString()}</td>
                <td>{fine.daysOverdue}</td>
                <td>₹{fine.fineAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No fines to display.</p>
      )}
    </div>
  );
};

export default FinesPage;
