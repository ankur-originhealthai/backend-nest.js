
import { IsNumber, IsNotEmpty, IsString, IsEmail, IsOptional, isStrongPassword, isPhoneNumber, IsStrongPassword } from 'class-validator';

export class CreatePatientDTO {
    @IsNumber()
    patientId: number;

    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsOptional()
    @IsString()
    disease: string

    @IsNumber()
    userId: number;

    @IsOptional()
    @IsString()
    ultrasound_video: string;




}