import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { PatientModule } from './patient/patient.module';
import { Patient } from './patient/patient.entity';
import { RecordingModule } from './recording/recording.module';
import { Recordings } from './recording/recording.entity';
import { Exam } from './exam/exam.entity';



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
      entities: [User, Patient, Recordings, Exam],
      synchronize: true,
    }),
    AuthModule,
    ProfileModule,
    PatientModule,
    RecordingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
