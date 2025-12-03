import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto{
    @IsEmail({},{message: 'Email is not valid'})
    email: string;

    @IsNotEmpty({message: 'Password is required'})
    @IsString({message: 'Password must be a string'})
    password: string;
}