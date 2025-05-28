import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

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
}
 