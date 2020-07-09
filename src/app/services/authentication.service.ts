import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';

import { User } from '../models';

const subdomain = 'eep'; // window.location.hostname.split('.')[0];

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(obj) {
    return this.http
      .post<any>(
        `${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/login/web`,
        obj,
      )
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  recover(email: string) {
    return this.http
      .post<any>(
        `${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/users/recover-password`,
        { email },
      )
      .pipe(map(user => {
        return user;
      }));
  }

  getById(id: string) {
    return this.http
      .get<any>(
        `${environment.apiUrl}/${environment.apiBaseMain.users}/${environment.versions.v1}/users/getById/` + id,
      )
      .pipe(map(user => {
        return user;
      }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }
}
