import React from "react";
import { Box, VStack, List, ListItem } from "@chakra-ui/react";
import Card from "../Card/Card";
import PointLine from "../PointLine/PointLine";
import { ITimeline, ITimelineData } from "../models";
import styles from "./Item.style";

interface ItemProps {
  style?: any; // Adjust the type to suit your needs
  data: ITimeline;
  list: ITimelineData[];
  isLastMember: boolean;
}

const Item: React.FC<ItemProps> = ({
  style,
  data,
  list,
  isLastMember,
  ...rest
}) => {
  const renderItem = (item: ITimelineData, index: number) => {
    return <Card {...rest} key={index} isCard data={item} />;
  };

  return (
    <Box style={style}>
      <PointLine
        {...rest}
        date={data.date}
        length={list.length}
        isLastMember={isLastMember}
      />
      <VStack style={styles.insideListContainer}>
        <List>
          {list.map((item, index) => (
            <ListItem key={index}>{renderItem(item, index)}</ListItem>
          ))}
        </List>
      </VStack>
    </Box>
  );
};

export default Item;
