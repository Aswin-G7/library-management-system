// src/AddBookPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './AddBookPage.css';

const AddBookPage = () => {
  const [book, setBook] = useState({
    title: '',
    author: '',
    coverImage: '',
    genre: '',
    rating: '',
    description: '',
    authorBio: '', // New field for author's bio
    location: '',  // New field for library location
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({
      ...book,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/books', book);
      console.log('Book added:', response.data);
      // Reset the form
      setBook({
        title: '',
        author: '',
        coverImage: '',
        genre: '',
        rating: '',
        description: '',
        authorBio: '', // Reset field
        location: '',  // Reset field
      });
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div className="add-book-page">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <label>
          Title:
          <br />
          <input type="text" name="title" value={book.title} onChange={handleChange} required />
        </label>
        <label>
          Author:
          <br />
          <input type="text" name="author" value={book.author} onChange={handleChange} required />
        </label>
        <label>
          Cover Image URL:
          <br />
          <input type="text" name="coverImage" value={book.coverImage} onChange={handleChange} required />
        </label>
        <label>
          Genre:
          <br />
          <input type="text" name="genre" value={book.genre} onChange={handleChange} required />
        </label>
        <label>
          Rating:
          <br />
          <input type="number" name="rating" value={book.rating} onChange={handleChange} min="0" max="5" step="0.1" required />
        </label>
        <label>
          Description:
          <br />
          <textarea name="description" value={book.description} onChange={handleChange} required />
        </label>
        <label>
          Author Bio:
          <br />
          <textarea name="authorBio" value={book.authorBio} onChange={handleChange} />
        </label>
        <label>
          Location in Library:
          <br />
          <input type="text" name="location" value={book.location} onChange={handleChange} />
        </label>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBookPage;
