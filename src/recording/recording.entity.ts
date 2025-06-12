import { Exam } from 'src/exam/exam.entity';
import { Patient } from 'src/patient/patient.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
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
@Unique(['recordingId'])

export class Recordings {
  @Unique(['recordingId'])
  @PrimaryGeneratedColumn()
  recordingId: number;

  @ManyToOne(() => Patient, (e) => e.exam, { eager: true })
  @JoinColumn({ name: 'patientId' })
  patient: Patient;
  @Column()
  patientId: number;

  @ManyToOne(() => Exam, (e) => e.recordings, { eager: true })
  @JoinColumn({ name: 'examId' })
  exams: Exam;
  @Column()
  examId: number;

  @Column('float')
  startTime: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({nullable: true})
  ultrasound_video_path: String;
}
