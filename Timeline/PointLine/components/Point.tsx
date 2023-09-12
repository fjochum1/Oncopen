// Point.tsx

import * as React from "react";
import "./Point.style.css";

interface PointProps {
  innerContainer?: React.CSSProperties;
  outerContainer?: React.CSSProperties;
}

const Point: React.FC<PointProps> = ({ innerContainer, outerContainer }) => {
  return (
    <div className={`innerContainer shadowStyle`} style={innerContainer}>
      <div className="outerContainer" style={outerContainer}></div>
    </div>
  );
};

export default Point;
