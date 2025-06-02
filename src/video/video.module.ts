import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PatientModule } from 'src/patient/patient.module';


/** This is a Video Module component that wraps up all the components of video component
 *  It imports Patient Module and AuthModule.
 * 
 */ 


@Module({})
export class VideoModule {
    imports : [PatientModule, AuthModule]
}