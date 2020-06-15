import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
//
import { UserService } from './_index';
import { LoginModel, UserLogedModel, UserModel } from '../models/_index';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    public http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {}

  isLoged(): boolean {
    if (localStorage.getItem('loged')) {
      return true;
    } else {
      return false;
    }
  }

  login(login: LoginModel) {
    const url = environment.apiService + '/users/authenticate';
    let userLoged: UserLogedModel;
    //
    return this.http.post(url, login).pipe(
      map((resp: UserModel) => {
        userLoged = new UserLogedModel({
          id: resp._id,
          token: resp.token,
          userName: resp.userName,
          fullName: `${resp.name} ${resp.lastName}`,
          avatar: resp.img,
          jobTitle: resp.jobTitle,
          role: resp.role
        });
        //
        if (localStorage.getItem('loged')) {
          localStorage.removeItem('loged');
        }
        localStorage.setItem('loged', JSON.stringify(userLoged));
        //
        this.rememberMe(login);
        //
        return true;
      })
    );
  }

  rememberMe(login: LoginModel) {
    if (login.remenberMe) {
      localStorage.setItem('remember', JSON.stringify(login));
    } else {
      if (localStorage.getItem('remember')) {
        localStorage.removeItem('remember');
      }
    }
  }

  logout() {
    localStorage.removeItem('loged');
    this.router.navigate(['/login']);
  }

}
