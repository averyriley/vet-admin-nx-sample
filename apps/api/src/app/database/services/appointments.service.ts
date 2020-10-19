import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { UserSchemaInterface } from '../schema/user.schema';
import { ProviderKeysEnum } from '../provider-keys.enum';
import { PaginationDTO } from '../../models/pagination.dto';
import { PageQueryProvider } from '../providers/pagination.provider';
import { AppointmentsSchemaInterface } from '../schema/appointments.schema';
import { AppointmentModel } from '../../models/appointment.model';

@Injectable()
export class AppointmentsMongoDBService {
  constructor(@Inject(ProviderKeysEnum.APPOINTMENTS) private document: Model<AppointmentsSchemaInterface>) {}

  pageByPatientId(page: PaginationDTO, id: string) {
    return PageQueryProvider.providePageQuery(this.document, {
      patientId: id
    }, page)
  }

  getById(id: string) {
    return this.document.findOne({ _id: id }).exec()
  }

  async upsert(appointment: AppointmentModel) {
    if (appointment._id) {
      const dbAppointment = await this.getById(appointment._id)
      dbAppointment.description = appointment.description;
      dbAppointment.fee = appointment.fee;
      dbAppointment.endTime = appointment.endTime;
      dbAppointment.startTime = appointment.startTime;
      dbAppointment.description = appointment.description;
      dbAppointment.isPaid = appointment.isPaid;
      dbAppointment.date = appointment.date;
      return dbAppointment.save();
    } else {
      return this.document.create({
        description: appointment.description,
        fee: appointment.fee,
        endTime: appointment.endTime,
        startTime: appointment.startTime,
        isPaid: appointment.isPaid,
        patientId: appointment.patientId,
        date: appointment.date
      })
    }
  }

  deleteById(id: string) {
    return this.document.deleteOne({ _id: id });
  }

  async getUnpaidByPatientId(id: string) {
    return this.document.find({ patientId: id, isPaid: false })
  }

  page(page: PaginationDTO, date: number) {
    const query = { }
    if (date) {
      query['date'] = date
    }
    return PageQueryProvider.providePageQuery<any, AppointmentsSchemaInterface>(this.document, query,page);
  }
}
