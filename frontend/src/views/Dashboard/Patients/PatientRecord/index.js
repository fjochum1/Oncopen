import React, { useState, useEffect } from 'react';
import SearchTable1 from './Components/dataTables';
import fetchPatients from '../../../../api/fetchPatient';
import { Flex, Button, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, Text, Box } from '@chakra-ui/react';
import NewPatientForm from 'views/Dashboard/Patients/PatientRecord/newPatientForm';
import { useHistory } from 'react-router-dom';
import './Components/styles.css'

const PatientRecord = () => {
	const [patientsData, setPatientsData] = useState([]);
	const [isOpen, setIsOpen] = useState(false);

	const onClose = () => setIsOpen(false);
	const onOpen = () => setIsOpen(true);
	const history = useHistory();

	const fetchData = async () => {
		const patients = await fetchPatients();
		const formattedPatientsData = patients.map(patient => ({
			...patient,
			dateOfBirth: new Date(parseFloat(patient.dateOfBirth)).toLocaleDateString()
		}));
		setPatientsData(formattedPatientsData);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handlePatientAdded = () => {
		fetchData();
	};

	const columnsData = [
		{ Header: 'First name', accessor: 'firstName' },
		{ Header: 'Last name', accessor: 'lastName' },
		{ Header: 'Date of birth', accessor: 'dateOfBirth' },
		{ Header: 'Sex', accessor: 'sex' },
	];

	return (
		<Flex flexDirection="column" width="100%">
			<Flex justifyContent="flex-end">
				<Button
					className="custom-button"
					onClick={onOpen}
					fontSize='16px'
					bg="transparent"
					w='16%'
					h='45'
					mb='16px'
					borderRadius='md'
					mt='20px'
					fontWeight= "bold"
					backgroundColor="#94aca4"
					color="white"
					_hover={{
						backgroundColor: "#7a8f86"
					}}
				>
					Add new patient
				</Button>
				<Modal isOpen={isOpen} onClose={onClose} size="xl">
					<ModalOverlay />
					<ModalContent>
						<ModalCloseButton />
						<ModalBody>
							<NewPatientForm onClose={onClose} onPatientAdded={handlePatientAdded} />
						</ModalBody>
					</ModalContent>
				</Modal>
			</Flex>
				<Text fontSize="24" color="black" fontWeight='bold' letterSpacing="tighter">
				Patient Record
			</Text>
			<Box width="110px" height="8px" backgroundColor="rgba(99, 135, 118, 0.4)" mt="-12px" mb="30px" ml="10px" />
			<SearchTable1 columnsData={columnsData} tableData={patientsData} onRowClick={(rowData) => {
				history.push(`/patient/${rowData.id}/profile`);
			}} />
		</Flex>
	);
};

export default PatientRecord;
