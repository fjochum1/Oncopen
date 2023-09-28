
// medicalHistoryRoutes.js

import express from 'express';
const router = express.Router();
import {
  createEmptyMedicalHistoryController,
  getMedicalHistoryController,
  updateMedicalHistoryController
} from '../controllers/medicalHistory.controller';

// Middleware pour analyser le corps des requêtes en JSON
router.use(express.json());

// Route GET pour obtenir l'historique médical d'un patient
router.get('/medicalHistoryGet/:patient_id', getMedicalHistoryController);
// router.get('/patient/:patient_id/profile', getMedicalHistoryController);


// Route POST pour créer un nouvel historique médical
router.post('/medicalHistoryCreate', createEmptyMedicalHistoryController);

// Endpoint pour mettre à jour les données médicales
router.put('/medicalHistoryUpdate/:patient_id', updateMedicalHistoryController);


export default router;
