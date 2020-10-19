import { NgModule } from '@angular/core';
import { ApiModule } from '../../shared/api-services/api.module';
import { PatientsComponent } from './patients.component';
import { PatientsService } from './patients.service';
import { RouterModule } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { TableModule } from '../../shared/table/table.module';
import { PatientDetailComponent } from './detail/detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { PatientsResolver } from './patients.resolver';

@NgModule({
  imports: [
    ApiModule,
    CommonModule,
    NgbPaginationModule,
    FormsModule,
    ReactiveFormsModule,

    RouterModule.forChild([{
      path: '',
      component: PatientsComponent
    },{
      path: 'new',
      component: PatientDetailComponent
    },{
      path: ':id',
      resolve: {
        patient: PatientsResolver
      },
      component: PatientDetailComponent,
    }, {
      path: ':id/appointments',
      loadChildren: () => import('../appointments/appointments.module')
        .then(module => module.AppointmentsModule)
    }]),

    TableModule
  ],
  declarations: [
    PatientsComponent,
    PatientDetailComponent
  ],
  providers: [PatientsService, PatientsResolver]
})
export class PatientsModule {}
