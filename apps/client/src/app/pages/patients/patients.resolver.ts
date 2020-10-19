import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { PatientModel } from '../../shared/models/patient.model';
import { PatientsService } from './patients.service';

@Injectable()
export class PatientsResolver implements Resolve<PatientModel> {
  constructor(private service: PatientsService) {}

  // @ts-ignore
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<PatientModel> {
    const id = route.paramMap.get('id');
    if (id) {
      return this.service.getById(id).toPromise();
    }
    return Promise.resolve(new PatientModel())
  }
}
