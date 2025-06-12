import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { QueryFailedError, Repository } from 'typeorm';
import { Patient } from './patient.entity';
import { CreatePatientDTO } from './createPatientDTO';
import { Exam } from 'src/exam/exam.entity';

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
    @InjectRepository(Exam)
    private examRepository: Repository<Exam>,
  ) {} /** Dependency Injection of patientRepository */ 

  async getAllPatient(userId: number): Promise<Patient[] | null> {
    return await this.patientRepository.find({
      where: { userId },
    });
  }

  async createPatient(createPatientDTO: CreatePatientDTO) {
    try {
        let patient = await this.patientRepository.findOne({where : {patientId : createPatientDTO.patientId}})
        if (!patient){
            patient = await this.patientRepository.save(createPatientDTO);
        }
        const patientId = patient.patientId

        const exam = this.examRepository.create({patientId})
        await this.examRepository.save(exam);
      return {examId : exam.examId};
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

}
