import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { UserModel } from '../models/_index';
import { Roles } from './enums.enum';

const users: UserModel[] = [
  {
    _id: '5ec990238cbca64d8c273164',
    role: Roles.Admin,
    blocked: false,
    updateBy: null,
    updateDate: null,
    active: true,
    userName: 'lsantana',
    name: 'Luis M.',
    lastName: 'Santana A.',
    password: '123456',
    jobTitle: 'Adminitrator',
    createBy: 'lsantana',
    crateDate: new Date('2020-05-23T21:05:39.401Z'),
    img:
      'https://gravatar.com/avatar/d861875b248e885977c1d0b41e1e7b6c?s=200&d=robohash&r=x',
    token: '',
    fullName: '',
  },
  {
    _id: '5ec990238cbca64d8c273164',
    role: Roles.PowerUser,
    blocked: false,
    updateBy: null,
    updateDate: null,
    active: true,
    userName: 'lrodriguez',
    name: 'Leticia M.',
    lastName: 'Rodriguez L.',
    password: '123456',
    jobTitle: 'Vice-Presidente',
    createBy: 'lsantana',
    crateDate: new Date('2020-05-23T21:05:39.401Z'),
    img:
      'https://robohash.org/d861875b248e885977c1d0b41e1e7b6c?set=set3&bgset=bg2&size=200x200',
    token: '',
    fullName: '',
  },
  {
    _id: '5ec990238cbca64d8c273164',
    role: Roles.Unassigned,
    blocked: false,
    updateBy: null,
    updateDate: null,
    active: true,
    userName: 'dsantana',
    name: 'Dilia Marie',
    lastName: 'Santana Rodriguez',
    password: '123456',
    jobTitle: 'Heredera VIP',
    createBy: 'lsantana',
    crateDate: new Date('2020-05-23T21:05:39.401Z'),
    img:
      'https://robohash.org/d861875b248e885977c1d0b41e1e7b6c?set=set4&bgset=&size=200x200',
    token: '',
    fullName: '',
  },
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('/users/authenticate') && method === 'POST':
          return authenticate();
        case url.endsWith('/users') && method === 'GET':
          return getUsers();
        case url.endsWith('/users') && method === 'POST':
          return addUser();
        case url.match(/\/users\/\d+$/) && method === 'GET':
          return getUserById();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function authenticate() {
      const { userName, password } = body;
      const user = users.find(
        (x) => x.userName === userName && x.password === password
      );
      if (!user) {
        return error('Username or password is incorrect');
      }
      return ok({
        _id: user._id,
        userName: user.userName,
        name: user.name,
        lastName: user.lastName,
        role: user.role,
        jobTitle: user.jobTitle,
        img: user.img,
        createBy: user.createBy,
        token: `fake-jwt-token.${user._id}`,
      });
    }

    function getUsers() {
      if (!isAdmin()) {
        return unauthorized();
      }
      return ok(users);
    }

    function getUserById() {
      if (!isLoggedIn()) {
        return unauthorized();
      }

      // only admins can access other user records
      if (!isAdmin() && currentUser()._id !== idFromUrl()) {
        return unauthorized();
      }

      const user = users.find((x) => x._id === idFromUrl());
      return ok(user);
    }

    function addUser() {
      const user = new UserModel({
        _id: body.$key,
        name: body.name,
        lastName: body.lastName,
        userName: body.userName,
        jobTitle: body.jobTitle,
        role: body.role,
        img: body.img,
        password: body.password,
        blocked: body.blocked,
        active: body.active,
      });
      //
      users.push(user);
      return ok(user);
    }

    // helper functions

    function ok(body) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function unauthorized() {
      return throwError({ status: 401, error: { message: 'unauthorized' } });
    }

    function error(message) {
      return throwError({ status: 400, error: { message } });
    }

    function isLoggedIn() {
      const authHeader = headers.get('Authorization') || '';
      return authHeader.startsWith('Bearer fake-jwt-token');
    }

    function isAdmin() {
      return isLoggedIn() && currentUser().role === Roles.Admin;
    }

    function currentUser() {
      if (!isLoggedIn()) {
        return;
      }
      const id = headers.get('Authorization').split('.')[1];
      return users.find((x) => x._id === id);
    }

    function idFromUrl() {
      const urlParts = url.split('/');
      return urlParts[urlParts.length - 1];
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
