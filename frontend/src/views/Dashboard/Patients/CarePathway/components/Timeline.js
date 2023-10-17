import React, { useRef, useEffect, useState } from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { Paper, Typography } from '@mui/material';
import '@fontsource/raleway';
import '@fontsource/lato'
import '@fontsource/inconsolata';

const timeline = [
	{
		id: 19,
		categories: ['Consultation'],
		title: 'Follow-up Cs',
		date: 'August 4, 2023',
	},
	{
		id: 18,
		categories: ['Event'],
		title: 'Remission',
		date: 'August 4, 2023',
	},
	{
		id: 17,
		categories: ['Day care'],
		title: 'C3 - Day care',
		date: 'February 10, 2023',
	},
	{
		id: 16,
		categories: ['Complication'],
		title: 'Febrile Neutropenia',
		date: 'October 10, 2022',
	},
	{
		id: 15,
		categories: ['Day care'],
		title: 'C2 - Day care',
		date: 'January 5, 2023',
	},
	{
		id: 14,
		categories: ['Day care'],
		title: 'C1 - Day care',
		date: 'October 10, 2022',
	},
	{
		id: 13,
		categories: ['Event'],
		title: 'Adjuvant CT',
		date: 'August 7, 2023',
	},
	{
		id: 12,
		categories: ['Consultation'],
		title: 'Cs post-surgery',
		date: 'Avril 4, 2023',
	},
	{
		id: 11,
		categories: ['Complication'],
		title: 'Hematoma',
		date: 'October 10, 2022',
	},
	{
		id: 10,
		categories: ['Event'],
		title: 'Surgery',
		date: 'August 4, 2023',
	},
	{
		id: 9,
		categories: ['Consultation'],
		title: 'CS during treatment',
		date: 'Avril 4, 2023',
	},
	{
		id: 8,
		categories: ['Day care'],
		title: 'C3 - Day care',
		date: 'February 10, 2023',
	},
	{
		id: 7,
		categories: ['Day care'],
		title: 'C2 - Day care',
		date: 'January 5, 2023',
	},
	{
		id: 6,
		categories: ['Day care'],
		title: 'C1 - Day care',
		date: 'October 10, 2022',
	},
	{
		id: 5,
		categories: ['Event'],
		title: 'NACT',
		date: 'July 31, 2022',
	},
	{
		id: 4,
		categories: ['RCP'],
		title: 'RCP',
		date: 'September 30, 2022',
	},
	{
		id: 3,
		categories: ['Event'],
		title: 'Diagnosis',
		date: 'July 31, 2022',
	},
	{
		id: 2,
		categories: ['Consultation'],
		title: 'First Cs',
		date: 'March 30, 2022',
	},
	{
		id: 1,
		categories: ['Document'],
		title: 'Mammography',
		date: 'July 30, 2022',
	},

];

export default function BasicTimeline() {
	const [timelineWidth, setTimelineWidth] = useState(0);
	const timelineRef = useRef(null);

	useEffect(() => {
		if (timelineRef.current) {
			const width = timelineRef.current.getBoundingClientRect().width / 4;
			setTimelineWidth(width);
		}
	}, [timelineRef]);

	const getTimelineDotStyles = (item) => {
		if (item.categories.includes('Event')) {
			return {
				position: 'relative',
				'&:before, &:after': {
					content: '""',
					width: '80px',
					height: '80px',
					borderRadius: '50%',
					position: 'absolute',
					//top: '-25px',
					transition: 'all 0.33s ease-out 0s',
					mr: '20px',
					ml: '-30px',
					mt: '-40px'
				},
				'&:before': {
					background: '#fff',
					border: '2px solid #282828',
					left: '-3px',
				},
				'&:after': {
					border: '2px solid #c6c6c6',
					left: '3px',
				},
				'&:hover:before': {
					//left: '3px'
				},
				'&:hover:after': {
					//left: '-3px',
					borderColor: "rgba(99, 135, 118, 0.4)",
					border: '7px solid rgba(99, 135, 118, 0.4)'
				}
			}
		} else if (item.categories.includes('Complication')) {
			return {
				backgroundColor: "#282828",
				width: 0,
				height: 0,
				borderRadius: '0%',
				border: '5px solid transparent',
				borderBottomColor: "#282828",
				transform: 'rotate(45deg)',
				'&:hover': {
					borderColor: "#282828",
				}
			}
		} else {
			return {
				transform: "rotate(-90deg)",
				width: 30,
				height: 30,
				border: "1px solid",
				borderRadius: "16px",
				//backgroundColor: "#dde4e1",
				backgroundColor: "#28282B",
				position: 'relative',
				'&:before': {
					content: '""',
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: 24,
					height: 24,
					//backgroundColor: "#759284",
					backgroundColor: "white",
					borderRadius: "30px"
				},
				'&:hover': {
					//width: 35,
					//height: 35,
					//borderRadius: "30px",
					//backgroundColor: "white",
					border: "4px",
					borderColor: "rgba(99, 135, 118, 0.7)",
					transition: 'all 0.33s ease-out 0s'
				}
			}
		}
	}

	const getTimelineContentStyles = (item, position) => {
		if (item.categories.includes('Event')) {
			return {
				marginLeft: position === "left" ? "40px" : "0px",
				marginRight: position === "right" ? "40px" : "0px",
			};
		}
		else if (item.categories.includes('Complication')) {
			return {
				display: "none",
				marginLeft: position === "left" ? "-30px" : "0px",
				marginRight: position === "right" ? "-30px" : "0px",
				backgroundColor: "transparent",
				boxShadow: "none",
				//'&:hover': {
				//	display: "block",
				//}
			};
		} else {
			return {
				marginLeft: position === "left" ? "-30px" : "0px",
				marginRight: position === "right" ? "-30px" : "0px",
				backgroundColor: "transparent",
				boxShadow: "none",
			};
		}
	}

	const getTimelineConnectorHeight = (currentIndex, timeline) => {
		const currentIsEvent = timeline[currentIndex].categories.includes('Event');
		const nextIsEvent = (currentIndex < timeline.length - 1) && timeline[currentIndex + 1].categories.includes('Event');
		return (currentIsEvent || nextIsEvent) ? 65 : 35;
	}

	return (
		<div style={{ overflowX: 'scroll', overflowY: 'hidden' }}>
			<Timeline
				ref={timelineRef}
				position="alternate"
				sx={{
					transform: `translateX(${timelineWidth}px) translateY(-${timelineWidth}px) rotate(90deg)`,
					//'& .MuiTimelineItem-root:hover .MuiTimelineDot-root': {
					//	width: 30,
					//	height: 30,
					//	borderRadius: "30px",
					//	border: "2px",
					//	transition: 'all 0.33s ease-out 0s'
					//},
					'& .MuiTimelineItem-root:hover .MuiPaper-root': {
						transform: "scale(1.2) rotate(-90deg)",
					},
					'& .MuiTimelineConnector-root': {
						//borderStyle: 'dashed',
						//backgroundColor: 'transparent',
						borderColor: '#28282B',
						color: '#28282B',
						border: "2px",
						borderRadius: "30px",
					},
				}}
				align="alternate">
				{timeline.map((item, index) => {
					const position = index % 2 === 0 ? "left" : "right";
					return (
						<TimelineItem key={item.id}
							sx={item.categories.includes('Event') && {
								'&:hover .MuiTimelineDot-root:after': {
									left: '-3px',
									border: '7px solid rgba(99, 135, 118, 0.4)'
								},
								'&:hover .MuiPaper-root': {
									backgroundColor: 'rgba(99, 135, 118, 0.2)',
									transform: "scale(1.2) rotate(-90deg)"
								}
							}}>
							<TimelineSeparator>
								<TimelineDot sx={getTimelineDotStyles(item)} />
								{timeline[timeline.length - 1].id !== item.id &&
									<TimelineConnector sx={{ height: getTimelineConnectorHeight(index, timeline) }} />}
							</TimelineSeparator>
							<TimelineContent sx={{ textAlign: "left" }}>
								<Paper sx={{
									...getTimelineContentStyles(item, position),
									display: "inline-block",
									transform: "rotate(-90deg)",
									textAlign: "center",
									minWidth: 50,
									padding: 1
								}}>
									<Typography color="black" variant="body2" fontFamily='Lato, sans-serif' fontWeight='bold'>{item.date}</Typography>
									<Typography
										variant="body1"
									>
										{item.title}
									</Typography>
								</Paper>
							</TimelineContent>
						</TimelineItem>
					);
				})}
			</Timeline>
		</div>
	);
}


//import React from 'react';
//import {
//	Box,
//	chakra,
//	Container,
//	Text,
//	HStack,
//	VStack,
//	Flex,
//	useColorModeValue,
//} from '@chakra-ui/react';
//import "./animation.css"
//import '@fontsource/bebas-neue';

//const timeline = [
//	{
//		id: 1,
//		categories: ['Consultation'],
//		title: 'First consultation',
//		date: 'March 30, 2022',
//	},
//	{
//		id: 2,
//		categories: ['Document'],
//		title: 'Mammography',
//		date: 'July 30, 2022',
//	},
//	{
//		id: 3,
//		categories: ['Day care'],
//		title: 'CT - Day care',
//		date: 'September 30, 2022',
//	},
//	{
//		id: 4,
//		categories: ['Day care'],
//		title: 'CT - Day care',
//		date: 'October 10, 2022',
//	},
//	{
//		id: 5,
//		categories: ['Day care'],
//		title: 'CT - Day care',
//		date: 'January 5, 2023',
//	},
//	{
//		id: 6,
//		categories: ['Day care'],
//		title: 'CT - Day care',
//		date: 'February 10, 2023',
//	},
//	{
//		id: 7,
//		categories: ['Announcement'],
//		title: 'Announcement',
//		date: 'Avril 4, 2023',
//	},
//	{
//		id: 8,
//		categories: ['Surgery'],
//		title: 'Surgery',
//		date: 'August 4, 2023',
//	}
//];

//const Timeline = () => {
//	const [hoveredCardId, setHoveredCardId] = React.useState(null);

//	return (
//		<Container
//			maxWidth="100%"
//			p={{ base: 2, sm: 10 }}
//			bg="transparent"
//			rounded="md"
//			ml="12px"
//			//overflow="auto"
//		>
//			<Text fontSize="27" mb="8" color="#759284" fontFamily="Bebas neue, sans-serif">
//				TIMELINE
//			</Text>
//			<HStack spacing={4}>
//			{[...timeline].reverse().map((timelineItem, index) => (
//					<VStack key={index} alignItems="center">
//						{index % 2 === 0 ? (
//							<>
//								<Card {...timelineItem}
//									index={index}
//									isHovering={hoveredCardId === timelineItem.id}
//									onMouseEnter={() => setHoveredCardId(timelineItem.id)}
//									onMouseLeave={() => setHoveredCardId(null)} />
//								<LineWithDot isHovering={hoveredCardId === timelineItem.id}
//									isLast={index === 0} />
//							</>
//						) : (
//							<>
//								<LineWithDot isHovering={hoveredCardId === timelineItem.id}
//									isLast={index === 0} />
//								<Card {...timelineItem}
//                                    isHovering={hoveredCardId === timelineItem.id}
//                                    onMouseEnter={() => setHoveredCardId(timelineItem.id)}
//                                    onMouseLeave={() => setHoveredCardId(null)} />
//							</>
//						)}
//					</VStack>
//				))}
//			</HStack>
//		</Container>
//	);
//};

//const Card = ({ title, categories, date, isHovering, onMouseEnter, onMouseLeave, index }) => {
//    return (
//        <HStack
//            w="90%"
//            pl="6px"
//            borderRadius="20px"
//            bg='white'
//            boxShadow="0px 3px 7px rgba(0, 0, 0, 0.09)"
//            ml="20px"
//			mb={(index==0 ? "40px" : "-80px")}
//			mt={(index==0 ? "40px" : "-80px")}
//            onMouseEnter={onMouseEnter}
//            onMouseLeave={onMouseLeave}
//            className={isHovering ? "cardHover" : ""}
//        >
//            <Box w="100%">
//                <Text fontSize="16" color="#759284" fontWeight="bold">
//                    {date}
//                </Text>
//                <Text fontSize="16" fontWeight="bold" color={isHovering ? "#759284" : "#556084"}>
//                    {title}
//                </Text>
//            </Box>
//        </HStack>
//    );
//};

//const LineWithDot = ({ isHovering, isLast }) => {
//    return (
//        <Flex pos="relative" justifyContent="center" w="100px" alignItems="center" h="200px">
//            {!isLast && (
//                <chakra.span
//                    position="absolute"
//                    top="50%"
//                    width="calc(100% + 40px)"
//                    border="1px dashed"
//                    borderColor={useColorModeValue('gray.200', 'gray.700')}
//                    left="-45px"
//                ></chakra.span>
//            )}
//            <Box
//                w="20px"
//                h="20px"
//                border="1px"
//                borderColor="rgba(152, 76, 248, 0.1)"
//                borderRadius="16px"
//                backgroundColor="#dde4e1"
//                pos="relative"
//                p="10px"
//                className={isHovering ? "dotHover" : ""}
//            >
//                <Box
//                    pos="absolute"
//                    top="50%"
//                    left="50%"
//                    transform="translate(-50%, -50%)"
//                    w="10px"
//                    h="10px"
//                    backgroundColor="#759284"
//                    borderRadius="30px"
//                    boxShadow="0px 3px 8px rgba(152, 76, 248, 0.3)"
//                ></Box>
//            </Box>
//        </Flex>
//    );
//};

//export default Timeline;
