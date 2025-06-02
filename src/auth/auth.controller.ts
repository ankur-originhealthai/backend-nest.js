import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './loginDTO';
import { UserService } from 'src/user/user.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

/** This is a Auth Controller component that serves the request for login and logout 
 * It uses local strategy with passport to generate a jwt token that provides the authentication to a user.
 * The Token is stored in cookies using res.cookies.
 * It serves the request for /auth/login and /auth/logout
 */

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @UseGuards(AuthGuard('local'))
  @Post('/login')

  // login(@Body() loginDTO: LoginDTO){
  //         return this.authService.login(loginDTO.emailId, loginDTO.password)
  //     }
  async login(@Request() req: any, @Res() res: Response) {
    
      const token = await this.authService.login(req.user);
      res.cookie('token', token.access_token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
        expires: new Date(Date.now() + 60 * 60 * 1000)
      });

      return res.json({
        data: req.user
      });
  }

  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('token');
    return res.send({ message: 'Logged out' });
  }
}