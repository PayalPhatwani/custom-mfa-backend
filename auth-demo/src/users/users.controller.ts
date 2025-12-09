import { Controller, Post, Body, HttpCode, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UsersController {
    constructor(private usersService: UsersService){}

    @Post('register')
    @HttpCode(201)
    async register(@Body() CreateUserDto: CreateUserDto){
        const user = await this.usersService.create(CreateUserDto);
        return { message: 'User registered',user };
    }

}
