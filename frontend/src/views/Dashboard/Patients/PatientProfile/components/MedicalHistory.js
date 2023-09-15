// Chakra imports
import {
  Avatar,
  Button,
  Icon,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { FaPencilAlt } from "react-icons/fa";
import SettingsMedicalHistory from './SettingsMedicalHistory'
import { useState } from "react";

// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React from "react";
import { useDisclosure } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";


const MedicalHistory = ({ title, titleHistory, details }) => {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const { isOpen, onOpen, onClose } = useDisclosure()

const [isSettingsOpen, setIsSettingsOpen] = useState(false);
const openSettings = () => {
  setIsSettingsOpen(true);
};




  return (
    <Card p='16px'>
      <CardHeader p='12px 5px' mb='12px' display='flex' justifyContent='space-between' alignItems='center'>
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
        onClick={openSettings}
        
      >
      <Icon as={FaPencilAlt} />
     
      </Button>

        
      </CardHeader>
      <CardBody px='5px'>
        <Flex direction='column' w='100%'>
          <Flex justifyContent='space-between' mb='21px'>
            <Flex align='center'>
              <Flex direction='column'>
                <Text fontSize='sm' color={textColor} fontWeight='bold'>
                  {titleHistory}
                </Text>
                <Text fontSize='xs' color='gray.500' fontWeight='400'>
                  {details.description}
                </Text>
              </Flex>     
    </Flex>
    <>
      <Button p='0px' bg='transparent' variant='no-hover' onClick={onOpen}>
      <Text
                fontSize='sm'
                fontWeight='600'
                color='teal.300'
                alignSelf='center'>
                DETAILS
              </Text>

      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
       
        <ModalContent maxW="1100px">
          <ModalHeader>Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Text fontSize='sm' color={textColor} fontWeight='bold'>
                  {titleHistory}
                </Text>
                <Text fontSize='xs' color='gray.500' fontWeight='400'>
                  {details.description}
        

                </Text>
          </ModalBody>
          <ModalFooter>
            <Button p='0px' bg='transparent' variant='no-hover' onClick={onClose}>
            <Text
                fontSize='sm'
                fontWeight='600'
                color='teal.300'
                alignSelf='center'>
                Close
              </Text>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
          </Flex>
        </Flex>
      </CardBody>
      {isSettingsOpen && (
        <SettingsMedicalHistory onClose={() => setIsSettingsOpen(false)}/>
      )}
    </Card>
  );
};

export default MedicalHistory;
