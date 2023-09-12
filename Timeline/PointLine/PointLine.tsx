// PointLine.tsx

import * as React from "react";
import moment from "moment";
import "./PointLine.style.css";
import Point from "./components/Point";

interface PointLineProps {
  date: number;
  length: number;
  isLastMember: boolean;
  dayTextStyle?: React.CSSProperties;
  monthTextStyle?: React.CSSProperties;
}

const PointLine: React.FC<PointLineProps> = ({
  date,
  isLastMember,
  dayTextStyle,
  length,
  monthTextStyle,
  ...rest
}) => {
  return (
    <div className="container">
      <div className="containerGlue">
        <span style={dayTextStyle}>
          {moment(date).format("DD")}
        </span>
        <span style={monthTextStyle}>
          {moment(date).format("ddd").toUpperCase()}
        </span>
      </div>
      <div className="dividerStyle">
        {!isLastMember && (
          <div className="dash" style={{ height: `${110 * length}px` }} />
        )}
        <Point {...rest} />
      </div>
    </div>
  );
};

export default PointLine;
