// StarRating.jsx
const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating); // Full stars based on integer value
    const halfStars = rating % 1 >= 0.5 ? 1 : 0; // One half-star if rating has a 0.5 remainder
    const emptyStars = 5 - fullStars - halfStars; // Remaining empty stars to make up 5 stars
  
    return (
      <div className="star-rating">
        {Array(fullStars).fill('★').map((star, index) => (
          <span key={`full-${index}`} className="star full">{star}</span>
        ))}
        {halfStars === 1 && <span className="star half">☆</span>}
        {Array(emptyStars).fill('☆').map((star, index) => (
          <span key={`empty-${index}`} className="star empty">{star}</span>
        ))}
        {/* Add rating text */}
        <span className="rating-text">{rating} avg rating</span>
      </div>
    );
  };
  
export default StarRating;
