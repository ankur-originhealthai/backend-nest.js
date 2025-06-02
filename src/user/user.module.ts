import { forwardRef, Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthModule } from 'src/auth/auth.module';

/** This is a User Module component that wraps up all the components of user component 
 *  It imports TypeORM Module and AuthModule.
 * It exports the userService Module
 */

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService],
  exports : [UserService]
})
export class UserModule {}
