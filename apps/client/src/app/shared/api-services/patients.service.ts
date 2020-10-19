import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PatientModel } from '../models/patient.model';

@Injectable()
export class PatientsAPIService {
  constructor(private httpClient: HttpClient) { }

  upsert(value: PatientModel) {
    return this.httpClient.post('/api/patients', value)
  }

  getById(id: string) {
    return this.httpClient.get<PatientModel>('/api/patients/' + id)
  }

  getPatients(skip: number, limit: number) {
    return this.httpClient.post<PatientModel[]>('/api/patients/page', { skip, limit})
  }

  delete(_id: string) {
    return this.httpClient.delete('/api/patients/' + _id);
  }
}
