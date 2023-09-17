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
  age
}) => {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");


  
  return (
    <Card p='16px' my={{ sm: "24px", xl: "0px" }}>
      <CardHeader p='12px 5px' mb='12px'>
        <Text fontSize='lg' color={textColor} fontWeight='bold'>
          {title}
        </Text>
        <Button
        p='0px'
        bg='transparent'
        w='16px'
        h='16px'
        variant='no-hover'
        ml='auto' // Aligne le bouton à droite
     
        
      >
      <Icon as={FaPencilAlt} />
     
      </Button>
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
        </Flex>
      </CardBody>
    </Card>
  );
};

export default ProfileInformation;
