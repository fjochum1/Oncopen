import axios from './index.js';

// La fonction fetchUpdatePatient envoie une requête PUT ou PATCH à l'API backend
// pour mettre à jour les données du patient.
const fetchUpdatePatient = async (patientId, updatedPatientData) => {
  try {
    const response = await axios.put(`patientUpdate/${patientId}`, updatedPatientData);

    return response.data;
  } catch (error) {
    console.error(`Fetch operation failed: ${error}`);
    throw error; // Vous pouvez choisir de gérer l'erreur ici ou la propager pour une gestion ultérieure.
  }
};

export default fetchUpdatePatient;
