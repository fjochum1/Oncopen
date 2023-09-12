import {
	Flex,
	Grid,
	useColorModeValue,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button
} from "@chakra-ui/react";
import ProfileBgImage from "assets/img/BackgroundProfile.png";
import React, { useState, useEffect } from "react";
import { FaPenFancy } from "react-icons/fa";
import Header from "./components/Header";
import ProfileInformation from "./components/ProfileInformation";
import FinessInformation from "./components/FinessInformation";
import Settings from './settings';

// Importing the fetchUser function
import fetchCurrentUser from "../../../api/fetchCurrentUser.js";

function Profile() {
	const textColor = useColorModeValue("gray.700", "white");
	const bgProfile = useColorModeValue(
		"hsla(0,0%,100%,.8)",
		"linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)"
	);

	// State to hold user data
	const [userData, setUserData] = useState(null);

	const [isSettingsOpen, setIsSettingsOpen] = useState(false);

	// Fetch user data when the component is mounted using the fetchCurrentUser function
	useEffect(() => {
		async function fetchData() {
			const data = await fetchCurrentUser();
			setUserData(data);
		}
		fetchData();
	}, []);

	const openSettingsModal = () => {
		setIsSettingsOpen(true);
	};

	const closeSettingsModal = () => {
		setIsSettingsOpen(false);
	};

	return (
		<Flex direction='column'>
			{userData && (
				<>
					<Header
						backgroundHeader={ProfileBgImage}
						backgroundProfile={bgProfile}
						firstname={userData.firstname || "N/A"}
						name={userData.name || "N/A"}
						email={userData.email || "N/A"}
						tabs={[
							{
								name: "SETTINGS",
								icon: <FaPenFancy w='100%' h='100%' />,
								action: openSettingsModal
							}
						]}
					/>
					<Grid templateColumns={{ sm: "1fr", xl: "repeat(2, 1fr)" }} gap='22px'>
						<ProfileInformation
							title={"Profile Information"}
							speciality={userData.speciality || "N/A"}
							titre={userData.titre || "N/A"}
							firstname={userData.firstname || "N/A"}
							name={userData.name || "N/A"}
							username={userData.username || "N/A"}
							mobile={userData.mobile || "N/A"}
							email={userData.email || "N/A"}
							RPPS={userData.RPPS || "N/A"}
						/>
						<FinessInformation
							title={"Institution Information"}
							nameInstitution={userData.nameInstitution || "N/A"}
							address={userData.address || "N/A"}
							postalCode={userData.postalCode || "N/A"}
							city={userData.city || "N/A"}
							country={userData.country || "N/A"}
							nbInstitution={userData.nbInstitution || "N/A"}
						/>
					</Grid>
					<Modal isOpen={isSettingsOpen} onClose={closeSettingsModal} size="xl">
						<ModalOverlay />
						<ModalContent maxW="1100px">
							<ModalCloseButton />
							<ModalBody>
								<Settings closeSettingsModal={closeSettingsModal} />
							</ModalBody>
							<ModalFooter>
								<Button variant="ghost" onClick={closeSettingsModal}>Close</Button>
							</ModalFooter>
						</ModalContent>
					</Modal>
				</>
			)}
		</Flex>
	);
}

export default Profile;
