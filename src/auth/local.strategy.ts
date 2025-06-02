
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

/** This is a local jwt component that validates the user and genearate the jwt token for the user
 */ 

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super(
        {usernameField : 'emailId'}
    );
  }

  async validate(emailId: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(emailId, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
