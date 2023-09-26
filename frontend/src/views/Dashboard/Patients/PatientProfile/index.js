import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import fetchPatientById from '../../../../api/fetchPatientById';
import { Flex, Box, Grid, useColorModeValue, Text, Button, ButtonGroup, Icon, Modal, ModalBody, ModalOverlay, ModalHeader,  ModalCloseButton, ModalContent, ModalFooter, } from '@chakra-ui/react';
import MainDiseases from "./components/MainDiseases";
import MedicalHistory from "./components/MedicalHistory";
import ProfileInformation from "./components/ProfileInformation";
import Header from "./components/Header";
import avatar4 from "assets/img/avatars/avatar4.png";
// import ProfileBgImage from "assets/img/ProfileBackground.png";

const PatientProfile = () => {
	const textColor = useColorModeValue('red.500', 'red.200');
	const backgroundHeader = useColorModeValue(
		'#b0bdbf'	)
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
		  <Box padding={30}>

			<ProfileInformation
			  title={"Profile Information"}
			  firstname={patient.firstName || "Prénom Inconnu"}
			  lastname={patient.lastName || "Nom Inconnu"}
			  dateOfBirth={patient.dateOfBirth || "Date de naissance inconnue"}
			//   age= {year - patient.dateOfBirth.getFullYear()}
			  sex={patient.sex || "Sexe inconnu"}
			/>
			</Box>
			<Box padding={30}>
			<MainDiseases
			  title={"Main diseases"}
			/>
			</Box>
		  <Box padding={30}>
		  <MedicalHistory
			  title={"Medical History"}
			/>
  		</Box>
		</Flex>
	  );
	}

	export default PatientProfile;





