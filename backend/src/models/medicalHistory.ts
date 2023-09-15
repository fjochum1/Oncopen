import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import Patient from './patient'; // Assurez-vous d'importer correctement le modèle Patient

@Entity()
export default class MedicalHistory {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 10 })
  gender!: string;

  @Column({ type: 'varchar', length: 10 })
  menopause!: string;

  @Column({ type: 'varchar', length: 10 })
  allergies!: string;

  @Column({ type: 'text', nullable: true })
  allergiesDescription!: string | null;

  @Column({ type: 'text', nullable: true })
  lifestyle!: string | null;

  @Column({ type: 'varchar', length: 10 })
  smoke!: string;

  @Column({ type: 'text', nullable: true })
  smokeDescription!: string | null;

  @Column({ type: 'varchar', length: 10 })
  alcohol!: string;

  @Column({ type: 'text', nullable: true })
  alcoholDescription!: string | null;

  @Column({ type: 'integer' })
  gynObsHistory!: number;

  @Column({ type: 'integer' })
  gestityParity!: number;

  @Column({ type: 'varchar', length: 10 })
  contraception!: string;

  @Column({ type: 'varchar', length: 10 })
  medicalHistory!: string;

  @Column({ type: 'text', nullable: true })
  medicalHistoryDescription!: string | null;

  @Column({ type: 'varchar', length: 10 })
  surgicalHistory!: string;

  @Column({ type: 'text', nullable: true })
  surgicalHistoryDescription!: string | null;

  @Column({ type: 'varchar', length: 10 })
  familialHistory!: string;

  @Column({ type: 'text', nullable: true })
  familialHistoryDescription!: string | null;

  @Column({ type: 'varchar', length: 10 })
  personalFamilialHistoryCancer!: string;

  @Column({ type: 'varchar', length: 10 })
  familyBreastCancerHistory!: string;

  @Column({ type: 'text', nullable: true })
  familyBreastCancerHistoryDescription!: string | null;

  @Column({ type: 'varchar', length: 10 })
  suspiLynch!: string;

  @Column({ type: 'varchar', length: 10 })
  mutScreen!: string;

  @Column({ type: 'varchar', length: 30 })
  brcaPalbMut!: string;

  @Column({ type: 'text', nullable: true })
  brcaPalbMutDescription!: string | null;

  @Column({ type: 'varchar', length: 10 })
  comedication!: string;

  @Column({ type: 'text', nullable: true })
  comedicationDescription!: string | null;

  @Column({ type: 'varchar', length: 10 })
  comedicationPlus!: string;

  @Column({ type: 'text', nullable: true })
  comedicationPlusDescription!: string | null;

  @OneToOne(() => Patient)
  @JoinColumn({ name: 'patient_id' })
  patient!: Patient;
}
  