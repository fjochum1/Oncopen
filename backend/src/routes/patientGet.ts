import express from 'express';
import { connection } from '../server/database';
import Patient from '../models/patient';

const router = express.Router();

router.get('/', async (_req, res) => {
  if (!connection) {
    return res.status(500).json({
      success: false,
      msg: 'Database connection is not established',
    });
  }

  try {
    const patientRepository = connection.getRepository(Patient);
    const patients = await patientRepository.find();
    return res.json(patients);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, msg: 'An error occurred while processing the request.' });
  }
});

export default router;
