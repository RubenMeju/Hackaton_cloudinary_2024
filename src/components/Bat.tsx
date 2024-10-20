import React from "react";

const Bat: React.FC = () => {
  const style = {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDuration: `${5 + Math.random() * 10}s`,
    animationDelay: `${Math.random() * 5}s`,
  };

  return (
    <div className="absolute animate-fly" style={style}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 8L6 12L2 16M22 8L18 12L22 16M12 2L8 6L12 10L16 6L12 2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default Bat;
