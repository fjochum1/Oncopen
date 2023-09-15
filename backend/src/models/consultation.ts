import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	ManyToOne,
	JoinColumn,
	Unique
} from 'typeorm';
import Patient from './patient';

@Entity()
@Unique(['patientId', 'consultationId']) // Ensure consultationId is unique per patient
export default class Consultation {

	// UUID for the primary key of the Consultation table
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	// Another unique id for consultation, unique within each patient
	@Column({ type: 'int', unique: true })
	consultationId!: number;

	// A foreign key linking to the Patient table
	@ManyToOne(() => Patient, patient => patient.consultations)
	@JoinColumn({ name: 'patientId' }) // This creates the database column named 'patientId'
	patient!: Patient;

	@Column({ type: 'uuid' })
	patientId!: string; // This stores the actual foreign key value

	// Date type for the consultation date, which will be automatically generated upon creation
	@CreateDateColumn()
	dateOfConsultation!: Date;

	@Column({ type: 'text'})
	consultationType!: 'First' | 'Follow-up';

	@Column({ type: 'text'})
	anatomicArea?: 'Breast' | 'Pelvis';

	@Column({ type: 'text' })
	main_reason?: string;

	@Column({ type: 'text'})
	cancerDetection?: 'Screening' | 'Symptoms' | 'Unknown';

	@Column({ type: 'text' })
	historyOnco?: string;

	@Column({ type: 'text'})
	symptoms?: 'No' | 'Yes';

	@Column({ type: 'text' })
	symptomsTxt?: string;

	@Column({ type: 'int' })
	height?: number;

	@Column({ type: 'int' })
	weight?: number;

	@Column({ type: 'double precision' })
	bmi?: number;

	@Column({ type: 'text'})
	performansStatus?: '0' | '1' | '2' | '3' | '4';

	@Column({ type: 'text' })
	generalExamination?: string;

	@Column({ type: 'text'})
	tumorSide3cl?: 'Left' | 'Right' | 'Bilateral';

	@Column({ type: 'int' })
	clinicalTumorSizeMm?: number;

	@Column({ type: 'text' })
	clinicalTumorStageT?: string;

	@Column({ type: 'text' })
	lymphNodeInvasion?: string;

	@Column({ type: 'text' })
	clinicalTumorStageN?: string;

	@Column({ type: 'text'})
	inflammatorySigns?: 'No' | 'Yes';

	@Column({ type: 'text'})
	mammography?: 'No' | 'Yes';

	@Column({ type: 'date' })
	dateMammography?: Date;

	@Column({ type: 'text'})
	acrClassification?: 'ACR 0' | 'ACR 1' | 'ACR 2' | 'ACR 3' | 'ACR 4' | 'ACR 5' | 'ACR 6';

	@Column({ type: 'text' })
	mammographyDetails?: string;

	@Column({ type: 'text'})
	breastEchography?: 'No' | 'Yes';

	@Column({ type: 'date' })
	dateBreastEchography?: Date;

	@Column({ type: 'text' })
	breastEchographyDetails?: string;

	@Column({ type: 'text'})
	breastMri?: 'No' | 'Yes';

	@Column({ type: 'date' })
	dateBreastMri?: Date;

	@Column({ type: 'text' })
	breastMriDetails?: string;

	@Column({ type: 'text'})
	otherRadiologicalExam?: 'No' | 'Yes';

	@Column({ type: 'date' })
	dateOtherRadiologicalExam?: Date;

	@Column({ type: 'text' })
	whichRadiologicalExam?: string;

	@Column({ type: 'text' })
	otherRadiologicalExamSDetails?: string;

	@Column({ type: 'text'})
	breastBiopsy?: 'No' | 'Yes';

	@Column({ type: 'date', nullable: true })
	dateBreastBiopsy?: Date;

	@Column({ type: 'text', nullable: true })
	breastBiopsyDetails?: string;

	@Column({ type: 'text', nullable: true })
	erIntensity?: string; // +, ++, +++

	@Column({ type: 'int', nullable: true })
	erPercentage?: number;

	@Column({ type: 'text', nullable: true })
	erStatus?: string;

	@Column({ type: 'text', nullable: true })
	prIntensity?: string;

	@Column({ type: 'int', nullable: true })
	prPercentage?: number;

	@Column({ type: 'text', nullable: true })
	prStatus?: string;

	@Column({ type: 'text', nullable: true })
	herIntensity?: string;

	@Column({ type: 'text', nullable: true })
	herFish?: string;

	@Column({ type: 'text', nullable: true })
	herStatus?: string;

	@Column({ type: 'int', nullable: true })
	grade?: number;

	@Column({ type: 'int', nullable: true })
	nuclearGrade?: number;

	@Column({ type: 'text', nullable: true })
	ki67?: string;

	@Column({ type: 'text', nullable: true })
	histologicalType?: string;

	@Column({ type: 'text', nullable: true })
	pdl1CPS?: string;

	@Column({ type: 'text', nullable: true })
	pdl1Value?: string;

	@Column({ type: 'text', nullable: true })
	nodalCytology?: string;

	@Column({ type: 'text', nullable: true })
	otherBiopsy?: string;

	@Column({ type: 'date', nullable: true })
	dateOtherBiopsy?: Date;

	@Column({ type: 'text', nullable: true })
	localisationOtherBiopsy?: string;

	@Column({ type: 'text', nullable: true })
	otherBiopsyDetails?: string;

	@Column({ type: 'text', nullable: true })
	ca153?: string;

	@Column({ type: 'text', nullable: true })
	ace?: string;
}


