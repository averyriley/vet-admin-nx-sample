import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JWTStrategy } from './auth.strategy';
import { AuthService } from './auth.service';
import { AppConstants } from '../../models/constants/app.constants';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({
      defaultStrategy: AppConstants.STRATEGY,
      property: 'user',
      session: false
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d', algorithm: 'HS384' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JWTStrategy],
  exports: [PassportModule, AuthService]
})
export class AuthModule {}
