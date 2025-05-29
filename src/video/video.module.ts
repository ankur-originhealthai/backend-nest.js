import { Module } from '@nestjs/common';
import { PatientModule } from 'src/patient/patient.module';

@Module({})
export class VideoModule {
    imports : [PatientModule]
}