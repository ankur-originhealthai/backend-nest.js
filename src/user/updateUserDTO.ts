import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

/** This is a Data Transfer Object for User's data 
 */ 

export class UpdateUserDTO{
        @IsNumber()
    @IsOptional()
    userId: number;

    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsString()
    disease: string
}