import React from "react";

const Fog: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="fog-container">
        <div className="fog-img fog-img-first"></div>
        <div className="fog-img fog-img-second"></div>
      </div>
    </div>
  );
};

export default Fog;
