import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

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
        <div className="btn" onClick={() => handleNavigation('/')}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 60">
            <rect x="0" y="0" width="180" height="60" fill="none"></rect>
          </svg>
          <span>See Books</span>
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
        <div className="btn" onClick={() => handleNavigation('/test')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="180px" height="60px">
            <rect x="0" y="0" fill="none" width="180" height="60"></rect>
          </svg>
          <span>Explore Categories</span>
        </div>
      </section>

      {/* See Borrowed Books Section */}
      <section className="borrowed-books">
        <h2>See What You’ve Borrowed</h2>
        <p>
          Curious about the books you've borrowed? We've made it easy for you to track your borrowed items in one place. 
          With a single click, you can view your borrowed book history, due dates, and even the fines associated with overdue books. 
          Stay organized and never lose track of your reading journey!
        </p>
        <div className="btn" onClick={() => handleNavigation('/borrowed-books')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="180px" height="60px">
            <rect x="0" y="0" fill="none" width="180" height="60"></rect>
          </svg>
          <span>View Borrowed Books</span>
        </div>
      </section>

      {/* Contact Section */}
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
