import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { ProviderKeysEnum } from '../provider-keys.enum';
import { PatientSchemaInterface } from '../schema/patients.schema';
import { PatientsModel } from '../../models/patients.model';
import { PaginationDTO } from '../../models/pagination.dto';
import { PageQueryProvider } from '../providers/pagination.provider';

@Injectable()
export class PatientsMongoDBService {
  constructor(@Inject(ProviderKeysEnum.PATIENTS) public document: Model<PatientSchemaInterface>) {}

  getById(id: string) {
    return this.document.findOne({ _id: id }).exec();
  }

  async upsertPatient(patient: PatientsModel) {
    if (patient._id) {
      const dbPatient = await this.getById(patient._id)
      dbPatient.name = patient.name;
      dbPatient.contactInfo = patient.contactInfo;
      dbPatient.type = patient.type;
      return dbPatient.save();
    } else {
      return this.document.create({
        name: patient.name,
        type: patient.type,
        contactInfo: patient.contactInfo
      })
    }
  }

  getPatients(page: PaginationDTO) {
    return PageQueryProvider.providePageQuery<PatientsModel, PatientSchemaInterface>(this.document, {} ,page);
  }

  deleteById(id: string) {
    return this.document.deleteOne({ _id: id });
  }

  async findByIds(patientIds: string[]) {
    return this.document.find({ _id: { $in: patientIds } })
  }
}
