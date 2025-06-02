import { Patient } from "src/patient/patient.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

/**
 * user's table column and there data types.
 */

@Entity()
@Unique(['emailId'])
export class User{
@PrimaryGeneratedColumn()
  userId: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  emailId: string;

  @Column()
  password : string;

  @Column({type: 'varchar', default : 'None'})
  disease : string

  @OneToMany(() => Patient, (patient) => patient.user)
  patients: Patient[];
}
 