import { Patient } from 'src/patient/patient.entity';
import { Recordings } from 'src/recording/recording.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

/**
 * Patient's table column and there data types.
 */

@Entity()
@Unique(['examId'])

export class Exam {
  
  @Unique(['examId'])
  @PrimaryGeneratedColumn()
  examId: number;

  @ManyToOne(() => Patient, (p) => p.exams, { eager: true })
  @JoinColumn({ name: 'patientId' })
  patient: Patient;
  @Column()
  patientId: number;

  @OneToMany(() => Recordings, (recording)=> recording.exams)
  recordings : Recordings []

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
  

}
