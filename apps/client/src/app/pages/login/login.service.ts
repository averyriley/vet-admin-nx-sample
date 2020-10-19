import { Injectable } from '@angular/core';
import { AuthAPIService } from '../../shared/api-services/auth.service';

@Injectable()
export class LoginService {
  constructor(private authService: AuthAPIService) { }
}
