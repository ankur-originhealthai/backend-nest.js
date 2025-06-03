
import { IsNumber, IsNotEmpty, IsString, IsEmail, IsOptional, isStrongPassword, isPhoneNumber, IsStrongPassword, MaxLength, MinLength } from 'class-validator';


/** This is a Data Transfer Object for Patient's data 
 */  


export class CreatePatientDTO {
    @IsNumber()
    patientId: number;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    firstName: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    lastName: string;

    @IsOptional()
    @IsString()
    disease: string

    @IsNumber()
    userId: number;

    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    ultrasound_video: string;




}