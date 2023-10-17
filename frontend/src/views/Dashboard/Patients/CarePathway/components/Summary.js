import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { Typography, Paper } from '@mui/material';
import '@fontsource/muli';

const timeline = [
	{
		id: 1,
		categories: ['Chemotherapy'],
		title: 'Anthracyclines',
		complication: '',
		date: 'From March 30, 2022 to July 30, 2022',
	},
	{
		id: 2,
		categories: ['Surgery'],
		title: 'Total mastectomy',
		complication: 'Hematoma',
		date: 'August 4, 2022',
	},
	{
		id: 3,
		categories: ['Chemotherapy'],
		title: 'Taxanes',
		complication: 'Febrile neutropenia',
		date: 'From September 30, 2022 to February 10, 2023',
	}
];

const getTimelineDotStyles = (item) => {
	return {
		position: 'relative',
		'&:before, &:after': {
			content: '""',
			width: '20px',
			height: '20px',
			borderRadius: '50%',
			position: 'absolute',
			//top: '-25px',
			transition: 'all 0.33s ease-out 0s',
			//mr: '20px',
			ml: '-4.5px',
			mt: '-10px'
		},
		'&:before': {
			background: '#fff',
			border: '2px solid #232323',
			left: '-3px',
		},
		'&:after': {
			border: '2px solid #c6c6c6',
			left: '3px',
		},
		'&:hover:before': {
			left: '3px'
		},
		'&:hover:after': {
			left: '-3px',
			border: '3px solid #F0E2D5'
		}
	}
}

export default function Summary() {
	return (
		<Timeline position="alternate-reverse">
			{timeline.map((item, index) => (
				<TimelineItem key={item.id}
					sx={{
						'&:hover .MuiTimelineDot-root:after': {
							left: '-3px',
							border: '2px solid #e7cfc5'
						},
						'&:hover .MuiPaper-root': {
							backgroundColor: 'rgba(240, 226, 213, 0.3)',
							transform: "scale(1.1)"
						}
					}}>
					<TimelineSeparator>
						<TimelineDot sx={getTimelineDotStyles(item)} />
						<TimelineConnector
							style={{
								width: "3px",
								height: "80px",
								backgroundColor: '#c6c6c6'
							}}
						/>
					</TimelineSeparator>
					<TimelineContent>
						<Paper sx={{ padding: '20px' }}>
							<Typography color="black" fontWeight="bold" fontFamily="Muli, sans-serif">
								{item.title}
							</Typography>
							<Typography color="#759284" fontFamily="Muli, sans-serif">
								{item.date}
							</Typography>
							{item.complication && (
								<Typography color="#660000" fontSize="12px" fontFamily="Muli, sans-serif">
									{item.complication}
								</Typography>
							)}
						</Paper>
					</TimelineContent>
				</TimelineItem>
			))}
		</Timeline>
	);
}
