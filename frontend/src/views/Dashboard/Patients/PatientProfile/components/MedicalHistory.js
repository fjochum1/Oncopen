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


const MedicalHistory = ({ title }) => {
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
      
      {isSettingsOpen && (
        <SettingsMedicalHistory onClose={() => setIsSettingsOpen(false)}/>
      )}
    </Card>
  );
};

export default MedicalHistory;
