// fetchMedicalHistory.js

import axios from './index.js';


// Fonction pour obtenir l'historique médical d'un patient par une requête GET
export const fetchMedicalHistory = async (patient_id) => {
  try {

    const response = await axios.get(`medicalHistory/medicalHistoryGet/${patient_id}`);

    return response.data;
  } catch (error) {
    console.error(`Fetch operation failed: ${error}`);
    throw error;
  }
};






// Fonction pour créer un nouvel historique médical par une requête POST
export const createEmptyMedicalHistory = async (patient_id) => {
  try {
    const response = await axios.post(`medicalHistory/medicalHistoryCreate`, patient_id);
    return response.data;
  } catch (error) {
    console.error(`Create operation failed: ${error}`);
    throw error;
  }
};

export const updateMedicalHistory = (patient_id, updatedData) => {
  return axios.put(`medicalHistory/medicalHistoryUpdate/${patient_id}`, updatedData);
};
