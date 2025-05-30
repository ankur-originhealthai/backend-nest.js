import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

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

  @Column({nullable: true})
  ultrasound_video_path: string;

  @ManyToOne(() => User, (user) => user.patients, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: User;
  @Column()
  userId: number;

  
}
