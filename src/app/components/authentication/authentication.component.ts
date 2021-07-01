import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationServiceMock } from '../../services/authentication.service.mock';
import { UserData, Users } from "../../models/auth.model";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  login = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  authForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthenticationServiceMock,
    protected fb: FormBuilder
  ) {
    this.authForm = this.fb.group({
      login: this.login,
      password: this.password,
    });
  }

  ngOnInit(): void { }

  authorizeUser() {
    this.authService
      .login({
        login: this.login.value,
        password: this.password.value,
      })
      .subscribe((userData: UserData) => {
        if (Users.includes(userData.role)) {
          this.router.navigateByUrl('home');
        } else {
          this.login.setErrors({
            login: 'not valid',
          });
        }
      });
  }

}
