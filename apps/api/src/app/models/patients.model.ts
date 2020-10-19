import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PatientsModel {
  @ApiPropertyOptional()
  _id: string

  @ApiProperty()
  name: string

  @ApiProperty()
  type: string

  @ApiProperty()
  contactInfo: {
    name: string,
    phone: number
  }
}
