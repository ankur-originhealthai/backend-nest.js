import {
  IsNumber,
  IsNotEmpty,
  IsString,
  IsEmail,
  IsOptional,
  isStrongPassword,
  isPhoneNumber,
  IsStrongPassword,
  MaxLength,
  MinLength,
  isNumber,
  IsDate,
  isDecimal,
  IsDecimal,
} from 'class-validator';
import { isFloat32Array } from 'util/types';

/** This is a Data Transfer Object for Patient's data
 */

export class CreateRecordingDTO {

  @IsNumber()
  patientId: number;

  @IsDecimal()
  startTime: number;


  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  ultrasound_video: string;
}
