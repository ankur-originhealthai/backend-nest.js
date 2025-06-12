import { Body, Controller, Get, Param, ParseIntPipe, Post, Res, UseGuards } from '@nestjs/common';
import { join } from 'path';
import { Response } from 'express';
import * as ffmpeg from 'fluent-ffmpeg';

import { existsSync, mkdirSync } from 'fs';
import { PatientService } from 'src/patient/patient.service';
import { AuthGuard } from '@nestjs/passport';
import { RecordingService } from './recording.service';
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

/** This is a Video Controller component that serves the request for video api.
 * It serves the request for 
 * /stream --> Send the video to frontend through sendFile method
 * /record --> To record the video using FFMPEG and 
 * also call the attachVideo function from patientService to send the location of recorded video
 * All these routes are secured via jwt strategy
 */

@Controller('stream')
export class RecordingController {
  constructor(private recordingService : RecordingService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/video')
  async getStream(@Res() res: Response) {
    const path = join(__dirname, '..', '..', 'videos', 'ultrasound.mp4');
    res.sendFile(path);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/record')
  async record(
    @Body() body : {patientId: number, timeStamp: number, examId: number},
    @Res() res: Response,
  ) {
    const {patientId, timeStamp, examId} = body
    //const patientAlreadyExist = await this.patientService.getPatientById(patientId);

    const fileName = `patient-${patientId}-${examId}-${timeStamp}.mp4`;
    const inputPath = join(__dirname, '..', '..', 'videos', 'ultrasound.mp4');
    const outputFolder = join(__dirname, '..', '..', 'videos');
    const outputPath = join(outputFolder, fileName)
    
    if (!existsSync(outputFolder)) {
      mkdirSync(outputFolder);
    }

    ffmpeg(inputPath)
      .setStartTime(timeStamp)
      .duration(5)
      .output(outputPath)
      .on('start', () => {
        console.log('Started at ', timeStamp);
      })
      .on('end', async () => {
        console.log('Recording complete');
        await this.recordingService.attachVideo(patientId, fileName, timeStamp);
        res.json({message: "Recording Saved",fileName, videoUrl: "http://localhost:3001/videos/" + fileName})
        
      })
      .on('error', (err) => {
        console.error('Recording error:', err);
        res.status(500).send('Recording failed');
      })
      .run();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/recordedVideos')
  getAllVideos(@Body() body: {patientId: number, examId: number}){
    const {patientId, examId} = body
    return this.recordingService.getAllRecordings(patientId, examId)
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/remove')
  deleteRecording(@Body() body: {recordingId: number}){
    const {recordingId} = body
    return this.recordingService.deleteRecording(recordingId)
  }


  



}
