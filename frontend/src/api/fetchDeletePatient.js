import axios from './index.js';

/* The fetchPatients function sends a GET request to the backend API
to find the data of the patients in the database. */
const fetchDeletePatients = async (patientId) => {
  try {
    const response = await axios.delete(`patientDelete/${patientId}`);

    return response.data;

  } catch (error) {
    console.error(`Fetch operation failed: ${error}`);
    return [];
  }
};



export default fetchDeletePatients;