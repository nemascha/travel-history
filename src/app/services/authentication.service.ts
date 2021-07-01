import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {AuthModel, UserData} from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  login(authParams: AuthModel): Observable<UserData> {
    return this.http.post('/login', authParams) as Observable<UserData>;
  }
}
