import React from 'react';
import {
	Box,
	chakra,
	Container,
	Text,
	HStack,
	VStack,
	Flex,
	useColorModeValue,
} from '@chakra-ui/react';
import "./animation.css"
import '@fontsource/bebas-neue';

const timeline = [
	{
		id: 1,
		categories: ['Consultation'],
		title: 'First consultation',
		date: 'March 30, 2022',
	},
	{
		id: 2,
		categories: ['Document'],
		title: 'Mammography',
		date: 'July 30, 2022',
	},
	{
		id: 3,
		categories: ['Day care'],
		title: 'CT - Day care',
		date: 'September 30, 2022',
	},
	{
		id: 4,
		categories: ['Day care'],
		title: 'CT - Day care',
		date: 'October 10, 2022',
	},
	{
		id: 5,
		categories: ['Day care'],
		title: 'CT - Day care',
		date: 'January 5, 2023',
	},
	{
		id: 6,
		categories: ['Day care'],
		title: 'CT - Day care',
		date: 'February 10, 2023',
	},
	{
		id: 7,
		categories: ['Announcement'],
		title: 'Announcement',
		date: 'Avril 4, 2023',
	},
	{
		id: 8,
		categories: ['Surgery'],
		title: 'Surgery',
		date: 'August 4, 2023',
	}
];

const Timeline = () => {
	const [hoveredCardId, setHoveredCardId] = React.useState(null);

	return (
		<Container
			maxWidth="100%"
			p={{ base: 2, sm: 10 }}
			bg="transparent"
			rounded="md"
			ml="12px"
		>
			<Text fontSize="27" mb="8" color="#759284" fontFamily="Bebas neue, sans-serif">
				TIMELINE
			</Text>
			{[...timeline].reverse().map((timelineItem, index) => (
				<Flex key={index} mb="10px" alignItems="start">
					<LineWithDot isHovering={hoveredCardId === timelineItem.id}
					isLast={index === 0} />
					<Card {...timelineItem}
						isHovering={hoveredCardId === timelineItem.id}
						onMouseEnter={() => setHoveredCardId(timelineItem.id)}
						onMouseLeave={() => setHoveredCardId(null)} />
				</Flex>
			))}
		</Container>
	);
};

const Card = ({ title, categories, date, isHovering, onMouseEnter, onMouseLeave }) => {

	return (
		<HStack
			w="90%"
			pt="12px"
			pl="16px"
			pb="3px"
			borderRadius="20px"
			alignSelf="baseline"
			bg='white'
			boxShadow="0px 3px 7px rgba(0, 0, 0, 0.09)"
			mt="-5px"
			ml="10px"
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			className={isHovering ? "cardHover" : ""}
		>
			<Box w="100%" pl="16px">
				<HStack spacing={2} mb={1}>
					{categories.map((cat) => (
						<Text fontSize="sm" color="#556084" key={cat}>
							{cat}
						</Text>
					))}
					<Text fontSize="sm" color="#759284" fontWeight="bold">
						- {date}
					</Text>
				</HStack>
				<Text fontSize="m" fontWeight="bold" color={isHovering ? "#759284" : "#556084"}>
					{title}
				</Text>
			</Box>
		</HStack>
	);
};

const LineWithDot = ({ isHovering, isLast, onMouseEnter, onMouseLeave,}) => {
	return (
		<Flex pos="relative" alignItems="center" mr="40px">
			{!isLast && (
			<chakra.span
				position="absolute"
				left="50%"
				height="calc(100% + 40px)"
				border="1px dashed"
				borderColor={useColorModeValue('gray.200', 'gray.700')}
				top="-45px"
			></chakra.span>
			)}

			<Box
				w="20px"
				h="20px"
				border="1px"
				borderColor="rgba(152, 76, 248, 0.1)"
				borderRadius="16px"
				backgroundColor="#dde4e1"
				pos="relative"
				p="10px"
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				className={isHovering ? "dotHover" : ""}
			>
				<Box
					pos="absolute"
					top="50%"
					left="50%"
					transform="translate(-50%, -50%)"
					w="10px"
					h="10px"
					backgroundColor="#759284"
					borderRadius="30px"
					boxShadow="0px 3px 8px rgba(152, 76, 248, 0.3)"
				></Box>
			</Box>
		</Flex>
	);
};

export default Timeline;
