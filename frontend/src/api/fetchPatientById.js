import axios from './index.js';

/* The fetchPatientById function sends a GET request to the backend API
to retrieve the data of a specific patient from the database. */
const fetchPatientById = async (patientId) => {
  try {
    const response = await axios.get(`patientGetId/${patientId}`);
    return response.data;

  } catch (error) {
    console.error(`Fetch operation failed: ${error}`);
    return null;
  }
};

export default fetchPatientById;
