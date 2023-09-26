import MedicalHistory from '../models/medicalHistory'; // Assurez-vous que le chemin d'importation est correct
import {getRepository,Repository } from 'typeorm';


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


// // Fonction pour créer un nouvel historique médical
export const createMedicalHistory = async (medicalHistoryData: any) => {
  try {
    // if (!patient_id) {
    //   return Promise.reject(new Error('Le patient_id est manquant.'));
    // } // Permet de ne pas soumettre de formulaire à la base de données si nous n'avons pas de patient_id + ajouter quelque chose dans le controlleur
    // Obtenez le référentiel (repository) pour l'entité MedicalHistory
    const medicalHistoryRepository = getRepository(MedicalHistory);

    // Créez une nouvelle instance de l'entité MedicalHistory avec les données fournies
    const newMedicalHistory = medicalHistoryRepository.create(medicalHistoryData);

    // Enregistrez la nouvelle instance dans la base de données
    await medicalHistoryRepository.save(newMedicalHistory);

    // Retournez la nouvelle instance créée
    return newMedicalHistory;
  } catch (error) {
    // Gérez l'erreur ici, par exemple, en enregistrant l'erreur dans un fichier journal, en la lançant à un gestionnaire d'erreurs global, ou en renvoyant une réponse d'erreur HTTP si cette fonction est utilisée dans une API

    // Pour le moment, nous allons simplement l'afficher dans la console
    console.error('Erreur lors de la création de l\'historique médical :', error);

    // Vous pouvez également relancer l'erreur pour la gérer ailleurs si nécessaire
    throw error;
  }
};

export const updateMedicalHistory = async (connection : any, patient_id: string, updatedData: any) => {
  try {
    const medicalHistoryRepository: Repository<MedicalHistory> = connection.getRepository(MedicalHistory);

    // Recherchez l'enregistrement médical existant par l'ID du patient
    const medicalHistory = await medicalHistoryRepository.findOne({ where: { patient_id: patient_id } });

    if (!medicalHistory) {
      throw new Error("Aucun enregistrement médical trouvé pour ce patient.");
    }

    // Utilisez la méthode update pour mettre à jour les champs nécessaires
    await medicalHistoryRepository.update({ patient_id: patient_id }, updatedData);

    return { message: 'Données médicales mises à jour avec succès' };
  } catch (error) {
    throw error;
  }
};



