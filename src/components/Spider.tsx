import React from "react";

const Spider: React.FC = () => {
  const style = {
    left: `${Math.random() * 100}%`,
    top: `-50px`,
    animationDuration: `${10 + Math.random() * 20}s`,
    animationDelay: `${Math.random() * 5}s`,
  };

  return (
    <div className="absolute animate-crawl" style={style}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2L10 6L12 10L14 6L12 2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 14L10 18L12 22L14 18L12 14Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 12L6 10L10 12L6 14L2 12Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 12L18 10L22 12L18 14L14 12Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default Spider;
