import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService} from './auth.service';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [AuthController],
  imports: [forwardRef(() => UserModule), PassportModule,
  JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1hr' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, JwtStrategy]
})
export class AuthModule {}
