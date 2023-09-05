import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Patient {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text', nullable: false })
  firstName!: string;

  @Column({ type: 'text', nullable: false })
  lastName!: string;

  @Column({ type: 'number', nullable: false })
  age!: string;

  @Column({ type: 'datetime'})
  dateOfBirth?: string;

  @Column({type: 'text'})
  sex!: string
}
