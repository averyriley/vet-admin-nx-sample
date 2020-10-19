import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { PatientModel } from '../../shared/models/patient.model';
import { AppointmentModel } from '../../shared/models/appointment.model';
import { AppointmentsService } from './appointments.service';

@Injectable()
export class AppointmentResolver implements Resolve<PatientModel> {
  constructor(private service: AppointmentsService) {}

  // @ts-ignore
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<AppointmentModel> {
    const id = route.paramMap.get('appointmentId');
    return this.service.getById(id).toPromise();
  }
}
