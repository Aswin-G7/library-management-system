import './CategoriesPage.css';

const CategoriesPage = ({ categories, selectCategory  }) => {
  return (
    <div className="categories-page">
      <h2 className="categories-title">Categories</h2>
      <div className="categories-container">
        {categories.map((category, index) => (
          <div 
            key={index} 
            className="category-box" 
            style={{
              backgroundImage: `url(/category-images/${category.toLowerCase()}.webp), url(/category-images/${category.toLowerCase()}.avif), url(/category-images/${category.toLowerCase()}.jpg), url(/category-images/${category.toLowerCase()}.png), url(/category-images/${category.toLowerCase()}.jpeg)`,
            }}
            onClick={() => selectCategory(category)} // Call the selectCategory function on click
          >
            <span className="category-name">{category}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
