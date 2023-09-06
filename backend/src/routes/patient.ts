import Joi from 'joi';
import express from 'express';
import { connection } from '../server/database';
import Patient from '../models/patient';

const router = express.Router();

// Define schema validation for a new patient
const patientSchema = Joi.object().keys({
	firstName: Joi.string().required().messages({
		'any.required': 'First name is a required field',
	}),
	lastName: Joi.string().required().messages({
		'any.required': 'Last name is a required field',
	}),
	dateOfBirth: Joi.date().required().messages({
		'any.required': 'Date of birth is a required field',
	}),
	sex: Joi.string().valid('F', 'M').required().messages({
		'any.only': 'Sex must be either F or M',
		'any.required': 'Sex is a required field',
	}),
});

router.post('/', async (req, res) => {
	// Validate the incoming data
	const { error, value } = patientSchema.validate(req.body);
	if (error) {
		return res.status(422).json({
			success: false,
			msg: `Validation err: ${error.details[0].message}`,
		});
	}

	const { firstName, lastName, dateOfBirth, sex } = value;

	if (!connection) {
		return res.status(500).json({
			success: false,
			msg: 'Database connection is not established',
		});
	}

	try {
		const patientRepository = connection.getRepository(Patient);

		const patient = await patientRepository.save({
			firstName,
			lastName,
			dateOfBirth,
			sex,
		});

		return res.json({ success: true, patientId: patient.id, msg: 'Patient was successfully added' });

	} catch (err) {
		console.error(err);
		return res.status(500).json({ success: false, msg: 'An error occurred while processing the request.' });
	}

});

export default router;
