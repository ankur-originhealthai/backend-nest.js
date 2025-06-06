import { Body, Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';

/** This is a Profile Controller component that serves the request for profile api
 * It serves the request for 
 * /profile --> It returns the data of logged in user
 */

class User{
    userId : number
}
@Controller('profile')
export class ProfileController {
    constructor(private userService : UserService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getProfile(@Req() req: Request) {

    const {userId} = req.user as User
    const userData = await this.userService.getUserById(userId)
    return {
      user: userData,  
    };
}
}