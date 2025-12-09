import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bycrypt from 'bcrypt';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepo: Repository<User>
    ){}

    async create(createUserDto: CreateUserDto ): Promise<Partial<User>>{
        const { name, email, password } = createUserDto;

        //check email exits
        const existing = await this.usersRepo.findOne({where: {email}});
        if(existing){
            throw new ConflictException('Email already in use');
        }

        const saltRounds = 10
        const hashed = await bycrypt.hash(password,saltRounds);

        const user = this.usersRepo.create({
            name,
            email,
            password: hashed,
        });

        await this.usersRepo.save(user);
        console.log("user created ",user);




        // don't return password
        const { password: _, ...result} = user;
        return result;
    }

    findByEmail(email: string){
        return this.usersRepo.findOne({ where: { email }});
    }

    async validateUser(email: string, password: string){
        const user = await this.usersRepo.findOne({where: {email}});

        if (!user){
            console.log("user not found")
            return null; // user not found
        }

        const passwordValid = await bycrypt.compare(password,user.password);
        if(!passwordValid){
            console.log("wrong password")
            return null; // wrong password
        }

        return user;
    } 
}
