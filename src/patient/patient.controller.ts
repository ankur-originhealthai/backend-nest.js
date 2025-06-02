import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PatientService } from './patient.service';
import { CreatePatientDTO } from './createPatientDTO';

/** This is a Patient Controller component that serves the request for patient's api
 * It serves the request for 
 * /patient --> To get all the patients for a particular doctor
 * patient/:patientId/  --> To get a patient id by there patientId
 * /patientData --> Add new patient to the database
 * All these routes are secured via jwt strategy
 */

@Controller('patient')
export class PatientController {
  constructor(private patientService: PatientService) {}
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.patientService.getAllPatient(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/patientData')
  createUser(@Body() createPatientDTO: CreatePatientDTO) {
    return this.patientService.createPatient(createPatientDTO);
  }

  
  @UseGuards(AuthGuard('jwt'))
  @Get('/:patientId')
  getUserById(@Param('patientId', ParseIntPipe) patientId: number) {
    return this.patientService.getPatientById(patientId);
  }

  

}
