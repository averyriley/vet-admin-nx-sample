import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppointmentModel } from '../models/appointment.model';

@Injectable()
export class AppointmentsAPIService {
  constructor(private httpClient: HttpClient) { }

  getByPatientId(skip: any, limit: any, _id: string) {
    return this.httpClient.post('/api/appointments/by-patient/' + _id, { skip, limit })
  }

  getById(id: string) {
    return this.httpClient.get<AppointmentModel>('/api/appointments/' + id)
  }

  upsertAppointment(appointment: AppointmentModel) {
    return this.httpClient.post('/api/appointments/', appointment)
  }

  deleteById(_id: string) {
    return this.httpClient.delete('/api/appointments/' + _id)
  }

  getAppointments(skip, limit, date) {
    return this.httpClient.post('/api/appointments/page', { skip, limit, date })
  }
}
