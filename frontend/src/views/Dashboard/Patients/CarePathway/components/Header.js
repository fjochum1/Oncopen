import {
  Box,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

const Header = ({
  name,
}) => {
  const textColor = useColorModeValue("gray.700", "white");
  const borderProfileColor = useColorModeValue(
    "white",
    "rgba(255, 255, 255, 0.31)"
  );
  const emailColor = useColorModeValue("gray.400", "gray.300");
  return (
    <Box
		ml="-22px"
		mt = "50px"
		mb={{ sm: "80px", md: "80px", xl: "80px" }}
		borderRadius='15px'
		px='0px'
		display='flex'
		flexDirection='column'
		justifyContent='center'
		boxShadow="0px 3px 7px rgba(0, 0, 0, 0.09)"
		align='center'>
        <Flex
          direction={{ sm: "column", md: "row" }}
          mx='1.5rem'
          h="130px"
          w={{ sm: "85%", xl: "90%" }}
          justifyContent={{ sm: "center", md: "space-between" }}
          align='center'
          backdropFilter='saturate(200%) blur(50px)'
          position='absolute'
		  bg="white"
          boxShadow="0px 3px 7px rgba(0, 0, 0, 0.09)"
          p='24px'
          borderRadius='20px'
          >
          <Flex
            align='center'
            mb={{ sm: "10px", md: "0px" }}
            direction={{ sm: "column", md: "row" }}
            w={{ sm: "100%" }}
            textAlign={{ sm: "center", md: "start" }}>
            <Flex direction='column' maxWidth='100%' my={{ sm: "14px" }}>
              <Text
                fontSize={{ sm: "lg", lg: "xl" }}
                color={textColor}
                fontWeight='bold'
                ms={{ sm: "8px", md: "0px" }}>
                {name}
              </Text>
			  <Box width="140px" height="8px" backgroundColor="rgba(99, 135, 118, 0.4)" mt="-11px" mb="10px" ml="10px" />
              <Text
                fontSize={{ sm: "sm", md: "md" }}
                color={emailColor}
                fontWeight='semibold'>
                Breast cancer T1N0M0 RH+ HER+
              </Text>
            </Flex>
          </Flex>
        </Flex>
    </Box>
  );
};

export default Header;
