import { Module, forwardRef } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';

import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { FacebookStrategy } from './strategies/facebook.strategy';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'dotenv';
import { AuthorizationGuard } from './auth.guard';
config();
@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    GoogleStrategy,
    FacebookStrategy,
    AuthorizationGuard,
  ],
  exports: [AuthorizationGuard],
})
export class AuthModule {}
