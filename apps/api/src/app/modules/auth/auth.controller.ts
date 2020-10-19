import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Request,
  UnauthorizedException,
  UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDTO } from '../../models/user.model';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AppConstants } from '../../models/constants/app.constants';

@Controller('auth')
@ApiTags('AUTH')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Body() userLogin: UserLoginDTO) {
    const payload = await this.authService.login(userLogin)
    return payload || new UnauthorizedException('Invalid User').getResponse()
  }

  @Get('')
  @ApiBearerAuth()
  @UseGuards(AuthGuard(AppConstants.STRATEGY))
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('creat-user')
  public async createUser(@Body() userLogin: UserLoginDTO) {
    return await this.authService.create(userLogin);
  }

}
