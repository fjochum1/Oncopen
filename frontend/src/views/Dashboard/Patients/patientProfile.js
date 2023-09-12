import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import fetchPatientById from '../../../api/fetchPatientById';
import { Flex, Box, Text } from '@chakra-ui/react';


const PatientProfile = () => {
    const { id } = useParams();

    const [patient, setPatient] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const patientData = await fetchPatientById(id);
            setPatient(patientData);
        }

        fetchData();
    }, [id]);

    return (
        <Flex direction="column" padding="20px">
            {patient ? (
                <>
                    <Box mb="10px">
                        <Text fontSize="2xl">{patient.firstName} {patient.lastName}</Text>
                    </Box>
                    <Box mb="10px">
                        <Text>Date of Birth: {new Date(patient.dateOfBirth).toLocaleDateString()}</Text>
                    </Box>
                    <Box mb="10px">
                        <Text>Sex: {patient.sex}</Text>
                    </Box>
                </>
            ) : (
                <Text>Loading...</Text>
            )}
        </Flex>
    );
};

export default PatientProfile;
