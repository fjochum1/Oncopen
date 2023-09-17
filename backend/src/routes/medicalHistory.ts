import Joi from 'joi';
import express from 'express';
import { connection } from '../server/database';
import MedicalHistory from '../models/medicalHistory'; // Assurez-vous d'importer correctement le modèle MedicalHistory

const router = express.Router();

// Define schema validation for a new medical history entry
const medicalHistorySchema = Joi.object().keys({
  gender: Joi.string().required().messages({
    'any.required': 'Gender is a required field',
  }),
  menopause: Joi.string().required().messages({
    'any.required': 'Menopause is a required field',
  }),
  // Ajoutez les validations pour d'autres champs ici
});

router.post('/', async (req, res) => {
  // Validez les données entrantes
  const { error, value } = medicalHistorySchema.validate(req.body);
  if (error) {
    return res.status(422).json({
      success: false,
      msg: `Validation error: ${error.details[0].message}`,
    });
  }

  // Obtenez les données validées
  const {
        gender,
        menopause,
        allergies,
        allergiesDescription,
        lifestyle,
        smoke,
	    smokeDescription,
	    alcohol,
	    alcoholDescription,
		gynObsHistory,
		gestityParity,
		contraception,
		medicalHistory,
		medicalHistoryDescription,
		surgicalHistory,
		surgicalHistoryDescription,
		familialHistory,
		familialHistoryDescription,
		personalFamilialHistoryCancer,
		familyBreastCancerHistory,
		familyBreastCancerHistoryDescription,
		suspiLynch,
		mutScreen,
		brcaPalbMut,
		brcaPalbMutDescription,
		comedication,
		comedicationDescription,
		comedicationPlus,
		comedicationPlusDescription
    // Ajoutez les autres champs ici
  } = value;

  if (!connection) {
    return res.status(500).json({
      success: false,
      msg: 'Database connection is not established',
    });
  }

  try {
    const medicalHistoryRepository = connection.getRepository(MedicalHistory);

    const medicalHistoryEntry = await medicalHistoryRepository.save({
        gender,
        menopause,
        allergies,
        allergiesDescription,
        lifestyle,
        smoke,
	    smokeDescription,
	    alcohol,
	    alcoholDescription,
		gynObsHistory,
		gestityParity,
		contraception,
		medicalHistory,
		medicalHistoryDescription,
		surgicalHistory,
		surgicalHistoryDescription,
		familialHistory,
		familialHistoryDescription,
		personalFamilialHistoryCancer,
		familyBreastCancerHistory,
		familyBreastCancerHistoryDescription,
		suspiLynch,
		mutScreen,
		brcaPalbMut,
		brcaPalbMutDescription,
		comedication,
		comedicationDescription,
		comedicationPlus,
		comedicationPlusDescription
      // Ajoutez les autres champs ici
    });

    return res.json({
      success: true,
      medicalHistoryId: medicalHistoryEntry.id,
      msg: 'Medical history entry was successfully added',
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      msg: 'An error occurred while processing the request.',
    });
  }
});

export default router;
