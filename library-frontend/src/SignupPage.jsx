// src/SignupPage.jsx
import { useState } from 'react';
import axios from 'axios';
import './AuthPage.css'; // shared styling for both signup and login

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState(''); // New state
  const [lastName, setLastName] = useState('');   // New state
  const [rollNumber, setRollNumber] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/signup', {
        email,
        firstName,  // Add this
        lastName,   // Add this
        rollNumber,
        password,
      });
      setMessage('Signup successful. Please log in.');
    } catch (error) {
      setMessage('Signup failed: ' + error.response.data.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
      <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}  // New input
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}  // New input
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Roll Number"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SignupPage;
