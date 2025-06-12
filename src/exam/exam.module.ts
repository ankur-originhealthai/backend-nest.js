import { Module } from '@nestjs/common';

import { ExamController } from './exam.controller';
import { PatientModule } from 'src/patient/patient.module';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exam } from './exam.entity';
import { ExamService } from './exam.service';
import { Patient } from 'src/patient/patient.entity';


@Module({
  providers: [ExamService],
  controllers: [ExamController],
  imports : [TypeOrmModule.forFeature([Exam, Patient]),PatientModule, AuthModule],
 
})
export class ExamModule {}
