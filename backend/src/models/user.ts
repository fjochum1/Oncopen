import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text', nullable: false })
  username!: string;

  @Column({ type: 'text', nullable: false })
  email!: string;

  @Column({ type: 'text', nullable: false })
  password!: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  date?: string;

  @Column({type: 'text'})
  user_role!: string

  @Column({type: 'text'})
  RPPS?: string

  @Column({type: 'text'})
  speciality?: string

  @Column({type: 'text'})
  titre?: string

  @Column({type: 'text'})
  name?: string

  @Column({type: 'text'})
  firstname?: string

  @Column({type: 'text'})
  nameInstitution?: string

  @Column({type: 'text'})
  address?: string

  @Column({type: 'text'})
  postalCode?: string

  @Column({type: 'text'})
  city?: string

  @Column({type: 'text'})
  country?: string

  @Column({type: 'text'})
  nbInstitution?: string

  @Column({type: 'text'})
  mobile?: string



}
