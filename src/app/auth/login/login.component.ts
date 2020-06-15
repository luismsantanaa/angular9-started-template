import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
//
import { LoginService, AlertService } from 'src/app/services/_index';
import { LoginModel } from '../../models/login.model';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: string;
  password: string;
  rememberMe = false;

  constructor(
    public loginService: LoginService,
    public router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {}

  loginUser(myForm: NgForm) {
    //
    if (myForm.invalid) {
      return;
    }
    //
    const login = new LoginModel({
      userName: myForm.value.userName,
      password: myForm.value.password,
      remenberMe: this.rememberMe,
    });
    //
    this.loginService
      .login(login)
      .pipe(first())
      .subscribe(
        (data) => {
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          this.alertService.error(error);
        }
      );
  }

}
