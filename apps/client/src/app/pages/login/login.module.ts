import { NgModule } from '@angular/core';
import { ApiModule } from '../../shared/api-services/api.module';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    ApiModule,
    RouterModule.forChild([{
      path: '',
      component: LoginComponent
    }])
  ],
  declarations: [LoginComponent],
  providers: [LoginService]
})
export class LoginModule {}
