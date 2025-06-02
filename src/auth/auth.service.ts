import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDTO } from './loginDTO';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';


/** This is a Auth Service component that provides the busines logic to our auth component
 *  It has functions such as validateUser and login to find the user and use jwt service to generate the auth token
 */ 

@Injectable()
export class AuthService {
    constructor(private userService: UserService,
        private jwtService: JwtService
    ) { }

    async validateUser(emailId: string, password: string) {
        const user = await this.userService.findByEmailId(emailId);

        if (user) {
            if (await bcrypt.compare(password, user.password)) {
                return user;
            }
            else{
                throw new UnauthorizedException ("Invalid Credentials")
            }
        }

    }

    async login(user: any) {
        const payload = { emailId: user.emailId, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
