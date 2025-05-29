import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { AuthModule } from 'src/auth/auth.module';
import { ProfileService } from './profileservice';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

@Module({
    controllers : [ProfileController],
    providers: [ProfileService],
    imports:[AuthModule, UserModule]
    
})
export class ProfileModule {}