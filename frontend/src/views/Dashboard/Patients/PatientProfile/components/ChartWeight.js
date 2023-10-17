// Chakra imports
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import React from "react";

export const lineChartData = [
	{
		name: 'Weight',
		data: [
			{ x: '2023-01-01', y: 62 },
			{ x: '2023-01-10', y: 60.5 },
			{ x: '2023-01-20', y: 59 },
			{ x: '2023-02-01', y: 58.5 },
			{ x: '2023-02-10', y: 58 },
			{ x: '2023-02-20', y: 58.2 },
		],
	},
];

export const lineChartOptions = {
	colors: ["rgba(99, 135, 118, 0.4)"],
	chart: {
		id: 'area-weight',
		toolbar: {
			show: false,
		},
		zoom: {
			enabled: false,
		},
	},
	dataLabels: {
		enabled: false,
	},
	stroke: {
		curve: 'smooth',
	},
	xaxis: {
		type: 'datetime',
	},
	yaxis: {
		title: {
			text: 'Weight (Kg)',
		},
	},
	tooltip: {
		x: {
			format: 'dd MMM yyyy',
		},
	},
};

export const ChartWeight = ({ title, percentage, chart }) => {
	const textColor = useColorModeValue("gray.700", "white");
	return (
		<Card p='28px 10px 16px 0px' mb={{ sm: "26px", lg: "0px" }} boxShadow="0px 3px 7px rgba(0, 0, 0, 0.09)">
			<CardHeader mb='5px' pl='22px'>
				<Flex direction='column' alignSelf='flex-start'>
					<Text fontSize='lg' color={textColor} fontWeight='bold'>
						{title}
					</Text>
				</Flex>
			</CardHeader>
			<Box w='100%' h={{ sm: "300px" }} ps='8px'>
				{chart}
			</Box>
			<Flex justifyContent="flex-end" mt='10px' mb='6px'>
				<Text fontSize='12px' color="gray.400">
					Last updated on 20 February 2023
				</Text>
			</Flex>
		</Card>
	);
};

