import express from 'express';
import { connection } from '../server/database';
import Patient from '../models/patient';

const router = express.Router();

// Route pour mettre à jour un patient par son ID
router.put('/:patientId', async (req, res) => {
  const { patientId } = req.params;
  const updatedPatientData = req.body; // Les données mises à jour du patient

  if (!connection) {
    return res.status(500).json({
      success: false,
      msg: 'Database connection is not established',
    });
  }

  try {
    const patientRepository = connection.getRepository(Patient);

    // Vérifiez si le patient existe
    const existingPatient = await patientRepository.findOne(patientId);

    if (!existingPatient) {
      return res.status(404).json({ success: false, msg: 'Patient not found' });
    }

    // Mettez à jour les propriétés du patient avec les nouvelles données
    Object.assign(existingPatient, updatedPatientData);

    // Sauvegardez les modifications dans la base de données
    await patientRepository.save(existingPatient);

    return res.status(200).json({ success: true, updatedPatient: existingPatient });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, msg: 'An error occurred while processing the request.' });
  }
});

export default router;
