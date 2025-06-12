

/** This is a Video Controller component that serves the request for video api.
 * It serves the request for 
 * /stream --> Send the video to frontend through sendFile method
 * /record --> To record the video using FFMPEG and 
 * also call the attachVideo function from patientService to send the location of recorded video
 * All these routes are secured via jwt strategy
 */

import { Controller } from "@nestjs/common";
import { ExamService } from "./exam.service";

@Controller('stream')
export class ExamController {
  constructor(private examService : ExamService) {}


  



}
