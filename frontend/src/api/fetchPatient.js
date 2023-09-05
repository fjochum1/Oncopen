import axios from './index.js';

const fetchPatients = async () => {
  try {
    const response = await axios.get('/patients');

    // Assuming the server returns the data array in the response's body
    return response.data;

  } catch (error) {
    console.error(`Fetch operation failed: ${error}`);
    return [];
  }
};

export default fetchPatients;
