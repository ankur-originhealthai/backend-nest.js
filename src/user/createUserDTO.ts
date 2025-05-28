
import { IsNumber, IsNotEmpty, IsString, IsEmail, IsOptional, isStrongPassword, isPhoneNumber, IsStrongPassword } from 'class-validator';

export class CreateUserDTO {
    @IsNumber()
    @IsOptional()
    userId: number;

    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsEmail()
    emailId: string;

    @IsStrongPassword()
    password: string
    
    @IsOptional()
    @IsString()
    disease: string



}