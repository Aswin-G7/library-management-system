// src/GenreSidebar.jsx
import './GenreSidebar.css';

const GenreSidebar = ({ genres, selectGenre }) => {
  return (
    <div className="genre-sidebar">
      <ul>
        {genres.map((genre) => (
          <li key={genre} onClick={() => selectGenre(genre)}>
            {genre}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GenreSidebar;
