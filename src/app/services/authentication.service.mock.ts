import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {AuthModel, unauthorizedUserMock, UserData, userMock, UserRoles} from '../models/auth.model';

const USER_DATA_KEY = 'userData';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationServiceMock {
  userData: UserData = unauthorizedUserMock;

  constructor() {}

  login(authParams: AuthModel): Observable<UserData> {
    return new Observable<UserData>(observer => {
      this.userData = unauthorizedUserMock;

      if (authParams.login === 'log' && authParams.password === 'pass') {
        this.userData = userMock;
      }

      this.saveSession(this.userData);

      observer.next(this.userData);
    });
  }

  saveSession(userData: UserData) {
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
  }
}
