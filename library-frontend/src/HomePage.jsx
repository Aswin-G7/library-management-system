import React from 'react';
import './HomePage.css'; // Make sure you import the CSS file

const HomePage = () => {
  return (
    <div className="home-container">
      {/* About Us Section */}
      <section className="about-us">
        <h1>About Us</h1>
        <p>
          Welcome to our Library Management System, a one-stop platform for book enthusiasts, students, and anyone looking to explore a world of knowledge. 
          We provide a vast collection of books spanning across various genres, from fiction and non-fiction to self-help, history, and science. 
          Our system is designed to help you discover new books easily, borrow them, and even return them, all while keeping track of your borrowed items and fines. 
          We believe in promoting a culture of reading, learning, and accessibility. Whether you are a casual reader or a scholar, we have something for everyone!
        </p>
      </section>

      {/* See Books Section */}
      <section className="see-books">
        <h2>Explore Our Books</h2>
        <p>
          With thousands of titles available, our library is a treasure trove of books, offering something for every reader's taste. 
          From the latest bestsellers to timeless classics, we’ve got it all. Our collection includes genres such as Fiction, Non-Fiction, Fantasy, 
          Science Fiction, Biography, and many more. We even have a specialized collection for academic and reference materials, 
          perfect for students and researchers. Whether you want to dive into the world of literature or enhance your knowledge in a specific field, 
          you’ll find the right book here.
        </p>
        <div className="box-1">
          <div className="btn btn-three">
            <span>See Books</span>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <h2>Explore Categories</h2>
        <p>
          We organize our books into multiple categories to make it easy for you to find what you're looking for. 
          Whether you're interested in classic literature, the latest thrillers, or books on personal development, 
          you can easily browse through different categories to discover books that fit your interests. 
          Our categories include:
        </p>
        <ul>
          <li>Fiction</li>
          <li>Non-Fiction</li>
          <li>Science Fiction</li>
          <li>Fantasy</li>
          <li>Biography & Memoirs</li>
          <li>Self-Help & Personal Development</li>
          <li>Children’s Books</li>
          <li>History & Politics</li>
        </ul>
        <p>
          This extensive categorization makes it easier for you to find your next great read. Whether you’re looking to escape into a fantasy world or 
          learn more about the world around you, you’ll find the perfect book here.
        </p>
        <button className="categories-button">Explore Categories</button>
      </section>

      {/* Contact Section (optional) */}
      <section className="contact">
        <h2>Contact Us</h2>
        <p>
          Have any questions or need assistance? Our team is here to help! Whether you’re having trouble navigating the website, 
          need recommendations, or want to know more about our library policies, we’re just a message away. 
          You can reach us through our contact page, or simply email us at <strong>support@library.com</strong> and we’ll get back to you as soon as possible. 
          We value our users' feedback and are always open to suggestions on how to improve our library system.
        </p>
      </section>
    </div>
  );
};

export default HomePage;
