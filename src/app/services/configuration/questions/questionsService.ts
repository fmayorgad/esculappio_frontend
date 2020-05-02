import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable()
export class APIResolver implements Resolve<any> {
  constructor() { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(route.params)
    return { mamasapos: 2323 };
  }
}



@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  constructor(private http: HttpClient) {
  }

  create(id, obj) {
    return this.http
      .post(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/organs/${id}`, obj)
      .pipe(map(response => response));
  }

  editOrgan(data: object, id: number) {
    return this.http
      .patch(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/organs/${id}`, data)
      .pipe(map(response => response));
  }

  editState(state, id) {
    return this.http
      .patch(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/organs/questions/${id}`, state)
      .pipe(map(response => response));
  }

  editQuestion(id, tmp) {
    return this.http
      .patch(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/organs/questions/${id}`, tmp)
      .pipe(map(response => response));
  }

  getAll() {
    return this.http
      .get(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/organs`)
      .pipe(map(data => data['organs']));
  }

  getById(id) {
    return this.http
      .get(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/organs/${id}`)
      .pipe(map(data => data['organs']));
  }
}
