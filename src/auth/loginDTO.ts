import { IsEmail, IsStrongPassword} from "class-validator";

/** This is a Data Transfer Object for Login user's data
 */ 

export class LoginDTO{
    @IsEmail()
    emailId : string

    @IsStrongPassword()
    password : string
}