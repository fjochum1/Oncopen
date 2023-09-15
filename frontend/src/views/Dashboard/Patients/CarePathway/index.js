import {
	Box,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
	Flex,
	Text,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	useDisclosure
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import Timeline from "./components/Timeline"
import FirstConsultation from "../FirstConsultation/index"

const Carepathway = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Box position="relative" width="50%">

			<Flex mt={7} justifyContent="flex-end">
				<Menu position="absolute" margin-left="4px">
					<MenuButton
						px={4}
						py={2}
						transition='all 0.2s'
						borderRadius='md'
						borderWidth='1px'
						color="white"
						fontWeight="bold"
						bg="#94aca4"
						_hover={{ bg: '#7a8f86' }}
						_focus={{ boxShadow: 'outline' }}
					>
						New <ChevronDownIcon />
					</MenuButton>
					<MenuList>
						<MenuItem onClick={onOpen}>First consultation</MenuItem>
						<MenuItem>Day care</MenuItem>
						<MenuDivider />
						<MenuItem>Add a document.</MenuItem>
					</MenuList>
				</Menu>
			</Flex>

			<Timeline />
			<Modal isOpen={isOpen} onClose={onClose} size="xxl">
				<ModalOverlay />
				<ModalContent maxW="1100px">
					<ModalCloseButton />
					<ModalBody>
						<FirstConsultation/>
					</ModalBody>
				</ModalContent>
			</Modal>
		</Box>
	);
};

export default Carepathway;
