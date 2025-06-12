import { Exam } from 'src/exam/exam.entity';
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
@Unique(['patientId'])

export class Patient {
  @Unique(['patientId'])
  @PrimaryColumn()
  patientId: number;


  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'varchar', default: 'None' })
  disease: string;

  @ManyToOne(() => User, (user) => user.patients, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: User;
  @Column()
  userId: number;

   @OneToMany(() => Recordings, (exam) => exam.patient)
  exam: Recordings[];

  @OneToMany(() => Exam, (exam) => exam.patient)
  exams: Exam[];

  @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;



  
}
