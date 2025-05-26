import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './createUserDTO';

@Injectable()
export class UserService{

    getAllUsers() {
        return "users are here"
    }

    createUser(createUserDTO : CreateUserDTO){
        return "user created"
    }

    getUserById(param : {userId : number}) {
        return param;
    }
    updateUserById(body: Body, param : {userId : number}) {
        return param;
    }
        
    deleteUserById(param : {userId: number}){
            return "user deleted"
        }
}
