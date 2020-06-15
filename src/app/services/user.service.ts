import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
//
import { UserModel, UserLogedModel } from '../models/_index';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject: BehaviorSubject<UserLogedModel>;
  public user$: Observable<UserLogedModel>;

  constructor(public http: HttpClient) {
    this.userSubject = new BehaviorSubject<UserLogedModel>(
      JSON.parse(localStorage.getItem('loged'))
    );
    this.user$ = this.userSubject.asObservable();
  }

  public userValue(): UserLogedModel {
    return this.userSubject.value;
  }

  public setUserLoged(user: UserLogedModel) {
    this.userSubject.next(user);
  }

  getAllUsers(): Observable<UserModel[]> {
    const myUrl = environment.apiService + '/users';
    return this.http.get<UserModel[]>(myUrl).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

  getUserById(id: string): Observable<UserModel> {
    const myUrl = environment.apiService + '/users';

    return this.http
      .get<UserModel>(myUrl, { params: { id } })
      .pipe(
        map((resp: any) => {
          return resp;
        })
      );
  }

  createUser(user: UserModel) {
    const myUrl = environment.apiService + '/users';

    return this.http.post<UserModel>(myUrl, user);
  }

  updateUser(user: UserModel) {
    const myUrl = environment.apiService + '/users';

    return this.http.patch(myUrl, user).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

  deleteUser(id: string) {
    const myUrl = environment.apiService + '/users';

    return this.http.delete(myUrl, { params: { id } }).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

}
