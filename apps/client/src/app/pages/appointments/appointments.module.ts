import { NgModule } from '@angular/core';
import { ApiModule } from '../../shared/api-services/api.module';
import { AppointmentsService } from './appointments.service';
import { AppointmentsComponent } from './appointments.component';
import { RouterModule } from '@angular/router';
import { AppointmentDetails } from './detail/detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbModalModule, NgbModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentResolver } from './appointment-detail.resolver';
import { CommonModule } from '@angular/common';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { FlatpickrModule } from 'angularx-flatpickr';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import { TableModule } from '../../shared/table/table.module';

@NgModule({
  imports: [
    ApiModule,
    ReactiveFormsModule,
    FormsModule,
    NgbDatepickerModule,
    CommonModule,
    NgbTimepickerModule,
    NgbModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),

    RouterModule.forChild([{
      path: '',
      component: AppointmentsComponent
    }, {
      path: 'new',
      component: AppointmentDetails
    }, {
      path: ':appointmentId',
      resolve: {
        appointment: AppointmentResolver
      },
      component: AppointmentDetails
    }]),
    CommonModule,
    TableModule
  ],
  declarations: [AppointmentsComponent, AppointmentDetails],
  providers: [AppointmentsService, AppointmentResolver]
})
export class AppointmentsModule {}
