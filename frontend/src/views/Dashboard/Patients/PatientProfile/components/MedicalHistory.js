// Chakra imports
import {
  Avatar,
  Button,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
import avatar4 from "assets/img/avatars/avatar4.png";
import avatar5 from "assets/img/avatars/avatar5.png";
import avatar6 from "assets/img/avatars/avatar6.png";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React from "react";
import { useDisclosure } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";


const Conversations = ({ title, titleHistory, details }) => {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Card p='16px'>
      <CardHeader p='12px 5px' mb='12px'>
        <Text fontSize='lg' color={textColor} fontWeight='bold'>
          {title}
        </Text>
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
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
    </Card>
  );
};

export default Conversations;
