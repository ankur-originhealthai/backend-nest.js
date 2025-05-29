import { Body, Controller, Get, Param, ParseIntPipe, Post, Res } from '@nestjs/common';
import { join } from 'path';
import { Response } from 'express';
import * as ffmpeg from 'fluent-ffmpeg';

import { existsSync, mkdirSync } from 'fs';
import { PatientService } from 'src/patient/patient.service';
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

@Controller('video')
export class VideoController {
  constructor(private patientService: PatientService) {}

  @Get('/stream')
  async getStream(@Res() res: Response) {
    const path = join(__dirname, '..', '..', 'videos', 'ultrasound.mp4');
    res.sendFile(path);
  }

  @Post('/record')
  async record(
    @Body() body : {patientId: number},
    @Res() res: Response,
  ) {
    const {patientId} = body
    const fileName = `patient-${patientId}.mp4`;
    const inputPath = join(__dirname, '..', '..', 'videos', 'ultrasound.mp4');
    const outputFolder = join(__dirname, '..', '..', 'videos');
    const outputPath = join(outputFolder, fileName)
    
    if (!existsSync(outputFolder)) {
      mkdirSync(outputFolder);
    }
    ffmpeg(inputPath)
      .setStartTime(0)
      .duration(5)
      .output(outputPath)
      .on('start', (cmdLine) => {
        console.log('Started ffmpeg with command:', cmdLine);
      })
      .on('end', async () => {
        console.log('Recording complete');
        await this.patientService.attachVideo(patientId, fileName);
        res.json({message: "Recording Saved",fileName, videoUrl: "http://localhost:3001/videos/" + fileName})
        
      })
      .on('error', (err) => {
        console.error('Recording error:', err);
        res.status(500).send('Recording failed');
      })
      .run();
    

    
  }
}
