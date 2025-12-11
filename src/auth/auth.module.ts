import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt/jwt.strategy';
import { MfaService } from './mfa/mfa.service';
import { EmailService } from './email.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'custom_mfa',
      signOptions: { expiresIn: '10s' }, // the JWT tolen will get expired in 1hr
    }),
  ],
  providers: [AuthService, JwtStrategy, MfaService, EmailService],
  controllers: [AuthController],
  exports: [EmailService],
  
})
export class AuthModule {}
