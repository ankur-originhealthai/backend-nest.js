import { Module } from '@nestjs/common';

import { PatientController } from './patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Patient } from './patient.entity.js';
import { PatientService } from './patient.service';

@Module({
  providers: [PatientService],
  controllers: [PatientController],
  imports: [TypeOrmModule.forFeature([Patient]), AuthModule],
  exports: [PatientService]
})
export class PatientModule {}
