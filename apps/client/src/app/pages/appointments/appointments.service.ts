import { Injectable } from '@angular/core';
import { AppointmentModel } from '../../shared/models/appointment.model';
import { AppointmentsAPIService } from '../../shared/api-services/appointments.service';

@Injectable()
export class AppointmentsService {
  constructor(private appointmentAPIService: AppointmentsAPIService) {
  }

  upsertAppointment(appointment: AppointmentModel) {
    return this.appointmentAPIService.upsertAppointment(appointment)
  }

  getById(id: string) {
    return this.appointmentAPIService.getById(id)
  }

  deleteById(_id: string) {
    return this.appointmentAPIService.deleteById(_id)
  }

  getAppointments(skip, limit, date = null) {
    return this.appointmentAPIService.getAppointments(skip, limit, date)
  }
}
