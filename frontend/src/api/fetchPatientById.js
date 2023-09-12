import axios from './index.js';

/* The fetchPatients function sends a GET request to the backend API
to find the data of the patients in the database. */

const fetchPatientById = async (patientId) => {
    try {
      const response = await axios.get(`patientGetById/${patientId}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération du patient : ${error}`);
      throw error;
    }
  };
  
  export default fetchPatientById;