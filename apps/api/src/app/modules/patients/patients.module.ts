import { Module } from '@nestjs/common';
import { PatientsController } from './patients.controller';
import { DatabaseModule } from '../../database/database.module';
import { PatientsService } from './patients.service';

@Module({
  controllers: [PatientsController],
  imports: [DatabaseModule],
  providers: [PatientsService]
})
export class PatientsModule {}
