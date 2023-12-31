-- SQLite
-- PRAGMA foreign_key = ON;

CREATE TABLE medical_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    gender VARCHAR(10), 
    menopause VARCHAR(10), 
    allergies VARCHAR(10), 
    allergiesDescription TEXT,
    lifestyle TEXT,
	smoke VARCHAR(10),
	smokeDescription TEXT,
	alcohol VARCHAR(10),
	alcoholDescription TEXT,
	gynObsHistory INTEGER,
	gestityParity INTEGER,
	contraception VARCHAR(10),
	medicalHistory VARCHAR(10),
	medicalHistoryDescription TEXT,
	surgicalHistory VARCHAR(10),
	surgicalHistoryDescription TEXT,
	familialHistory VARCHAR(10),
	familialHistoryDescription TEXT,
	personalFamilialHistoryCancer VARCHAR(10),
	familyBreastCancerHistory VARCHAR(10),
	familyBreastCancerHistoryDescription TEXT,
	suspiLynch VARCHAR(10),
	mutScreen VARCHAR(10),
	brcaPalbMut VARCHAR(30),
	brcaPalbMutDescription TEXT,
	comedication VARCHAR(10),
	comedicationDescription TEXT,
	comedicationPlus VARCHAR(10),
	comedicationPlusDescription TEXT,
    patient_id INTEGER,
    FOREIGN KEY (patient_id) REFERENCES patient (id)
    );

    SELECT * FROM medical_history;