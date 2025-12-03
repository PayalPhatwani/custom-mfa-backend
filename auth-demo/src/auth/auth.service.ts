import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService){}

    async validateUser(email: string,password: string){
        console.log("user: ",email,"password: ",password)
        const user = await this.usersService.findByEmail(email);
        if(!user){
            console.log("user not found: Auth service");
            return null;
        } 

        const passwordValid = await bcrypt.compare(password,user.password);
        if(!passwordValid){
            console.log("password don't match: Auth service");
            return null; 
        }
        console.log("User Found: Auth service ",user)
        return user;
    }

    async login(user: any){
        const payload = {email: user.email, sub: user.id};
        return{
            access_token: this.jwtService.sign(payload),
        };
    }
}
