import { ApiProperty } from '@nestjs/swagger';

export class UserModel {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string
}

export class UserLoginDTO {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string
}

export interface JWTPayload {
  username: string
}
