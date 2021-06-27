import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private mockUsers: User[] = [
    {
      id: 1,
      name: 'John',
      password: 'Doe',
    }
    ];

  constructor(
    //private httpClient: HttpClient
  ) { }

  //getUsers() {
    //return this.httpClient.get('/api/user') as Observable<User[]>;
  //}
}
