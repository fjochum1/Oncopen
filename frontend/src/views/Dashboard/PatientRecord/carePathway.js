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

const milestones = [
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
  }
];

const Milestones = () => {
	return (
	  <Container
		maxWidth="50%"
		p={{ base: 2, sm: 10 }}
		bg="transparent"
		rounded="md"
		ml="12px"  // Adjusted for more left alignment
	  >
		{[...milestones].reverse().map((milestone, index) => (
		  <Flex key={index} mb="10px" alignItems="start">
			{/*<DividerContainer date={milestone.date} />*/}
			<LineWithDot />
			<Card {...milestone} />
		  </Flex>
		))}
	  </Container>
	);
  };

  const Card = (props) => {
	const { title, categories } = props;

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
	  >
		<Box w="100%" pl="16px">
		  <HStack spacing={2} mb={1}>
			{categories.map((cat) => (
			  <Text fontSize="sm" color="#556084" key={cat}>
				{cat}
			  </Text>
			))}
		  </HStack>
		  <Text fontSize="m" fontWeight="bold" color="#556084">
			{title}
		  </Text>
		</Box>
	  </HStack>
	);
  };

  const LineWithDot = () => {
	return (
	  <Flex pos="relative" alignItems="center" mr="40px">
		<chakra.span
		  position="absolute"
		  left="50%"
		  height="calc(100% + 50px)"
		  border="1px dashed"
		  borderColor={useColorModeValue('gray.200', 'gray.700')}
		  top="0px"
		></chakra.span>

		<Box
		  w="20px"
		  h="20px"
		  border="1px"
		  borderColor="rgba(152, 76, 248, 0.1)"
		  borderRadius="16px"
		  backgroundColor="#dde4e1"
		  pos="relative"
		  p="10px"
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

  const DividerContainer = (props) => {
	const { date } = props;
	const day = new Date(date).getDate();
	const month = new Date(date).toLocaleString('default', { month: 'short' });

	return (
	  <VStack
		mt="-7px"
		mr="20px"  // Reduced margin to move it more to the left
		alignItems="center"
		spacing={2}
	  >
		<Text fontWeight="700" color="#759284">{day}</Text>
		<Text color="#ded9e6">{month}</Text>
		<Divider />
	  </VStack>
	);
  };

  const Divider = () => {
	return (
	  <Box
		w="1px"
		h="100%"  // Adjust the height as needed
		bg="#e3e3e3"
		mt="12px"  // .dividerStyle paddingTop
	  />
	);
  };

  export default Milestones;
