import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { QueryFailedError, Repository } from 'typeorm';
import { Patient } from './patient.entity';
import { CreatePatientDTO } from './createPatientDTO';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) {}

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
