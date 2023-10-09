import React, { useState, useEffect } from 'react';
import SearchTable1 from './Components/dataTables';
import fetchPatients from '../../../../api/fetchPatient';
import fetchDeletePatient from '../../../../api/fetchDeletePatient';
import { Flex, Button, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody } from '@chakra-ui/react';
import NewPatientForm from 'views/Dashboard/Patients/PatientRecord/newPatientForm';
import { useHistory } from 'react-router-dom';
import { IconButton } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { BsPencilSquare } from "react-icons/bs";



const PatientRecord = () => {
  const [patientsData, setPatientsData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);
  const history = useHistory();

  const handleDeletePatient = async (patientId) => {
    // Appelez votre API ou la fonction de suppression de patient ici
    // Vous pouvez utiliser l'ID du patient (patientId) pour identifier le patient à supprimer
    const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer ce patient ?');

    if (confirmDelete) {
    try {
      // Appelez l'API pour supprimer le patient en utilisant l'ID
      // Attendez la réponse pour vous assurer que la suppression est réussie
      await fetchDeletePatient(patientId); // Assurez-vous d'implémenter la fonction deletePatient
      // Mettez à jour la liste des patients après la suppression
      history.push('/admin/patient-record'); // Remplacez par le chemin de votre page
      
      fetchData();

    } catch (error) {
      console.error('Erreur lors de la suppression du patient :', error);
    }
  };
  }

  const formatDate = (dateOfBirth) => {
    const rawDate = new Date(dateOfBirth);
  const formattedDate = rawDate.toLocaleDateString(); // Formatage de la date
  return formattedDate;
  };

  const fetchData = async () => {
    const patients = await fetchPatients();
    console.log("Données des patients:", patients); // Vérifiez les données renvoyées par l'API

    const formattedPatients = patients.map((patient) => ({
      ...patient,
      dateOfBirth: formatDate(patient.dateOfBirth),
    }));
    setPatientsData(formattedPatients);
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
    { Header: 'Date of birth', accessor: 'dateOfBirth', Cell: ({ value }) => formatDate(value) }, // Utilisez formatDate pour formater la date de naissance
    { Header: 'Sex', accessor: 'sex' },   
    {
      Header: 'Actions',
      accessor: 'id', // Utilisez un champ unique (comme l'ID du patient) comme accessor
      Cell: ({ value }) => (
        <div>
          <button onClick={() => (value)}>
      <IconButton
        
        color="#94aca4"
        aria-label='Call Segun'
        size='lg'
        icon= {<BsPencilSquare />}
   
          />
          
      </button>
        <button onClick={() => handleDeletePatient(value) }>
          <IconButton
        marginLeft={10}
        color="#94aca4"
        aria-label='Call Segun'
        size='lg'
        icon={<DeleteIcon />}
   
          />
      </button>
      
      
      </div>
      
        
      ),
    }, 
  ];

  return (
    <Flex flexDirection="column" width="100%">
      <Flex justifyContent="flex-end">
        <Button
          onClick={onOpen}
          fontSize='14px'
          bg='#759284'
          w='16%'
          h='45'
          mb='16px'
          color='white'
          mt='20px'
          _hover={{
            bg: "#94aca4",
          }}
          _active={{
            bg: "#94aca4",
          }}>
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
      <SearchTable1 columnsData={columnsData} tableData={patientsData} onRowClick={(rowData) => {
          history.push(`/patient/${rowData.id}/profile`);
      }}/>
    </Flex>
  );
};

export default PatientRecord;
