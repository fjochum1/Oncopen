import {
	Box,
	Grid,
	GridItem,
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
import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons';
import Timeline from "./components/Timeline"
import Summary from "./components/Summary"
import FirstConsultation from "../FirstConsultation"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import "@fontsource/inconsolata/800.css";
import Header from "./components/Header"
import { useState } from 'react';

const muiTheme = createTheme();

const Carepathway = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isFirstConsultationOpen, setFirstConsultationOpen] = useState(false);
	const backgroundHeader = '#b0bdbf';
	const bgProfile = '#e5ecec';
	return (
		<Box>
			<Header
				backgroundHeader={backgroundHeader}
				backgroundProfile={bgProfile}
				name={"Floriane Jochum"}
			/>
			<Box position="absolute" right="8" top="5" display="flex" alignItems="center" zIndex="10">
				<Menu>
					<MenuButton as={HamburgerIcon} boxSize={10} color="black" cursor="pointer" w="100%" h="100%">
						{/* You can optionally place a visually hidden label here for accessibility */}
						{/*<VisuallyHidden>Open Menu</VisuallyHidden>*/}
					</MenuButton>
					<MenuList>
						<MenuItem>Quick prescription</MenuItem>
						<MenuItem onClick={() => setFirstConsultationOpen(true)}>First consultation</MenuItem>
					</MenuList>
				</Menu>
			</Box>

			<Box w="100%" maxHeight="450px" mt="20px" borderRadius="20px" backgroundColor="white" boxShadow="0px 3px 7px rgba(0, 0, 0, 0.09)">
				<Text fontSize="20" ml="30px" mt="20px" pt="15px" color="black" fontWeight='bold' letterSpacing="tighter">
					Timeline
				</Text>
				<Box width="60px" height="8px" backgroundColor="rgba(99, 135, 118, 0.4)" mt="-11px" ml="37px" mb="-300px" />
				<ThemeProvider theme={muiTheme}>
					<Timeline />
				</ThemeProvider>
			</Box>
			<Modal isOpen={isFirstConsultationOpen} onClose={() => setFirstConsultationOpen(false)} size="xxl">
				<ModalOverlay />
				<ModalContent maxW="1100px">
					<ModalCloseButton />
					<ModalBody>
						<FirstConsultation />
					</ModalBody>
				</ModalContent>
			</Modal>
			<Box minHeight="615px" padding="4" width="50%" mt="15px" borderRadius="20px" backgroundColor="white" boxShadow="0px 3px 7px rgba(0, 0, 0, 0.09)">
				{/*<Box width="130px" height="3px" backgroundColor="black" mb="5px" ml="20px" />*/}
				<Text fontSize="20" color="black" fontFamily="Lato, sans-serif" fontWeight='bold' letterSpacing="tighter">
					Treatment summary
				</Text>
				<Box width="140px" height="8px" backgroundColor="rgba(99, 135, 118, 0.4)" mt="-9px" mb="27px" ml="10px" />
				<ThemeProvider theme={muiTheme}>
					<Summary />
				</ThemeProvider>
			</Box>
			<Flex direction="column" marginLeft="49.1%" position="absolute" top="445px" spacing={5}>
				<Box padding="4" mb="15px" mt="180px" width="535px" minHeight="300px" borderRadius="20px" backgroundColor="white" boxShadow="0px 3px 7px rgba(0, 0, 0, 0.09)">
					<Text fontSize="20" color="black" fontFamily="Lato, sans-serif" fontWeight='bold' letterSpacing="tighter">
						What's next ?
					</Text>
					<Box width="80px" height="8px" backgroundColor="rgba(99, 135, 118, 0.4)" mt="-9px" mb="25px" ml="10px" />
					<Text ml="2" fontSize="14" color="grey.600">
						Follow-up consultation in 3 months (in October 2023)
					</Text>
				</Box>
				<Box padding="4" width="535px" minHeight="300px" borderRadius="20px" backgroundColor="white" boxShadow="0px 3px 7px rgba(0, 0, 0, 0.09)">
					<Text fontSize="20" color="black" fontFamily="Lato, sans-serif" fontWeight='bold' letterSpacing="tighter">
						Warning
					</Text>
					<Box width="60px" height="8px" backgroundColor="rgba(99, 135, 118, 0.4)" mt="-9px" mb="27px" ml="6px" />
					<Text ml="2" fontSize="14" color="grey.600">
						Biology prescribed on March 25, 2023 - To retrieve
					</Text>
				</Box>
			</Flex>
		</Box>
	);
};

export default Carepathway;
