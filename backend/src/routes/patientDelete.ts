import express from 'express';
import { connection } from '../server/database';
import Patient from '../models/patient';

const router = express.Router();

// Route pour supprimer un patient par son ID
router.delete('/:patientId', async (req, res) => {
  const {patientId} = req.params;

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

    // Supprimez le patient
    await patientRepository.remove(existingPatient);

    return res.status(204).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, msg: 'An error occurred while processing the request.' });
  }
});

export default router;