import { BadRequestException, Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from 'src/patient/patient.entity';
import { Repository } from 'typeorm';
import { Recordings } from './recording.entity';
import { join } from 'path';
import { Response } from 'express';
import { Exam } from 'src/exam/exam.entity';

@Injectable()
export class RecordingService {
  constructor(
    @InjectRepository(Recordings)
    private recordingRepository: Repository<Recordings>,

    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,

    @InjectRepository(Exam)
    private examRepository: Repository<Exam>,
  ) {}

  async attachVideo(patientId: number, fileName: string, timeStamp: number) {
    const patient = await this.patientRepository.findOneBy({ patientId });
    if (!patient) {
      throw new BadRequestException('Patient not found');
    }

    const ultrasound_video_path = `/videos/${fileName}`;
    const startTime = timeStamp;
    const exam = await this.examRepository.findOne({
      where: { patientId },
      order: { examId: 'DESC' },
    });
    const examId = exam?.examId;
    return await this.recordingRepository.save({
      patientId,
      ultrasound_video_path,
      startTime,
      examId,
    });
  }

  async getAllRecordings(patientId: number, examId: number | null) {
    if(!examId){
      return []
    }
    const videoRecordings = await this.recordingRepository.find({
      where: { patientId, examId },
      order: { created_at: 'DESC' },
    });
    //const path = join(__dirname, '..', '..', 'videos', 'ultrasound.mp4');
    return videoRecordings.map((rec) => ({
      video: rec.ultrasound_video_path,
      id: rec.recordingId,
    }));
  }

  async deleteRecording(recordingId: number ){
    return await this.recordingRepository.delete(recordingId)
  }
}
