import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser())
  app.enableCors({
      origin: 'http://localhost:3000',
      credentials: true,
    });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist : true
    })
  )
  app.use('/videos', express.static(join(__dirname, '..','videos')))

  const config = new DocumentBuilder()
    .setTitle('Ultrasound API')
    .setDescription('Doctor registration and Patients details api')
    .setVersion('1.0')
    .build()
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(3001);
}
bootstrap();
