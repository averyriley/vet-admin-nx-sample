import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthAPIService {
  constructor(private httpClient: HttpClient) { }
}
