import React, { useState } from 'react';
import axios from '../../../../api/index.js';
import { Flex, Button, Box, Heading, Stack, FormLabel, Input, RadioGroup, Radio, ButtonGroup, Alert, AlertIcon, Text} from '@chakra-ui/react';
import '@fontsource/bebas-neue';

const NewPatientForm = ({onClose, onPatientAdded}) => {
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
        if(response.data.success) {
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
		<Text mb={5} fontSize="2xl" fontFamily="Bebas Neue, sans-serif" color="#859e91">
			New patient form
		</Text>
        {showSuccessAlert && (
          <Alert status='success' mb={4}>
            <AlertIcon />
            Patient successfully added!
          </Alert>
        )}
		<Stack spacing={5}>
			<FormLabel fontWeight={'bold'}>First name:</FormLabel>
			<Input placeholder="Enter patient's first name" size="md" value={firstName} onChange={e => setFirstName(e.target.value)} />

			<FormLabel fontWeight={'bold'}>Last name:</FormLabel>
			<Input placeholder="Enter patient's last name" size="md" value={lastName} onChange={e => setLastName(e.target.value)} />

			<FormLabel fontWeight={'bold'}>Sex:</FormLabel>
			<RadioGroup onChange={setSex} value={sex}>
				<Stack direction="row">
					<Radio value="F">F</Radio>
					<Radio value="M">M</Radio>
				</Stack>
			</RadioGroup>

			<FormLabel fontWeight={'bold'}>Date of Birth:</FormLabel>
			<Input type="date" size="md" value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)} />

			<ButtonGroup spacing={30} mt={30}>
				<Button
					onClick={handleSubmit}
					backgroundColor="#859e91"
					color="white"
					_hover={{ bg: "#6b8478" }}
					_active={{ bg: "#5a6e60" }}>
					Validate
				</Button>
			</ButtonGroup>
	  </Stack>
    </Box>
	</Flex>
	);
}

export default NewPatientForm;
