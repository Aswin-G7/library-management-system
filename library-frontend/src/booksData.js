// src/booksData.js
import thePowerOfNow from './assets/TPON_Cover_LG.jpg';
import feelingGood from './assets/5176Hgp9x-L.jpg';

export const books = [
  {
    _id: 1,
    title: 'The Power of Now',
    author: 'Eckhart Tolle',
    coverImage: thePowerOfNow,
    genre: 'Neurology',
    rating: 4.5,
    description: 'A guide to spiritual enlightenment.'
  },
  {
    _id: 2,
    title: 'Feeling Good',
    author: 'David D. Burns, M.D',
    coverImage: feelingGood,
    genre: 'Anesthesiology',
    rating: 4.2,
    description: 'The clinically proven drug-free treatment for depression.'
  },
  // Add more book data as needed
];
