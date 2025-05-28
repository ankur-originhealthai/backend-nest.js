import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './createUserDTO';
import { UpdateUserDTO } from './updateUserDTO';
import { AuthGuard } from '@nestjs/passport';


@Controller('user')
export class UserController {
    constructor (private userService : UserService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get()
    getUser(){
        return this.userService.getAllUsers();
    }

    
    @Post('/signUp')
    createUser(@Body() createUserDTO : CreateUserDTO){
        return this.userService.createUser(createUserDTO);
    }
    
    @UseGuards(AuthGuard('jwt'))
    @Get('/:userId')
    getUserById(@Param('userId', ParseIntPipe) userId: number){
        return this.userService.getUserById(userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch('/:userId')
    updateUserById(@Body() req: UpdateUserDTO, @Param('userId', ParseIntPipe) userId: number){
        return this.userService.updateUserById(req, userId);
    }
    
    @UseGuards(AuthGuard('jwt'))
    @Delete('/:userId')
    deleteUserById(@Param('userId', ParseIntPipe) userId: number){
        return this.userService.deleteUserById(userId)
    }




}
