import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import fetchPatientById from '../../../../api/fetchPatientById';
import { Flex, Box, Grid, useColorModeValue, Text, Button, ButtonGroup } from '@chakra-ui/react';
import MainDiseases from "./components/MainDiseases";
import MedicalHistory from "./components/MedicalHistory";
import ProfileInformation from "./components/ProfileInformation";
import Header from "./components/Header";
import avatar4 from "assets/img/avatars/avatar4.png";
import ProfileBgImage from "assets/img/ProfileBackground.png";

const PatientProfile = () => {
    const { id } = useParams();
	console.log(id);

    const [patient, setPatient] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const patientData = await fetchPatientById(id);
            setPatient(patientData);
        }

        fetchData();
    }, [id]);

	if (!patient) {
		return <div>Loading...</div>;
	}
	return (
		<Flex direction='column'>
		  <Header
			backgroundHeader={ProfileBgImage}
			//backgroundProfile={bgProfile}
			avatarImage={avatar4}
			name={`${patient.firstName || "Prénom inconnu"} ${patient.lastName || "Nom Inconnu"}`}
		  />
		  <Grid templateColumns={{ sm: "1fr", xl: "repeat(3, 1fr)" }} gap='22px'>

			<ProfileInformation
			  title={"Profile Information"}
			  firstname={patient.firstName || "Prénom Inconnu"}
			  lastname={patient.lastName || "Nom Inconnu"}
			  dateOfBirth={patient.dateOfBirth || "Date de naissance inconnue"}
			  sex={patient.sex || "Sexe inconnu"}
			/>
			<MainDiseases
			  title={"Main diseases"}
			  titleDisease={"Breast Cancer"}
			  details={{
				description: "Type, state ...",
			  }}
			/>
			<MedicalHistory
			  title={"Medical History"}
			  titleHistory={"Allergies"}
			  details={{
				description: "Antibiotics, aspirin",
			  }}
			/>
		  </Grid>
		</Flex>
	  );
	}

	export default PatientProfile;

//    return (
//        <Flex direction="column" padding="20px">
//            {patient ? (
//                <>
//                    <Box mb="10px">
//                        <Text fontSize="2xl">{patient.firstName} {patient.lastName}</Text>
//                    </Box>
//                    <Box mb="10px">
//                        <Text>Date of Birth: {new Date(patient.dateOfBirth).toLocaleDateString()}</Text>
//                    </Box>
//                    <Box mb="10px">
//                        <Text>Sex: {patient.sex}</Text>
//                    </Box>
//                </>
//            ) : (
//                <Text>Loading...</Text>
//            )}
//        </Flex>
//    );
//};

//export default PatientProfile;

//import { useParams } from 'react-router-dom';
//import React, { useState, useEffect } from "react";
//import { Flex, Grid, useColorModeValue, Box } from "@chakra-ui/react";
//import Header from "./components/Header";
//import avatar4 from "assets/img/avatars/avatar4.png";
//import ProfileBgImage from "assets/img/ProfileBackground.png";
//import MainDiseases from "./components/MainDiseases";
//import MedicalHistory from "./components/MedicalHistory";
//import ProfileInformation from "./components/ProfileInformation";
//import axios from 'axios'; // Ajoutez cette ligne pour importer Axios.
//import fetchPatientById from "../../../../api/fetchPatientById";
//import { Button, ButtonGroup } from "@chakra-ui/react"


//const PatientProfile = () => {
//    const { patientId } = useParams();
//	console.log(patientId);

//    const [patient, setPatient] = useState(null);

//    useEffect(() => {
//        async function fetchData() {
//            const patientData = await fetchPatientById(id);
//            setPatient(patientData);
//        }

//        fetchData();
//    }, [patientId]);

//  useEffect(() => {
//	async function fetchData() {
//		const patientData = await fetchPatientById(patientId);
//		setPatient(patientData);
//	}

//	fetchData();
//}, [patientId]);


//  useEffect(() => {
//    // Obtenez l'ID du patient à partir des paramètres de l'URL
//    //const patientId = match.params.patient?.id;


//    // Faites la requête GET pour obtenir le patient par ID
//	console.log(patientId)
//  fetchPatientById(patientId) // Utilisez fetchPatientById au lieu d'Axios
//    .then((patientData) => {

//      const formattedDateOfBirth = new Date(parseFloat(patientData.dateOfBirth)).toLocaleDateString();

//        // Mettez à jour l'objet patient avec la date de naissance formatée
//        const formattedPatient = { ...patientData, dateOfBirth: formattedDateOfBirth };

//      setPatient(formattedPatient);
//      //setPatient(patientData);
//      setLoading(false);
//    })
//    .catch((error) => {
//      console.error('Erreur lors de la récupération du patient :', error);
//      setLoading(false);
//    });
//}, [patientId]);



