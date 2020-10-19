import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppointmentsAPIService } from './appointments.service';
import { PatientsAPIService } from './patients.service';
import { AuthAPIService } from './auth.service';

const services = [
  AppointmentsAPIService,
  PatientsAPIService,
  AuthAPIService
]

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: services
})
export class ApiModule {}
