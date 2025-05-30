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
