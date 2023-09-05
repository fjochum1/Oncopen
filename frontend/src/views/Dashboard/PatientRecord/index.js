import React, { useState, useEffect } from 'react';
import SearchTable1 from './Components/dataTables';
import fetchPatients from '../../../api/fetchPatient';
import { Flex, Button} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const PatientRecord = () => {

  const history = useHistory();
  const [patientsData, setPatientsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const patients = await fetchPatients();
      setPatientsData(patients);
    }

    fetchPatients();
  }, []);

  const columnsData = [
    { Header: 'First name', accessor: 'firstName' },
    { Header: 'Last name', accessor: 'lastName' },
    { Header: 'Date of birth', accessor: 'dateOfBirth' },
    { Header: 'Sex', accessor: 'sex' },
  ];

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetchPatients().then((data) => setTableData(data));
  }, []);

  const navigateToNewPatient = () => {
    history.push('/admin/new_patient');
  }

  return (
    <Flex flexDirection="column" width="100%">
      <Flex justifyContent="flex-end">
		<Button
				onClick={navigateToNewPatient}
                fontSize='14px'
                type='submit'
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
      </Flex>
      <SearchTable1 columnsData={columnsData} tableData={patientsData} />
    </Flex>
  );
};

export default PatientRecord;
