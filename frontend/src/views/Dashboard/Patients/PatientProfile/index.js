import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import fetchPatientById from '../../../../api/fetchPatientById';
import { Flex, Box, Grid, useColorModeValue, Text, Button, ButtonGroup, Icon, Modal, ModalBody, ModalOverlay, ModalHeader, ModalCloseButton, ModalContent, ModalFooter, Progress } from '@chakra-ui/react';
import MainDiseases from "./components/MainDiseases";
import MedicalHistory from "./components/MedicalHistory";
import ProfileInformation from "./components/ProfileInformation";
import Header from "./components/Header";
import LineChart from "../../../../components/Charts/LineChart";
import { ChartWeight, lineChartData, lineChartOptions } from "./components/ChartWeight";
import { ChartBMI, lineChartDataBMI, lineChartOptionsBMI } from "./components/ChartBMI";
import BarPerformanceStatus from "./components/BarPerformanceStatus"

const PatientProfile = () => {
	const textColor = useColorModeValue('red.500', 'red.200');
	const backgroundHeader = useColorModeValue(
		'#b0bdbf')
	const bgProfile = useColorModeValue(
		'#e5ecec'
	);

	const { id } = useParams();
	const [patient, setPatient] = useState(null);


	// const [formData, setFormData] = useState(null);
	// const handleSaveFormData = (data) => {setFormData(data);};

	useEffect(() => {

		async function fetchData() {
			const patientData = await fetchPatientById(id);
			const formattedDateOfBirth = new Date(parseFloat(patientData.dateOfBirth)).toLocaleDateString();


			// Mettez à jour l'objet patient avec la date de naissance formatée
			const formattedPatient = { ...patientData, dateOfBirth: formattedDateOfBirth };
			setPatient(formattedPatient);
			//setPatient(patientData);
		}
		fetchData();
	}, [id]); //Pour déclencher mon useEffect seulement quand mon id change (et donc que je change de patient)

	if (!patient) {
		return <div>Loading...</div>;
	}
	return (
		<Flex direction='column'>
			<Header
				backgroundHeader={backgroundHeader}
				backgroundProfile={bgProfile}
				name={`${patient.firstName || "Prénom inconnu"} ${patient.lastName || "Nom Inconnu"}`}
			/>
			<Grid templateColumns={{ sm: "1fr", xl: "repeat(3, 1fr)" }} gap='22px'>
				<ProfileInformation
					title={"Administrative Information"}
					firstname={patient.firstName || "Prénom Inconnu"}
					lastname={patient.lastName || "Nom Inconnu"}
					dateOfBirth={patient.dateOfBirth || "Date de naissance inconnue"}
					sex={patient.sex || "Sexe inconnu"}
				/>
				<Grid templateRows="repeat(3, 1fr)" gap='22px'>
					<MedicalHistory
						title={"Medical History"}
						details={{
							description: "Antibiotics, aspirin",
						}}
					/>
					<MedicalHistory
						title={"Surgical History"}
						details={{
							description: "Antibiotics, aspirin",
						}}
					/>
					<MedicalHistory
						title={"Familial History"}
						titleHistory={"Allergies"}
						details={{
							description: "Antibiotics, aspirin",
						}}
					/>
				</Grid>
				<Grid templateRows="2fr 2fr 1fr" gap='22px'>
					<ChartWeight
						title={"Weight (kg)"}
						chart={<LineChart data={lineChartData} options={lineChartOptions} />}
					/>
					<ChartBMI
						title={"BMI (kg/m2)"}
						chart={<LineChart data={lineChartDataBMI} options={lineChartOptionsBMI} />}
					/>
					<BarPerformanceStatus value={"1" || 0} />
				</Grid>
			</Grid>
		</Flex>
	);
}

export default PatientProfile;





