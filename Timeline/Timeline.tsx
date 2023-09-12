// Timeline.tsx

import React from "react";
import Item from "./Item/Item";
import { ITimeline } from "./models";
import "./Timeline.css";

interface TimelineProps {
  timelineStyle?: React.CSSProperties;
  data: ITimeline[];
}

const Timeline: React.FC<TimelineProps> = ({
  data,
  timelineStyle,
  ...rest
}) => {
  const renderItem = (item: ITimeline, index: number) => {
    const isLastMember = index === data.length - 1;
    return (
      <Item
        {...rest}
        data={item}
        list={item.data}
        isLastMember={isLastMember}
      />
    );
  };

  return (
    <div className={`container`} style={timelineStyle}>
      <ul className={`listStyle`}>
        {data.map((item, index) => (
          <li key={index}>{renderItem(item, index)}</li>
        ))}
      </ul>
    </div>
  );
};

export default Timeline;
