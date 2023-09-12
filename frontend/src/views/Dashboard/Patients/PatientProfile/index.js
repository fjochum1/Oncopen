import React, { useState, useEffect } from "react";
import { Flex, Grid, useColorModeValue } from "@chakra-ui/react";
import Header from "./components/Header";
import avatar4 from "assets/img/avatars/avatar4.png";
import ProfileBgImage from "assets/img/ProfileBackground.png";
import MainDiseases from "./components/MainDiseases";
import MedicalHistory from "./components/MedicalHistory";
import ProfileInformation from "./components/ProfileInformation";
import axios from 'axios'; // Ajoutez cette ligne pour importer Axios.
import fetchPatientById from "api/fetchPatientById";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Button, ButtonGroup } from "@chakra-ui/react"




function PatientProfile() {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const bgProfile = useColorModeValue(
    "hsla(0,0%,100%,.8)",
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)"
  );

  const [patient, setPatient] = useState({});
  const [loading, setLoading] = useState(true);
  const  {patientId} = useParams() 

  
  useEffect(() => {
    // Obtenez l'ID du patient à partir des paramètres de l'URL
    //const patientId = match.params.patient?.id;
    

    // Faites la requête GET pour obtenir le patient par ID
	console.log(patientId)
  //   axios.get(`http://localhost:8081/api/patientGetById/${patientId}`)
  //     .then(response => {
  //       setPatient(response.data);
  //       setLoading(false);
  //     })
  //     .catch(error => {
  //       console.error('Erreur lors de la récupération du patient:', error);
  //       setLoading(false);
  //     });
  // }, [patientId]);

  fetchPatientById(patientId) // Utilisez fetchPatientById au lieu d'Axios
    .then((patientData) => {

      const formattedDateOfBirth = new Date(parseFloat(patientData.dateOfBirth)).toLocaleDateString();

        // Mettez à jour l'objet patient avec la date de naissance formatée
        const formattedPatient = { ...patientData, dateOfBirth: formattedDateOfBirth };

      setPatient(formattedPatient);
      //setPatient(patientData);
      setLoading(false);
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération du patient :', error);
      setLoading(false);
    });
}, [patientId]);

  return (
    <Flex direction='column'>
      <Header
        backgroundHeader={ProfileBgImage}
        backgroundProfile={bgProfile}
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

  