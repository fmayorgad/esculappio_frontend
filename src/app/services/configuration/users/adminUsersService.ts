import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
//import {} from '';


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
export class AdminUsersService {
  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http
      .get(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/users/getAllAdmins`)
      .pipe(map(data => data['user']));
  }

  getPacients() {
    return this.http
      .get(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/users/pacients`)
      .pipe(map(data => data['pacients']));
  }

  getPendingMedicalProcedures() {
    return this.http
      .get(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/users/pacients/pendingProcedures`)
      .pipe(map(data => data['procedures']));
  }

  editState(id, state) {
    return this.http
      .patch(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/users/${id}`, { state })
      .pipe(map(data => data['user']));
  }

  createProcedure(data) {
    return this.http
      .post(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/procedures`, data)
      .pipe(map(data => data['procedure']));
  }

  createAdmin(obj) {
    return this.http
      .post(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/users/createFromAdmin`, obj)
      .pipe(map(data => data['user']));
  }

  getById(id) {
    return this.http
      .get(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/organs/${id}`)
      .pipe(map(data => data['users']));
  }

  uploadFile(data) {
    console.log(data)
    return this.http
      .post(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/procedures/uploadfiles`, data)
      .pipe(map(data => data['user']));
  }
  getProcedureById(id) {
    return this.http
      .get(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/procedures/${id}`)
      .pipe(map(data => data['procedures']));
  }

  deleteFile(id) {
    return this.http
      .delete(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/procedures/deleteFile/${id}`)
      .pipe(map(data => data['procedures']));
  }

  getFileById(id) {
    return this.http
      .get(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/procedures/getFile/${id}`,
      {responseType: "blob", headers: {'Accept': 'application/pdf'}}
      )/* .subscribe(blob => {
        //saveAs(blob, 'download.pdf');
      }); */
  }
}
