// Chakra imports
import { Flex, Icon, Link, Text, useColorModeValue , Button} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React from "react";
import { FaPencilAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import UpdatePatientModal from "../../PatientRecord/Components/updatePatientModal";

const ProfileInformation = ({
  title,
  description,
  firstName,
  lastName,
  sex,
  dateOfBirth,
  
}) => {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const [age, setAge] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // État pour contrôler l'ouverture du modal

  const handleEditClick = () => {
    // Lorsque le bouton crayon est cliqué, ouvrez le modal
    setIsModalOpen(true);
  };

  useEffect(() => {
    // Calculate the age based on date of birth and current date
    
      const [day, month, year] = dateOfBirth.split('/');

      const birthDate = new Date(year, month - 1, day);
      const currentDate = new Date();
      const ageDiff = currentDate - birthDate;
      const ageDate = new Date(ageDiff);
      const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);

      setAge(calculatedAge);
    
  }, [dateOfBirth]);
  
  return (
    <div>
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
        onClick={handleEditClick} // Appel du gestionnaire d'événements au clic 
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
              {firstName}
            </Text>
          </Flex>
          <Flex align='center' mb='18px'>
            <Text fontSize='md' color={textColor} fontWeight='bold' me='10px'>
              Lastname:{" "}
            </Text>
            <Text fontSize='md' color='gray.500' fontWeight='400'>
              {lastName}
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
            {age !== null ? `${age} years` : "Age unknown"} 
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
    {isModalOpen && ( // Affichez le modal si isModalOpen est true
    <UpdatePatientModal onClose={() => setIsModalOpen(false)} />
  )}
  </div>
  );
};

export default ProfileInformation;
