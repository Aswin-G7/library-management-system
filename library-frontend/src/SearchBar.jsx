// src/SearchBar.jsx
import './SearchBar.css';

const SearchBar = ({ searchTerm, handleSearch }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search for books..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-bar"
      />
    </div>
  );
};

export default SearchBar;
