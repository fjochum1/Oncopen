import {
	Flex,
	Box,
	Text,
	Input,
	InputGroup,
	InputLeftAddon,
	FormControl,
	FormLabel,
	Button,
	Grid
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

import AuthApi from "../../../api/auth";
import { useHistory } from "react-router-dom";

// Importing the fetchUser function
import fetchCurrentUser from "../../../api/fetchCurrentUser.js";

function Settings({closeSettingsModal}) {

	const history = useHistory();
	const [error, setError] = useState(null);

	// State to hold user data
	const [userData, setUserData] = useState(null);

	// Fetch user data when the component is mounted using the fetchCurrentUser function
	const [formState, setFormState] = useState({});

	useEffect(() => {
		async function fetchData() {
			const data = await fetchCurrentUser();
			setUserData(data);

			setFormState({
				titre: data.titre || "",
				mobile: data.mobile || "",
				email: data.email || "",
				RPPS: data.RPPS || "",
				speciality: data.speciality || "",
				nameInstitution: data.nameInstitution || "",
				address: data.address || "",
				postalCode: data.postalCode || "",
				city: data.city || "",
				country: data.country || "",
				nbInstitution: data.nbInstitution || ""
			});
		}
		fetchData();
	}, []);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormState(prevState => ({ ...prevState, [name]: value }));
	};

	async function handleSaveChanges() {
		AuthApi.Edit(formState).then(response => {
			if (response.data.success) {
				closeSettingsModal();
			} else {
				setError(response.data.msg)
			}
		}).catch(error => {
			if (error.response) {
				return setError(error.response.data.msg);
			}
			return setError("There has been an error.");
		})
	}

	return (
		<Flex direction="column" p={5}>
			{userData && (
				<>
					<Text fontSize="xl" mb={5}>
						Profile Settings
					</Text>
					<Grid templateColumns={{ sm: "1fr", xl: "repeat(2, 1fr)" }} gap={10}>
						<Box>
							<Text fontSize="lg" mb={4} fontWeight="bold">
								Prescriber Information
							</Text>

							{/* Non-editable fields */}
							<FormControl mb={4}>
								<FormLabel>Firstname</FormLabel>
								<Input
									type="text"
									value={userData.firstname || "N/A"} isReadOnly
									_focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }} />
							</FormControl>

							<FormControl mb={4}>
								<FormLabel>Name</FormLabel>
								<Input
									type="text"
									value={userData.name || "N/A"} isReadOnly
									_focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }} />
							</FormControl>

							<FormControl mb={4}>
								<FormLabel>Username</FormLabel>
								<Input
									type="text"
									value={userData.username || "N/A"} isReadOnly
									_focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }} />
							</FormControl>

							{/* Editable fields */}
							<FormControl mb={4}>
								<FormLabel>Mobile</FormLabel>
								<Input
									type="tel"
									name="mobile"
									onChange={handleInputChange}
									value={formState.mobile}
									_focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }} />
							</FormControl>

							<FormControl mb={4}>
								<FormLabel>Email</FormLabel>
								<Input
									type="email"
									name="email"
									onChange={handleInputChange}
									value={formState.email}
									_focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }} />
							</FormControl>

							<FormControl mb={4}>
								<FormLabel>RPPS</FormLabel>
								<Input
									type="text"
									name="RPPS"
									onChange={handleInputChange}
									value={formState.RPPS}
									_focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }} />
							</FormControl>

							<FormControl mb={4}>
								<FormLabel>Title</FormLabel>
								<Input
									type="text"
									name="titre"
									onChange={handleInputChange}
									value={formState.titre}
									_focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }} />
							</FormControl>

							<FormControl mb={4}>
								<FormLabel>Speciality</FormLabel>
								<Input
									type="text"
									name="speciality"
									onChange={handleInputChange}
									value={formState.speciality}
									_focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }} />
							</FormControl>

						</Box>

						<Box>
							<Text fontSize="lg" mb={4} fontWeight="bold">
								Institution Information
							</Text>

							<FormControl mb={4}>
								<FormLabel>Institution name</FormLabel>
								<Input
									type="text"
									name="nameInstitution"
									onChange={handleInputChange}
									value={formState.nameInstitution}
									_focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }} />
							</FormControl>

							<FormControl mb={4}>
								<FormLabel>Address</FormLabel>
								<Input
									type="text"
									name="address"
									onChange={handleInputChange}
									value={formState.address}
									_focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }} />
							</FormControl>

							<InputGroup mb={4}>
								<InputLeftAddon children="Postal Code" />
								<Input
									type="text"
									name="postalCode"
									onChange={handleInputChange}
									value={formState.postalCode}
									_focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }} />
							</InputGroup>

							<InputGroup mb={4}>
								<InputLeftAddon children="City" />
								<Input
									type="text"
									name="city"
									onChange={handleInputChange}
									value={formState.city}
									_focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }} />
							</InputGroup>

							<InputGroup mb={4}>
								<InputLeftAddon children="Country" />
								<Input
									type="text"
									name="country"
									onChange={handleInputChange}
									value={formState.country}
									_focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }} />
							</InputGroup>

							<FormControl mb={4}>
								<FormLabel>Institution number</FormLabel>
								<Input
									type="text"
									name="nbInstitution"
									onChange={handleInputChange}
									value={formState.nbInstitution}
									_focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }} />
							</FormControl>
						</Box>
					</Grid>
					<Flex mt={5} justifyContent="flex-end">
						<Button
							mt={5}
							backgroundColor="#94aca4"
							color="white"
							onClick={e => handleSaveChanges(e)}
							_hover={{
								backgroundColor: "#7a8f86"
							}}
							type="submit">
							Save Changes
						</Button>

					</Flex>
				</>
			)}
		</Flex>
	);
}

export default Settings;
