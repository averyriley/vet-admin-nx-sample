import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MasterLayoutComponent } from './layout/master.component';

const routes: Routes = [{
  path: 'dashboard',
  loadChildren: () => import('./pages/dashboard/dashboard.module')
    .then(module => module.DashboardModule)
},{
  path: 'appointments',
  loadChildren: () => import('./pages/appointments/appointments.module')
    .then(module => module.AppointmentsModule)
},{
  path: 'patients',
  loadChildren: () => import('./pages/patients/patients.module')
    .then(module => module.PatientsModule)
}, {
  path: 'login',
  loadChildren: () => import('./pages/login/login.module')
    .then(module => module.LoginModule)
}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: false })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
