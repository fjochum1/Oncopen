// Chakra imports
import { Flex, Icon, Link, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React from "react";

const FinessInformation = ({
  title,
  nameInstitution,
  address,
  postalCode,
  city,
  country,
  nbInstitution
}) => {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Card p='16px' my={{ sm: "24px", xl: "0px" }}>
      <CardHeader p='12px 5px' mb='12px'>
        <Text fontSize='lg' color={textColor} fontWeight='bold'>
          {title}
        </Text>
      </CardHeader>
      <CardBody px='5px'>
		<Flex direction='column'>
		  <Text fontSize='md' color='gray.500' fontWeight='400' mb='30px'>
            {nameInstitution}
          </Text>
          <Flex align='center' mb='18px'>
            <Text fontSize='md' color={textColor} fontWeight='bold' me='10px'>
              Address:{" "}
            </Text>
            <Text fontSize='md' color='gray.500' fontWeight='400'>
              {address}
            </Text>
          </Flex>
		  <Flex align='center' mb='18px'>
            <Text fontSize='md' color={textColor} fontWeight='bold' me='10px'>
              Postal code:{" "}
            </Text>
            <Text fontSize='md' color='gray.500' fontWeight='400'>
              {postalCode}
            </Text>
          </Flex>
          <Flex align='center' mb='18px'>
            <Text fontSize='md' color={textColor} fontWeight='bold' me='10px'>
              City:{" "}
            </Text>
            <Text fontSize='md' color='gray.500' fontWeight='400'>
              {city}
            </Text>
          </Flex>
          <Flex align='center' mb='18px'>
            <Text fontSize='md' color={textColor} fontWeight='bold' me='10px'>
              Country:{" "}
            </Text>
            <Text fontSize='md' color='gray.500' fontWeight='400'>
              {country}
            </Text>
          </Flex>
		  <Flex align='center' mb='18px'>
            <Text fontSize='md' color={textColor} fontWeight='bold' me='10px'>
              Institution number:{" "}
            </Text>
            <Text fontSize='md' color='gray.500' fontWeight='400'>
              {nbInstitution}
            </Text>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default FinessInformation;
