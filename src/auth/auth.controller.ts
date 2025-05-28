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
        secure: false
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