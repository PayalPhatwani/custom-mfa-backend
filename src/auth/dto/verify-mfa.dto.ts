import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class VerifyMfaDto{
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  code: string;
}