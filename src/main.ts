import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser()) //cookie parser to store the token in the cookies 
  app.enableCors({
      origin: 'http://localhost:3000', //allow the access of api in localhost:3000
      credentials: true,
    });
  app.useGlobalPipes(
    new ValidationPipe({ 
      whitelist : true //only allow the data in body for which there are DTO's defined
    })
  )
  app.use('/videos', express.static(join(__dirname, '..','videos'))) // serve the recorded videos

  const config = new DocumentBuilder()
    .setTitle('Ultrasound API')
    .setDescription('Doctor registration and Patients details api')
    .setVersion('1.0')
    .build()
  const documentFactory = () => SwaggerModule.createDocument(app, config); // documentation of the api using swagger interface
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(3001);
}
bootstrap();
