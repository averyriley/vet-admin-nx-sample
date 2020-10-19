import { Injectable } from '@angular/core';
import { PatientsMongoDBService } from '../../database/services/patients.service';
import { PatientsModel } from '../../models/patients.model';
import { PaginationDTO } from '../../models/pagination.dto';
import { AppointmentsMongoDBService } from '../../database/services/appointments.service';
import { ApiProperty } from '@nestjs/swagger';

@Injectable()
export class PatientsService {
  constructor(private service: PatientsMongoDBService,
              private appointmentsService: AppointmentsMongoDBService) {
  }

  async upsertPatient(patient: PatientsModel) {
   return this.service.upsertPatient(patient)
  }

  async getById(id: string) {
    const patient = await this.service.getById(id);
    const unpaidAppointments = await this.appointmentsService.getUnpaidByPatientId(id)
    let bill = 0
    unpaidAppointments.forEach(appointment => {
      bill += appointment.fee
    })
    return {
      _id: patient._id,
      name: patient.name,
      type: patient.type,
      contactInfo: {
        name: patient.contactInfo.name,
        phone: patient.contactInfo.phone
      },
      unpaidBills: bill
    }
  }

  async getPatients(page: PaginationDTO) {
    return this.service.getPatients(page);
  }

  async deleteById(id: string) {
    return this.service.deleteById(id);
  }
}
