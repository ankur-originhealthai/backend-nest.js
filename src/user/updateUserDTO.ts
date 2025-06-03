import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

/** This is a Data Transfer Object for User's data 
 */ 

export class UpdateUserDTO{
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

    @IsString()
    @MinLength(3)
    @MaxLength(20)
    disease: string
}