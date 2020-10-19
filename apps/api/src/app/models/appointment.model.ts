import { ApiProperty } from '@nestjs/swagger';

export class AppointmentModel {

  @ApiProperty()
  startTime: number;

  @ApiProperty()
  endTime: number;

  @ApiProperty()
  date: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  isPaid: boolean;

  @ApiProperty()
  patientId: string;

  @ApiProperty()
  fee: number;

  @ApiProperty()
  _id: string;
}
