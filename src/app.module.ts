import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { VideoController } from './video/video.controller';
import { Video } from './video/video';
import { VideoModule } from './video/video.module';
import { PatientModule } from './patient/patient.module';
import { Patient } from './patient/patient.entity';


/** This is a app Module component that wraps up all the components of whole app
 *  It imports TypeORM Module, UserModule, AuthModule, VideoModule and PatientModule
 * 
 */ 

@Module({
  imports: [UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [User, Patient],
      synchronize: true,
    }),
    AuthModule,
    ProfileModule,
    VideoModule,
    PatientModule,
  ],
  controllers: [AppController, VideoController],
  providers: [AppService, Video],
})
export class AppModule { }
