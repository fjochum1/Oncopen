// Chakra imports
import { Flex, Icon, Link, Text, useColorModeValue , Button} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React from "react";
import { FaPencilAlt } from "react-icons/fa";


const ProfileInformation = ({
  title,
  description,
  firstname,
  lastname,
  sex,
  dateOfBirth,
  age,
  address,
  city,
  postalCode,
  country,
  referringDoctor,
  generalDoctor
}) => {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");



  return (
    <Card p='16px' my={{ sm: "24px", xl: "0px" }} boxShadow="0px 3px 7px rgba(0, 0, 0, 0.09)">
      <CardHeader p='12px 5px'>
        <Text fontSize='lg' color={textColor} fontWeight='bold'>
          {title}
        </Text>
        {/*<Button
        p='0px'
        bg='transparent'
        w='16px'
        h='16px'
        variant='no-hover'
        ml='auto' // Aligne le bouton à droite


      >
      <Icon as={FaPencilAlt} />*/}

      {/*</Button>*/}
      </CardHeader>
      <CardBody px='5px'>
        <Flex direction='column'>
          <Text fontSize='md' color='gray.500' fontWeight='400' mb='30px'>
            {description}
          </Text>
          <Flex align='center' mb='18px'>
            <Text fontSize='md' color={textColor} fontWeight='bold' me='10px'>
              Firstname:{" "}
            </Text>
            <Text fontSize='md' color='gray.500' fontWeight='400'>
              {firstname}
            </Text>
          </Flex>
          <Flex align='center' mb='18px'>
            <Text fontSize='md' color={textColor} fontWeight='bold' me='10px'>
              Lastname:{" "}
            </Text>
            <Text fontSize='md' color='gray.500' fontWeight='400'>
              {lastname}
            </Text>
          </Flex>
          <Flex align='center' mb='18px'>
            <Text fontSize='md' color={textColor} fontWeight='bold' me='10px'>
              Date of birth:{" "}
            </Text>
            <Text fontSize='md' color='gray.500' fontWeight='400'>
              {dateOfBirth}
            </Text>
          </Flex>
          <Flex align='center' mb='18px'>
            <Text fontSize='md' color={textColor} fontWeight='bold' me='10px'>
               Age:{" "}
            </Text>
            <Text fontSize='md' color='gray.500' fontWeight='400'>
              {age} years
            </Text>
          </Flex>


          <Flex align='center' mb='18px'>
            <Text fontSize='md' color={textColor} fontWeight='bold' me='10px'>
              Sex:{" "}
            </Text>
            <Text fontSize='md' color='gray.500' fontWeight='400'>
              {sex}
            </Text>
          </Flex>

		  <Flex align='center' mb='18px'>
            <Text fontSize='md' color={textColor} fontWeight='bold' me='10px'>
              Address:{" "}
            </Text>
            <Text fontSize='md' color='gray.500' fontWeight='400'>
              9 rue des fleurs
            </Text>
          </Flex>


		  <Flex align='center' mb='18px'>
            <Text fontSize='md' color={textColor} fontWeight='bold' me='10px'>
              City:{" "}
            </Text>
            <Text fontSize='md' color='gray.500' fontWeight='400'>
              Ottrott
            </Text>
          </Flex>

		  <Flex align='center' mb='18px'>
            <Text fontSize='md' color={textColor} fontWeight='bold' me='10px'>
              Postal code:{" "}
            </Text>
            <Text fontSize='md' color='gray.500' fontWeight='400'>
              67210
            </Text>
          </Flex>

		<Flex align='center' mb='18px'>
            <Text fontSize='md' color={textColor} fontWeight='bold' me='10px'>
              Country:{" "}
            </Text>
            <Text fontSize='md' color='gray.500' fontWeight='400'>
              France
            </Text>
          </Flex>

		  <Flex align='center' mb='18px'>
            <Text fontSize='md' color={textColor} fontWeight='bold' me='10px'>
              Reffering doctor:{" "}
            </Text>
            <Text fontSize='md' color='gray.500' fontWeight='400'>
              Dr. Anne-Sophie HAMY
            </Text>
          </Flex>

		  <Flex align='center' mb='18px'>
            <Text fontSize='md' color={textColor} fontWeight='bold' me='10px'>
              General doctor:{" "}
            </Text>
            <Text fontSize='md' color='gray.500' fontWeight='400'>
              Dr. Patrick MULLER
            </Text>
          </Flex>
		  </Flex>
      </CardBody>
    </Card>
  );
};

export default ProfileInformation;
