import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { QueryFailedError, Repository } from 'typeorm';
import { Patient } from './patient.entity';
import { CreatePatientDTO } from './createPatientDTO';

/** This is a Patient Service component that provides the busines logic to our patient component
 *  It has functions such as 
 *  getAllPatient --> get the data of all patients for a particular doctor
 *  createPatient --> register a new patient in db for ultrasound
 *  getPatientById --> get the data of a patient by its patientId
 *  attachVideo --> save the location of ultrasound video of a patient
 */ 

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) {} /** Dependency Injection of patientRepository */ 

  async getAllPatient(userId: number): Promise<Patient[] | null> {
    return await this.patientRepository.find({
      where: { userId },
    });
  }

  async createPatient(createPatientDTO: CreatePatientDTO) {
    try {
        const existing = await this.patientRepository.findOne({where : {patientId : createPatientDTO.patientId}})
        if (existing){
            throw new ConflictException ('Patient Already exist with this Id');
        }
      return await this.patientRepository.save(createPatientDTO);
    } catch (err) {
      if (err instanceof QueryFailedError && (err as any).code === '23505') {
        throw new BadRequestException('Patient Already exist with this Id');
      }
      throw err;
    }
  }

  getPatientById(patientId: number) {
    return this.patientRepository.findOneBy({ patientId });
  }

  async attachVideo(patientId: number, fileName :string){
    const patient = await this.patientRepository.findOneBy({ patientId });
    if(!patient){
        throw new BadRequestException ("Patient not found")
    }
    patient.ultrasound_video_path = `/videos/${fileName}`
    return await this.patientRepository.save(patient)

  }
}
