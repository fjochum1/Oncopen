import {MigrationInterface, QueryRunner} from "typeorm";

export class Migrationv51694791020676 implements MigrationInterface {
    name = 'Migrationv51694791020676'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "consultation" ("id" varchar PRIMARY KEY , "consultationId" integer , "patientId" varchar , "dateOfConsultation" datetime  DEFAULT (datetime('now')), "consultationType" text , "anatomicArea" text , "main_reason" text , "cancerDetection" text , "historyOnco" text , "symptoms" text , "symptomsTxt" text , "height" integer , "weight" integer , "bmi" double precision , "performansStatus" text , "generalExamination" text , "tumorSide3cl" text , "clinicalTumorSizeMm" integer , "clinicalTumorStageT" text , "lymphNodeInvasion" text , "clinicalTumorStageN" text , "inflammatorySigns" text , "mammography" text , "dateMammography" date , "acrClassification" text , "mammographyDetails" text , "breastEchography" text , "dateBreastEchography" date , "breastEchographyDetails" text , "breastMri" text , "dateBreastMri" date , "breastMriDetails" text , "otherRadiologicalExam" text , "dateOtherRadiologicalExam" date , "whichRadiologicalExam" text , "otherRadiologicalExamSDetails" text , "breastBiopsy" text , "dateBreastBiopsy" date, "breastBiopsyDetails" text, "erIntensity" text, "erPercentage" integer, "erStatus" text, "prIntensity" text, "prPercentage" integer, "prStatus" text, "herIntensity" text, "herFish" text, "herStatus" text, "grade" integer, "nuclearGrade" integer, "ki67" text, "histologicalType" text, "pdl1CPS" text, "pdl1Value" text, "nodalCytology" text, "otherBiopsy" text, "dateOtherBiopsy" date, "localisationOtherBiopsy" text, "otherBiopsyDetails" text, "ca153" text, "ace" text, CONSTRAINT "UQ_5d85d70b2e449479555af4bf312" UNIQUE ("consultationId"), CONSTRAINT "UQ_3e2fa389df3d9cb8461f014ed37" UNIQUE ("patientId", "consultationId"))`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" varchar PRIMARY KEY , "username" text , "email" text , "password" text , "user_role" text , "date" datetime  DEFAULT (CURRENT_TIMESTAMP), "RPPS" text , "speciality" text , "titre" text , "name" text , "firstname" text , "nameInstitution" text , "address" text , "postalCode" text , "city" text , "country" text , "nbInstitution" text , "mobile" text )`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "username", "email", "password", "user_role", "date", "RPPS", "speciality", "titre", "name", "firstname", "nameInstitution", "address", "postalCode", "city", "country", "nbInstitution", "mobile") SELECT "id", "username", "email", "password", "user_role", "date", "RPPS", "speciality", "titre", "name", "firstname", "nameInstitution", "address", "postalCode", "city", "country", "nbInstitution", "mobile" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`CREATE TABLE "temporary_consultation" ("id" varchar PRIMARY KEY , "consultationId" integer , "patientId" varchar , "dateOfConsultation" datetime  DEFAULT (datetime('now')), "consultationType" text , "anatomicArea" text , "main_reason" text , "cancerDetection" text , "historyOnco" text , "symptoms" text , "symptomsTxt" text , "height" integer , "weight" integer , "bmi" double precision , "performansStatus" text , "generalExamination" text , "tumorSide3cl" text , "clinicalTumorSizeMm" integer , "clinicalTumorStageT" text , "lymphNodeInvasion" text , "clinicalTumorStageN" text , "inflammatorySigns" text , "mammography" text , "dateMammography" date , "acrClassification" text , "mammographyDetails" text , "breastEchography" text , "dateBreastEchography" date , "breastEchographyDetails" text , "breastMri" text , "dateBreastMri" date , "breastMriDetails" text , "otherRadiologicalExam" text , "dateOtherRadiologicalExam" date , "whichRadiologicalExam" text , "otherRadiologicalExamSDetails" text , "breastBiopsy" text , "dateBreastBiopsy" date, "breastBiopsyDetails" text, "erIntensity" text, "erPercentage" integer, "erStatus" text, "prIntensity" text, "prPercentage" integer, "prStatus" text, "herIntensity" text, "herFish" text, "herStatus" text, "grade" integer, "nuclearGrade" integer, "ki67" text, "histologicalType" text, "pdl1CPS" text, "pdl1Value" text, "nodalCytology" text, "otherBiopsy" text, "dateOtherBiopsy" date, "localisationOtherBiopsy" text, "otherBiopsyDetails" text, "ca153" text, "ace" text, CONSTRAINT "UQ_5d85d70b2e449479555af4bf312" UNIQUE ("consultationId"), CONSTRAINT "UQ_3e2fa389df3d9cb8461f014ed37" UNIQUE ("patientId", "consultationId"), CONSTRAINT "FK_a410e13ba9228bf180f06a9fbaf" FOREIGN KEY ("patientId") REFERENCES "patient" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_consultation"("id", "consultationId", "patientId", "dateOfConsultation", "consultationType", "anatomicArea", "main_reason", "cancerDetection", "historyOnco", "symptoms", "symptomsTxt", "height", "weight", "bmi", "performansStatus", "generalExamination", "tumorSide3cl", "clinicalTumorSizeMm", "clinicalTumorStageT", "lymphNodeInvasion", "clinicalTumorStageN", "inflammatorySigns", "mammography", "dateMammography", "acrClassification", "mammographyDetails", "breastEchography", "dateBreastEchography", "breastEchographyDetails", "breastMri", "dateBreastMri", "breastMriDetails", "otherRadiologicalExam", "dateOtherRadiologicalExam", "whichRadiologicalExam", "otherRadiologicalExamSDetails", "breastBiopsy", "dateBreastBiopsy", "breastBiopsyDetails", "erIntensity", "erPercentage", "erStatus", "prIntensity", "prPercentage", "prStatus", "herIntensity", "herFish", "herStatus", "grade", "nuclearGrade", "ki67", "histologicalType", "pdl1CPS", "pdl1Value", "nodalCytology", "otherBiopsy", "dateOtherBiopsy", "localisationOtherBiopsy", "otherBiopsyDetails", "ca153", "ace") SELECT "id", "consultationId", "patientId", "dateOfConsultation", "consultationType", "anatomicArea", "main_reason", "cancerDetection", "historyOnco", "symptoms", "symptomsTxt", "height", "weight", "bmi", "performansStatus", "generalExamination", "tumorSide3cl", "clinicalTumorSizeMm", "clinicalTumorStageT", "lymphNodeInvasion", "clinicalTumorStageN", "inflammatorySigns", "mammography", "dateMammography", "acrClassification", "mammographyDetails", "breastEchography", "dateBreastEchography", "breastEchographyDetails", "breastMri", "dateBreastMri", "breastMriDetails", "otherRadiologicalExam", "dateOtherRadiologicalExam", "whichRadiologicalExam", "otherRadiologicalExamSDetails", "breastBiopsy", "dateBreastBiopsy", "breastBiopsyDetails", "erIntensity", "erPercentage", "erStatus", "prIntensity", "prPercentage", "prStatus", "herIntensity", "herFish", "herStatus", "grade", "nuclearGrade", "ki67", "histologicalType", "pdl1CPS", "pdl1Value", "nodalCytology", "otherBiopsy", "dateOtherBiopsy", "localisationOtherBiopsy", "otherBiopsyDetails", "ca153", "ace" FROM "consultation"`);
        await queryRunner.query(`DROP TABLE "consultation"`);
        await queryRunner.query(`ALTER TABLE "temporary_consultation" RENAME TO "consultation"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "consultation" RENAME TO "temporary_consultation"`);
        await queryRunner.query(`CREATE TABLE "consultation" ("id" varchar PRIMARY KEY , "consultationId" integer , "patientId" varchar , "dateOfConsultation" datetime  DEFAULT (datetime('now')), "consultationType" text , "anatomicArea" text , "main_reason" text , "cancerDetection" text , "historyOnco" text , "symptoms" text , "symptomsTxt" text , "height" integer , "weight" integer , "bmi" double precision , "performansStatus" text , "generalExamination" text , "tumorSide3cl" text , "clinicalTumorSizeMm" integer , "clinicalTumorStageT" text , "lymphNodeInvasion" text , "clinicalTumorStageN" text , "inflammatorySigns" text , "mammography" text , "dateMammography" date , "acrClassification" text , "mammographyDetails" text , "breastEchography" text , "dateBreastEchography" date , "breastEchographyDetails" text , "breastMri" text , "dateBreastMri" date , "breastMriDetails" text , "otherRadiologicalExam" text , "dateOtherRadiologicalExam" date , "whichRadiologicalExam" text , "otherRadiologicalExamSDetails" text , "breastBiopsy" text , "dateBreastBiopsy" date, "breastBiopsyDetails" text, "erIntensity" text, "erPercentage" integer, "erStatus" text, "prIntensity" text, "prPercentage" integer, "prStatus" text, "herIntensity" text, "herFish" text, "herStatus" text, "grade" integer, "nuclearGrade" integer, "ki67" text, "histologicalType" text, "pdl1CPS" text, "pdl1Value" text, "nodalCytology" text, "otherBiopsy" text, "dateOtherBiopsy" date, "localisationOtherBiopsy" text, "otherBiopsyDetails" text, "ca153" text, "ace" text, CONSTRAINT "UQ_5d85d70b2e449479555af4bf312" UNIQUE ("consultationId"), CONSTRAINT "UQ_3e2fa389df3d9cb8461f014ed37" UNIQUE ("patientId", "consultationId"))`);
        await queryRunner.query(`INSERT INTO "consultation"("id", "consultationId", "patientId", "dateOfConsultation", "consultationType", "anatomicArea", "main_reason", "cancerDetection", "historyOnco", "symptoms", "symptomsTxt", "height", "weight", "bmi", "performansStatus", "generalExamination", "tumorSide3cl", "clinicalTumorSizeMm", "clinicalTumorStageT", "lymphNodeInvasion", "clinicalTumorStageN", "inflammatorySigns", "mammography", "dateMammography", "acrClassification", "mammographyDetails", "breastEchography", "dateBreastEchography", "breastEchographyDetails", "breastMri", "dateBreastMri", "breastMriDetails", "otherRadiologicalExam", "dateOtherRadiologicalExam", "whichRadiologicalExam", "otherRadiologicalExamSDetails", "breastBiopsy", "dateBreastBiopsy", "breastBiopsyDetails", "erIntensity", "erPercentage", "erStatus", "prIntensity", "prPercentage", "prStatus", "herIntensity", "herFish", "herStatus", "grade", "nuclearGrade", "ki67", "histologicalType", "pdl1CPS", "pdl1Value", "nodalCytology", "otherBiopsy", "dateOtherBiopsy", "localisationOtherBiopsy", "otherBiopsyDetails", "ca153", "ace") SELECT "id", "consultationId", "patientId", "dateOfConsultation", "consultationType", "anatomicArea", "main_reason", "cancerDetection", "historyOnco", "symptoms", "symptomsTxt", "height", "weight", "bmi", "performansStatus", "generalExamination", "tumorSide3cl", "clinicalTumorSizeMm", "clinicalTumorStageT", "lymphNodeInvasion", "clinicalTumorStageN", "inflammatorySigns", "mammography", "dateMammography", "acrClassification", "mammographyDetails", "breastEchography", "dateBreastEchography", "breastEchographyDetails", "breastMri", "dateBreastMri", "breastMriDetails", "otherRadiologicalExam", "dateOtherRadiologicalExam", "whichRadiologicalExam", "otherRadiologicalExamSDetails", "breastBiopsy", "dateBreastBiopsy", "breastBiopsyDetails", "erIntensity", "erPercentage", "erStatus", "prIntensity", "prPercentage", "prStatus", "herIntensity", "herFish", "herStatus", "grade", "nuclearGrade", "ki67", "histologicalType", "pdl1CPS", "pdl1Value", "nodalCytology", "otherBiopsy", "dateOtherBiopsy", "localisationOtherBiopsy", "otherBiopsyDetails", "ca153", "ace" FROM "temporary_consultation"`);
        await queryRunner.query(`DROP TABLE "temporary_consultation"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" varchar PRIMARY KEY , "username" text , "email" text , "password" text , "user_role" text, "date" datetime  DEFAULT (CURRENT_TIMESTAMP), "RPPS" text, "speciality" text, "titre" text, "name" text, "firstname" text, "nameInstitution" text, "address" text, "postalCode" text, "city" text, "country" text, "nbInstitution" text, "mobile" text)`);
        await queryRunner.query(`INSERT INTO "user"("id", "username", "email", "password", "user_role", "date", "RPPS", "speciality", "titre", "name", "firstname", "nameInstitution", "address", "postalCode", "city", "country", "nbInstitution", "mobile") SELECT "id", "username", "email", "password", "user_role", "date", "RPPS", "speciality", "titre", "name", "firstname", "nameInstitution", "address", "postalCode", "city", "country", "nbInstitution", "mobile" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`DROP TABLE "consultation"`);
    }

}
