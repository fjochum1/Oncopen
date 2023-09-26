// medicalHistoryController.js

import { Request, Response } from 'express'; // Importez les types Request et Response d'Express
import { getMedicalHistory, updateMedicalHistory, createMedicalHistory } from '../services/medicalHistory.service';
import { connection } from '../server/database';

// Contrôleur pour obtenir l'historique médical d'un patient
export const getMedicalHistoryController = async (req:Request, res:Response) => {
  const patient_id = req.params.patient_id;
  try {
    const medicalHistory = await getMedicalHistory(connection, patient_id);
    
      if (medicalHistory) {
      console.log('Medical history retrieved successfully:', medicalHistory);
      res.json(medicalHistory);
    } else {
    // Si aucune donnée médicale n'existe, renvoie un formulaire vide (ou une réponse appropriée)
      console.log('No medical history found for the patient.');
      res.json({}); // Vous pouvez renvoyer un objet vide ou une réponse appropriée
    }
  } catch (error) {
    
    console.error(`Fetch operation failed in controller layer : ${error}`);
    res.status(500).json({ error: 'An error occurred while fetching medical history in controller layer: ${error.message}' });
  }
};

// Contrôleur pour créer un nouvel historique médical
// const newMedicalHistory = await createMedicalHistory(connection, medicalHistoryData);

export const createMedicalHistoryController = async (req:Request, res:Response) => {
  const medicalHistoryData = req.body;
  try {
    const newMedicalHistory = await createMedicalHistory(medicalHistoryData);
    res.status(201).json(newMedicalHistory);
  } catch (error) {
    console.error(`Create operation failed: ${error}`);
    res.status(500).json({ error: 'An error occurred while creating medical history' });
  }
};

// Endpoint pour mettre à jour les données médicales
export const updateMedicalHistoryController = async (req:Request, res:Response) => {
  const patient_id = req.params.patient_id;
  const updatedData = req.body; // Les données mises à jour sont généralement envoyées dans le corps de la requête

  try {
    const result = await updateMedicalHistory(connection ,patient_id, updatedData);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: 'Erreur lors de la mise à jour des données médicales.' });
  }
};

