import { Controller, Post, Body, UnauthorizedException, UseGuards,Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){} // constructor dependency injection

    @Post('login')
    async login(@Body() loginDto: LoginUserDto){
        const user = await this.authService.validateUser(loginDto.email,loginDto.password);
        if(!user) throw new UnauthorizedException('Invalid credentials');

        return this.authService.login(user);
    }

    @UseGuards(JwtAuthGuard) // [1]
    @Get('home')
    getHome(@Req() req){
        return { message: `Welcome ${req.user.email} to the home page!`};
    }

}

/*
[1]
/**
 * ===================== JWT Auth Guard Flow =====================
 *
 * STEP A → Guard is triggered
 * AuthGuard('jwt') intercepts every incoming request before it reaches the route handler.
 *
 * STEP B → Guard looks for the JWT token in the request header:
 *     Authorization: Bearer <access_token>
 *
 * - If no token is present → Nest throws 401 Unauthorized.
 * - If a token exists → the guard continues to the next step.
 *
 * STEP C → Token is validated using JwtStrategy
 *
 * JwtStrategy checks:
 *   - Is the token signed using the correct secret?
 *   - Is the token expired?
 *   - Is the signature valid?
 *   - Is the payload structure correct?
 *
 * - If invalid → 401 Unauthorized
 * - If valid → the request is allowed to proceed
 *
 * STEP D → Guard injects the decoded JWT payload into req.user
 *
 * Example payload:
 * {
 *   "sub": 1,
 *   "email": "user@example.com"
 * }
 *
 * This payload is now available as:
 *     req.user
 *
 * The controller can access the logged-in user's details from this object.
 *
 * STEP E → Since the guard passed, NestJS executes the controller method
 *
 * Example:
 *     getHome() {
 *         return "Welcome!";
 *     }
 *
 * Only authenticated users (with valid JWT) will receive this response.
 *
 * ===============================================================
 */

