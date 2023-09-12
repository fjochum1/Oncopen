import express from 'express';
import { connection } from '../server/database';
import Patient from '../models/patient';

const router = express.Router();

router.get('/:patientId', async (req, res) => {
  if (!connection) {
    return res.status(500).json({
      success: false,
      msg: 'Database connection is not established',
    });
  }

  try {
    const patientRepository = connection.getRepository(Patient);
    const patientId = req.params.patientId;
    const patient = await patientRepository.findOne(patientId);

    if (!patient) {
      return res.status(404).json({ success: false, msg: 'Patient not found' });
    }

    return res.json(patient);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, msg: 'An error occurred while processing the request.' });
  }
});

export default router;