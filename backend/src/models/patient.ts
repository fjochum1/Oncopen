import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Consultation from './consultation';

@Entity()
export default class Patient {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text', nullable: false })
  firstName!: string;

  @Column({ type: 'text', nullable: false })
  lastName!: string;

  @Column({ type: 'text' })
  dateOfBirth!: string;

  @Column({ type: 'text' })
  sex!: string;

  // One-to-many relationship with Consultation
  @OneToMany(() => Consultation, consultation => consultation.patient)
  consultations!: Consultation[];
}

