import React, { useState } from 'react';
import axios from '../../../../api/index.js';
import { Flex, Button, Box, Heading, Stack, FormLabel, Input, RadioGroup, Radio, ButtonGroup, Alert, AlertIcon, Text } from '@chakra-ui/react';
import '@fontsource/bebas-neue';
import './Components/styles.css';

const NewPatientForm = ({ onClose, onPatientAdded }) => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [dateOfBirth, setDateOfBirth] = useState('');
	const [sex, setSex] = useState('');
	const [showSuccessAlert, setShowSuccessAlert] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await axios.post(`patient`, {
				firstName,
				lastName,
				dateOfBirth,
				sex
			}).then(response => {
				if (response.data.success) {
					setShowSuccessAlert(true);
					setTimeout(() => {
						onClose(); // close the form
						onPatientAdded(); // fetch the new data
						setShowSuccessAlert(false); // hide the alert after a delay
					}, 2000);
				} else {
					alert('There was a problem: ' + response.data.msg);
				}
			}).catch(error => {
				if (error.response) {
					alert('Error: ' + error.response.data.msg);
				} else {
					alert('There has been an error.');
				}
			});
		} catch (err) {
			console.error(err);
			alert('There was an error when submitting the form.');
		}
	};

	return (
		<Flex justifyContent='center' mb='80px' mt='40px' >
			<Box w='50%' marginRight='50px'>
				<Text fontSize="24" color="black" fontWeight='bold' letterSpacing="tighter">
					New Patient
				</Text>
				<Box width="110px" height="8px" backgroundColor="rgba(99, 135, 118, 0.4)" mt="-12px" mb="30px" ml="10px" />
				{/*<div className="area-title">
		  <div className="title-box"></div>
		  <h2>New Patient</h2>
        </div>*/}
				{showSuccessAlert && (
					<Alert status='success' mb={4}>
						<AlertIcon />
						Patient successfully added!
					</Alert>
				)}
				<Stack spacing={4}>
					<FormLabel fontWeight={'bold'}>First name:</FormLabel>
					<Input
					placeholder="e.g. Justine"
					size="md"
					value={firstName}
					onChange={e => setFirstName(e.target.value)}
					_hover={{
						border:"2px",
						borderColor: "rgba(99, 135, 118, 0.8)"
					}}
					_focus={{
						border:"2px",
						borderColor: "rgba(99, 135, 118, 0.8)"
					}} />
					<FormLabel fontWeight={'bold'}>Last name:</FormLabel>
					<Input
					placeholder="e.g. Cavelier"
					size="md"
					value={lastName}
					onChange={e => setLastName(e.target.value)}
					_hover={{
						border:"2px",
						borderColor: "rgba(99, 135, 118, 0.8)"
					}}
					_focus={{
						border:"2px",
						borderColor: "rgba(99, 135, 118, 0.8)"
					}} />
					<FormLabel fontWeight={'bold'}>Sex:</FormLabel>
					<RadioGroup onChange={setSex} value={sex}>
						<Stack direction="row">
							<Radio value="F">F</Radio>
							<Radio value="M">M</Radio>
						</Stack>
					</RadioGroup>

					<FormLabel fontWeight={'bold'}>Date of Birth:</FormLabel>
					<Input
					type="date"
					size="md"
					value={dateOfBirth}
					onChange={e => setDateOfBirth(e.target.value)}
					_hover={{
						border:"2px",
						borderColor: "rgba(99, 135, 118, 0.8)"
					}}
					_focus={{
						border:"2px",
						borderColor: "rgba(99, 135, 118, 0.8)"
					}}/>
					<ButtonGroup spacing={40} mt={70}>
						<Button
							mt="20px"
							w="150px"
							onClick={handleSubmit}
							backgroundColor="#94aca4"
							color="white"
							_hover={{
								backgroundColor: "#7a8f86"
							}}>
							Validate
						</Button>
					</ButtonGroup>
				</Stack>
			</Box>
		</Flex>
	);
}

export default NewPatientForm;
