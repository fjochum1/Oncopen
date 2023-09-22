
// medicalHistoryRoutes.js

import express from 'express';
const router = express.Router();
import {
  getMedicalHistoryController,
  addMedicalHistoryController,
} from '../controllers/medicalHistory.controller';

// Middleware pour analyser le corps des requêtes en JSON
router.use(express.json());

// Route GET pour obtenir l'historique médical d'un patient
router.get('/medicalHistoryGet/:patient_id', getMedicalHistoryController);
// router.get('/patient/:patient_id/profile', getMedicalHistoryController);


// Route POST pour créer un nouvel historique médical
router.post('/medicalHistoryCreate', addMedicalHistoryController);

export default router;
