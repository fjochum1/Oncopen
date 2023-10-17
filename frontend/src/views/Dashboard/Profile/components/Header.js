import {
	Box,
	Button,
	Flex,
	Text,
	useColorModeValue,
  } from "@chakra-ui/react";
  import React from "react";

  const Header = ({
	backgroundProfile,
	firstname,
	name,
	email,
	tabs,
  }) => {
	const textColor = useColorModeValue("gray.700", "white");
	const borderProfileColor = useColorModeValue(
	  "white",
	  "rgba(255, 255, 255, 0.31)"
	);
	//const borderProfileColor = "#c95600";
	const emailColor = useColorModeValue("gray.400", "gray.300");

	return (
	  <Box
		mt = "30px"
		mb={{ sm: "50px", md: "50px", xl: "45px" }}
		borderRadius='15px'
		px='0px'
		display='flex'
		flexDirection='column'
		justifyContent='center'
		align='center'>
		<Flex
		  direction={{ sm: "column", md: "row" }}
		  mx='1.5rem'
		  maxH='330px'
		  w={{ sm: "90%", xl: "95%" }}
		  justifyContent={{ sm: "center", md: "space-between" }}
		  align='center'
		  backdropFilter='saturate(200%) blur(50px)'
		  boxShadow='0px 2px 5.5px rgba(0, 0, 0, 0.02)'
		  border='2px solid'
		  borderColor={borderProfileColor}
		  bg={backgroundProfile}
		  p='24px'
		  borderRadius='20px'>
		  <Flex
			align='center'
			direction={{ sm: "column", md: "row" }}
			w={{ sm: "100%" }}
			textAlign={{ sm: "center", md: "start" }}>
			<Flex direction='column' maxWidth='100%' my={{ sm: "14px" }}>
			  <Text
				fontSize={{ sm: "20", lg: "22" }}
				color={textColor}
				fontWeight='bold'
				ms={{ sm: "8px", md: "0px" }}>
				{firstname} {name}
			  </Text>
			  <Box width="140px" height="8px" backgroundColor="rgba(99, 135, 118, 0.4)" mt="-11px" mb="10px" ml="10px" />
			  <Text
				fontSize={{ sm: "sm", md: "md" }}
				color={emailColor}
				fontWeight='semibold'>
				{email}
			  </Text>
			</Flex>
		  </Flex>
		  <Flex
			direction={{ sm: "column", lg: "row" }}
			w={{ sm: "100%", md: "50%", lg: "auto" }}>
			<Button p='0px' bg='transparent' _hover={{ bg: "none" }} onClick={tabs[0].action}>
			  <Flex
				align='center'
				w={{ sm: "100%", lg: "135px" }}
				bg='hsla(0,0%,100%,.3)'
				borderRadius='15px'
				justifyContent='center'
				py='10px'
				boxShadow='inset 0 0 1px 1px hsl(0deg 0% 100% / 90%), 0 20px 27px 0 rgb(0 0 0 / 5%)'
				border='1px solid gray.200'
				cursor='pointer'>
				{tabs[0].icon}
				<Text
				  fontSize='xs'
				  color={textColor}
				  fontWeight='bold'
				  ms='6px'>
				  {tabs[0].name}
				</Text>
			  </Flex>
			</Button>
		  </Flex>
		</Flex>
	  </Box>
	);
  };

  export default Header;
