import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDTO } from './createUserDTO';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { UpdateUserDTO } from './updateUserDTO';
import * as bcrypt from 'bcrypt'


/** This is a User Service component that provides the busines logic to our user component
 *  It has functions such as 
 *  getAllUser --> get the data of all users 
 *  createUser --> register a new user in db
 *  getuserById --> get the data of a user by its userId
 *  updateuserById --> update the data of a user by its userId
 *  deleteuserById --> get the data of a patient by its userId
 *  findByEmailId --> find the data of user through there emailId, this function is used in authService for Login functionality
 */ 
@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
  ) {}

    
    async getAllUsers(): Promise <User[]>{
        return await this.usersRepository.find();
    }

    async createUser(createUserDTO : CreateUserDTO) {
        try{
            const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(createUserDTO.password, saltRounds)
        const newUserData = {...createUserDTO, password : hashedPassword}
        return await this.usersRepository.save(newUserData)
        }
        catch(err){
            if(err instanceof QueryFailedError && (err as any).code === '23505'){
                throw new BadRequestException("User Already exist with this email")
            }
            throw err
        }
    }

    getUserById(userId : number) {
        return this.usersRepository.findOneBy({userId})
    }
    updateUserById(updateUserDTO: UpdateUserDTO, userId : number) {
        return this.usersRepository.update(userId, updateUserDTO);
    }
        
    deleteUserById(userId: number){
        return this.usersRepository.delete(userId)
    }

    findByEmailId(emailId : string){
        return this.usersRepository.findOneBy({emailId})
    }
}
