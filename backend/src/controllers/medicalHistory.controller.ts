// medicalHistoryController.js

import { Request, Response } from 'express'; // Importez les types Request et Response d'Express
import { getMedicalHistory, addMedicalHistory } from '../services/medicalHistory.service';
import { connection } from '../server/database';

// Contrôleur pour obtenir l'historique médical d'un patient
export const getMedicalHistoryController = async (req:Request, res:Response) => {
  // console.log(`Fetching medical history for patient with ID: ${patientId}`);
  const patient_id = req.params.patient_id;
  try {
    const medicalHistory = await getMedicalHistory(connection, patient_id);
    
    console.log('Medical history retrieved successfully:', medicalHistory);
    res.json(medicalHistory);
  } catch (error) {
    
    console.error(`Fetch operation failed in controller layer : ${error}`);
    res.status(500).json({ error: 'An error occurred while fetching medical history in controller layer: ${error.message}' });
  }
};



// Contrôleur pour créer un nouvel historique médical
export const addMedicalHistoryController = async (req:Request, res:Response) => {
  const medicalHistoryData = req.body;
  try {
    const newMedicalHistory = await addMedicalHistory(medicalHistoryData);
    res.status(201).json(newMedicalHistory);
  } catch (error) {
    console.error(`Create operation failed: ${error}`);
    res.status(500).json({ error: 'An error occurred while creating medical history' });
  }
};
