import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AppointmentsController],
  providers: [AppointmentsService]
})
export class AppointmentsModule {}
