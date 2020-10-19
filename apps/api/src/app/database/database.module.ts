import { Module } from '@nestjs/common';
import { databaseProviders } from './providers/database.provider';
import { UserMongoDBService } from './services/user.service';
import { PatientsMongoDBService } from './services/patients.service';
import { AppointmentsMongoDBService } from './services/appointments.service';

const services = [
  UserMongoDBService,
  PatientsMongoDBService,
  AppointmentsMongoDBService
]

@Module({
  imports: [],
  providers: [
    ...databaseProviders,
    ...services
  ],
  exports: [
    ...services
  ]
})
export class DatabaseModule {}

