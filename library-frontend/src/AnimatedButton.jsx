import { useState } from "react";
import "./AnimatedButton.scss";

const AnimatedButton = ({ text = "Submit", onClick, className = "" }) => {
  const [status, setStatus] = useState(""); // Track button state: "onclic", "validate"

  const handleClick = () => {
    setStatus("onclic"); // Add spinning effect

    setTimeout(() => {
      setStatus("validate"); // Validate check effect
      if (onClick) onClick(); // Call the parent function on successful validation
    }, 2250);

    setTimeout(() => {
      setStatus(""); // Reset after validation
    }, 3500);
  };

  return (
    <div className={`animated-button-container ${className}`}>
      <button
        id="button"
        className={`animated-button ${status}`}
        onClick={handleClick}
      >
        {text}
      </button>
    </div>
  );
};

export default AnimatedButton;
