import { Module } from '@nestjs/common';
import { RecordingService } from './recording.service';
import { RecordingController } from './recording.controller';
import { PatientModule } from 'src/patient/patient.module';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recordings } from './recording.entity';
import { Patient } from 'src/patient/patient.entity';
import { Exam } from 'src/exam/exam.entity';


@Module({
  providers: [RecordingService],
  controllers: [RecordingController],
  imports : [TypeOrmModule.forFeature([Recordings, Patient, Exam]),PatientModule, AuthModule],
  exports : [RecordingService]
})
export class RecordingModule {}
