import { UserMongoDBService } from '../../database/services/user.service';
import { UserModel, UserLoginDTO } from '../../models/user.model';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private userDBService: UserMongoDBService,
              private jwtService: JwtService) {
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userDBService.findByUsername(username);
    console.log(user)
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(userLogin: UserLoginDTO): Promise<{ token: string }> {
    const user = await this.userDBService.findByUsername(userLogin.username);
    if (!!user && user.password === userLogin.password) {
      return {
        token: this.jwtService.sign({
          username: userLogin.username
        }),
      }
    }
    return null;
  }

  async create(userLogin: UserLoginDTO) {
    return this.userDBService.create(userLogin);
  }
}
