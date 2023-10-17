import { Progress, Text, Box, Flex} from '@chakra-ui/react';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";

const BarPerformanceStatus = ({ value }) => {
	return (
		<Card p='28px 10px 16px 0px' mb={{ sm: "26px", lg: "0px" }} boxShadow="0px 3px 7px rgba(0, 0, 0, 0.09)">
			<CardHeader mb='15px' pl='22px'>
				<Flex direction='column' alignSelf='flex-start'>
					<Text fontSize='lg' color="black" fontWeight='bold'>
						Performance Status
					</Text>
				</Flex>
			</CardHeader>
			<Box w='90%' ml='10px' ps='8px'>
				<Progress
					value={value * 25}
					bg="rgba(99, 135, 118, 0.2)"
					size="lg"
					borderRadius="md"
				/>
				<Flex justifyContent="space-between" mt="2">
					{["0", "1", "2", "3", "4"].map((num, index) => (
						<Text
							key={index}
							color="black"
							fontWeight={value == num ? "bold" : "normal"}
							fontSize={value == num ? "18" : "14"}
						>
							{num}
						</Text>
					))}
				</Flex>
			</Box>
			<Flex justifyContent="flex-end" mt='10px' mb='6px'>
				<Text fontSize='12px' color="gray.400">
					Last updated on 20 February 2023
				</Text>
			</Flex>
		</Card>
	);
};

export default BarPerformanceStatus;
