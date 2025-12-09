import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @MinLength(6)
    password: string;

}

/*
Purpose:
    Defines what data is expected from the client (frontend) when creating a user.
    Ensures validation and structure of incoming request data.
    Prevents invalid or extra fields from reaching the service or DB.
Where it’s used in the flow:
    In UsersController: @Body() createUserDto: CreateUserDto
    ValidationPipe automatically checks the data
    Then UsersService receives validated DTO and uses its data to create a new User entity to save in the DB
Think of it as the contract for what the client should send.    

*/