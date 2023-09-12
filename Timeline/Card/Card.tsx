import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import moment from 'moment';
import { ITimelineData } from '../models';
import styles from './Card.style';

interface CardProps {
  data: ITimelineData;
  isCard?: boolean;
  dateFormat?: string;
  style?: any;
  titleTextStyle?: any;
  subtitleTextStyle?: any;
  dateTextStyle?: any;
}

const Card: React.FC<CardProps> = ({
	isCard = true,
	data,
	titleTextStyle,
	subtitleTextStyle,
	dateTextStyle,
	dateFormat = "DD ddd, HH:mm",
  }) => {
	const { title, subtitle, date } = data;

	return (
	  <Box
		  style={{
			  ...styles.container,
			  ...styles.shadowStyle,
			  ...(isCard ? { backgroundColor: 'transparent' } : {})
		  }}
	  >
		  <Box
			  style={{
				  ...styles.cardContainer,
				  ...(isCard ? styles.cardContainerShadowStyle : {})
			  }}
		  >
			  <Box style={styles.cardContainerGlue}>
				  <Text
					  style={{
						  ...styles.titleTextStyle,
						  ...titleTextStyle
					  }}
					  isTruncated
				  >
					  {title}
				  </Text>
				  <Text
					  style={{
						  ...styles.subtitleTextStyle,
						  ...subtitleTextStyle
					  }}
					  noOfLines={2}
				  >
					  {subtitle}
				  </Text>
			  </Box>
		  </Box>
		  <Text
			  style={{
				  ...styles.dateTextStyle,
				  ...(isCard ? { marginTop: '8px' } : {}),
				  ...dateTextStyle
			  }}
		  >
			  {moment(date).format(dateFormat)}
		  </Text>
	  </Box>
  );
}

export default Card;
