
import { IsNumber, IsNotEmpty, IsString, IsEmail, IsOptional, isStrongPassword, isPhoneNumber, IsStrongPassword, MinLength, MaxLength } from 'class-validator';

/** This is a Data Transfer Object for User's data 
 */ 

export class CreateUserDTO {
    @IsNumber()
    @IsOptional()
    userId: number;

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

    @IsEmail()
    emailId: string;

    @IsStrongPassword()
    password: string
    
    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    disease: string



}