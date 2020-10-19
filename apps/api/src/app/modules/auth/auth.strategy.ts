import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ExtractJwt } from 'passport-jwt';
import { JWTPayload } from '../../models/user.model';
import { AppConstants } from '../../models/constants/app.constants';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, AppConstants.STRATEGY) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JWTPayload) {
    console.log(payload)
    return { username: payload.username };
  }
}
