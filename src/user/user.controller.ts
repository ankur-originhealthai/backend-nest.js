import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './createUserDTO';


@Controller('user')
export class UserController {
    constructor (private userService : UserService) {}

    @Get()
    getUser(){
        return this.userService.getAllUsers();
    }

    @Post()
    createUser(@Body() createUserDTO : CreateUserDTO){
        return this.userService.getUserById(createUserDTO);
    }
    

    @Post('/:userId')
    getUserById(@Param() param : {userId: number}){
        return this.userService.getUserById(param);
    }

    @Patch('/:userId')
    updateUserById(@Body() req: Body, @Param() param : {userId: number}){
        return this.userService.updateUserById(req, param);
    }

    @Delete('/:userId')
    deleteUserById(@Param() param : {userId: number}){
        return this.userService.getUserById(param);
    }




}
