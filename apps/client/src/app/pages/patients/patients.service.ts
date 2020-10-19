import { Injectable } from '@angular/core';
import { PatientsAPIService } from '../../shared/api-services/patients.service';
import { PatientModel } from '../../shared/models/patient.model';
import { AppointmentsAPIService } from '../../shared/api-services/appointments.service';

@Injectable()
export class PatientsService {
  constructor(private patientsAPIService: PatientsAPIService,
              private appointmentsAPIService: AppointmentsAPIService) {
  }

  upsert(value: PatientModel) {
    return this.patientsAPIService.upsert(value)
  }

  getById(id: string) {
    return this.patientsAPIService.getById(id);
  }

  getPatients(skip: number, limit: 10) {
    return this.patientsAPIService.getPatients(skip, limit);
  }

  delete(_id: string) {
    return this.patientsAPIService.delete(_id).toPromise();
  }

  getPatientAppointments(skip: any, limit: any, _id: string) {
    return this.appointmentsAPIService.getByPatientId(skip, limit, _id).toPromise()
  }
}
