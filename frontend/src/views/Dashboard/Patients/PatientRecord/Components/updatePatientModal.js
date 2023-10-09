import React, { useState, useEffect } from 'react';
import fetchPatientById from '../../../../../api/fetchPatientById';
import fetchUpdatePatient from '../../../../../api/fetchUpdatePatient';
import { useHistory } from 'react-router-dom';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';

const UpdatePatientModal = ({ onClose }) => {
  const [patientData, setPatientData] = useState({
    // Initialisez les données du patient (nom, prénom, date de naissance, sexe, etc.)
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    sex: '',
    // ... d'autres champs
  });

  const history = useHistory(); // Utilisez useHistory pour accéder à l'objet d'historique
  const urlHash = window.location.hash;
  const matches = urlHash.match(/#\/patient\/([^/]+)/);
  // const [formattedDateOfBirth, setFormattedDateOfBirth] = useState('');

  // Extrait l'ID du patient à partir de l'URL
  let patientId = null;
  if (matches && matches.length > 1) {
    patientId = matches[1];
  } else {
    console.error("L'URL ne contient pas d'ID de patient valide.");
    // Gérer le cas où l'ID du patient n'est pas trouvé dans l'URL
    // Vous pouvez rediriger vers une page d'erreur ou prendre d'autres mesures ici
  }

  // Effet pour charger les données du patient lors de l'ouverture du modal
  useEffect(() => {
    if (patientId) {
      async function fetchPatientData() {
        const patientData = await fetchPatientById(patientId);
        const rawDateOfBirth = patientData.dateOfBirth; // Assurez-vous que dateOfBirth est au bon format
        const dateOfBirth = new Date(rawDateOfBirth);
  
        // Utilisez les méthodes de Date pour extraire la journée, le mois et l'année
        const day = dateOfBirth.getDate();
        const month = dateOfBirth.getMonth() + 1; // Les mois commencent à 0, donc ajoutez 1
        const year = dateOfBirth.getFullYear();
  
        // Formatez la date de naissance comme "jj/mm/aaaa"
        const formattedDateOfBirth = `${day}/${month}/${year}`;
  
        const formattedPatient = { ...patientData, dateOfBirth: formattedDateOfBirth };
        setPatientData(patientData);
      }

      fetchPatientData();
    }
  }, [patientId, history]);

  

  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêchez la soumission du formulaire par défaut

    try {
      if (patientId) {
        // Envoyez les données mises à jour à l'API avec fetchUpdatePatient
        await fetchUpdatePatient(patientId, patientData);
        onClose(); // Fermez le modal après la mise à jour

        // Rechargez la page actuelle
        alert('The personal datas of your patient as been successfully updated')
        history.push(`/admin/patient-record`);
      } else {
        console.error("L'ID du patient n'est pas défini.");
        // Gérer le cas où l'ID du patient n'est pas défini
        // Vous pouvez afficher un message d'erreur ou prendre d'autres mesures ici
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du patient:', error);
    }
  };

  const handleInputChange = (e) => {
    // Mettez à jour les données du patient lors de la saisie dans le formulaire
    const { name, value } = e.target;
    setPatientData({
      ...patientData,
      [name]: value,
    });
  };

  return (
    <Modal isOpen={true} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton   />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl marginY={5}>
              <FormLabel>Firstname</FormLabel>
              <Input
                type="text"
                name="firstName"
                value={patientData.firstName}
                onChange={handleInputChange}
                _focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }}
              />
              
            </FormControl>
            <FormControl marginY={5}>
              <FormLabel>Lastname</FormLabel>
              <Input
                type="text"
                name="lastName"
                value={patientData.lastName}
                onChange={handleInputChange}
                _focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }}
              />
              
            </FormControl>
            <FormControl marginY={5}>
              <FormLabel>Date of birth :</FormLabel>
              <Input
                type="date"
                name="dateOfBirth"
                value={patientData.dateOfBirth}
                onChange={handleInputChange}
                _focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }}
              />
              
            </FormControl>
            <FormControl marginY={5}>
              <FormLabel>Sex</FormLabel>
              <Input
                type="text"
                name="sex"
                value={patientData.sex}
                onChange={handleInputChange}
                _focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }}
              />
              
            </FormControl>
            {/* Ajoutez d'autres champs ici (prénom, date de naissance, sexe, etc.) */}
            <Button marginY={5} padding={7} type="submit" color="#94aca4">
              Update patients' datas 
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UpdatePatientModal;

