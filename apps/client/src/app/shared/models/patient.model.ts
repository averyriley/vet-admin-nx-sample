import { PatientTypeEnum } from './enums/patient-type.enum';

export class PatientModel {
  name: string;
  type: PatientTypeEnum = PatientTypeEnum.OTHER;
  contactInfo: {
    name: string,
    phone: string
  } = {
    name: '',
    phone: ''
  };
  appointments: any[];
  _id: string;
  creation: number;
  lastUpdated: number;
  unpaidBills: number
}
