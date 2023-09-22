import MedicalHistory from '../models/medicalHistory'; // Assurez-vous que le chemin d'importation est correct
import { getRepository, Repository } from 'typeorm';


// if (!connection) {
//   throw new Error('Database connection is not initialized.');
// }


// Fonction pour obtenir l'historique médical d'un patient

export const getMedicalHistory = async (connection: any, patient_id : string) => {
    
    try {
      // Utilisez la méthode findOne du modèle MedicalHistory pour rechercher l'historique médical par patientId
      const medicalHistoryRepository: Repository<MedicalHistory> = connection.getRepository(MedicalHistory);

      const medicalHistory = await medicalHistoryRepository.findOne({ where: { patient_id: patient_id } });
      if (!medicalHistory) {
        // Gérez le cas où l'historique médical n'est pas trouvé
        throw new Error('Medical history not found');
      }
  
      return medicalHistory;
    } catch (error) {
      console.error(`Fetch operation failed in service layer : ${error}`);
      throw error;
    }
  };


// Fonction pour créer un nouvel historique médical
export const addMedicalHistory = async (medicalHistoryData: any) => {
const medicalHistoryRepository = getRepository(MedicalHistory);
const newMedicalHistory = medicalHistoryRepository.create(medicalHistoryData);
await medicalHistoryRepository.save(newMedicalHistory);
return newMedicalHistory;
};


