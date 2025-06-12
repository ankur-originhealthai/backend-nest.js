import { Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Exam } from './exam.entity';



@Injectable()
export class ExamService {
    constructor(
        @InjectRepository(Exam)
        private recordingRepository : Repository<Exam>) {}

        

    
}
