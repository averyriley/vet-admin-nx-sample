import { Injectable } from '@nestjs/common';
import { PaginationDTO } from '../../models/pagination.dto';
import { AppointmentsMongoDBService } from '../../database/services/appointments.service';
import { AppointmentModel } from '../../models/appointment.model';
import { PatientsMongoDBService } from '../../database/services/patients.service';

@Injectable()
export class AppointmentsService {
  constructor(private appointmentsMongoDBService: AppointmentsMongoDBService,
              private patientsMongoDBService: PatientsMongoDBService) {
  }

  async getByPatientId(page: PaginationDTO, id: string) {
    return this.appointmentsMongoDBService.pageByPatientId(page, id)
  }

  async upsert(appointment: AppointmentModel) {
    return this.appointmentsMongoDBService.upsert(appointment);
  }

  async getById(id: string) {
    return this.appointmentsMongoDBService.getById(id)
  }

  async deleteById(id: string) {
    return this.appointmentsMongoDBService.deleteById(id);
  }

  async getAppointments(page: PaginationDTO, date: number) {
    const appointments = await this.appointmentsMongoDBService.page(page, date);
    const patientIds = appointments.rows.map(row => row.patientId)
    const patients = await this.patientsMongoDBService.findByIds(patientIds)
    appointments.rows = appointments.rows.map(row => {
      return {
        _id: row._id,
        date: row.date,
        name: patients.find(patient => patient._id.equals(row.patientId))?.name,
        startTime: row.startTime,
        endTime: row.endTime
      }
    })
    return appointments
  }
}
