import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { AuthModule } from 'src/auth/auth.module';
import { ProfileService } from './profileservice';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

/** This is a Profile Module component that wraps up all the components of profile component 
 *  It imports AuthModule and UserModule
 */ 

@Module({
    controllers : [ProfileController],
    providers: [ProfileService],
    imports:[AuthModule, UserModule]
    
})
export class ProfileModule {}