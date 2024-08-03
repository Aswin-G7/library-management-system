const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  coverImage: String,
  genre: String,
  rating: Number,
  description: String,
});

const Book = mongoose.model('Book', bookSchema);

const books = [
  {
    title: 'The Power of Now',
    author: 'Eckhart Tolle',
    coverImage: '/public/TPON_Cover_LG.jpg',
    genre: 'Spiritual',
    rating: 4.5,
    description: 'A guide to spiritual enlightenment.'
  },
  {
    title: 'Feeling Good',
    author: 'David D. Burns, M.D',
    coverImage: '/public/5176Hgp9x-L.jpg',
    genre: 'Self-Help',
    rating: 4.2,
    description: 'The clinically proven drug-free treatment for depression.'
  },
  {
    title: 'Think Straight',
    author: 'Darius Foroux',
    coverImage: '/public/think_straight.jpg',
    genre: 'Self-Help',
    rating: 4.0,
    description: 'A fascinating self help book.'
  }
];

const seedDB = async () => {
  await Book.deleteMany({});
  await Book.insertMany(books);
  console.log('Database seeded');
};

seedDB().then(() => {
  mongoose.connection.close();
});
