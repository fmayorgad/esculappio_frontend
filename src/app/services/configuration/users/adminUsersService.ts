import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
//import {} from '';
import { saveAs } from "file-saver";

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
      .patch(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/users/${id}`, state)
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

  ridx(id, obj) {
    return this.http
      .patch(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/procedures/idx/${id}`, obj)
      .pipe(map(data => data['procedure']));
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
        { responseType: "blob", headers: { 'Accept': 'application/pdf' } }
      )
  }

  getConsultations() {
    return this.http
      .get(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/consultations/getAll`)
      .pipe(map(data => data['consultations']));
  }


  getTnms() {
    return this.http
      .get(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/procedures/tnms`)
      .pipe(map(data => data['tnm']));
  }


  getConsultationsFiles(id) {
    return this.http
      .get(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/consultations/getFile/${id}`,
        { responseType: "blob", headers: { 'Accept': 'application/pdf' } }
      )
  }

  getAnswerFiles(id) {
    return this.http
      .get(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/consultations/getAnswerFile/${id}`,
        { responseType: "blob", headers: { 'Accept': 'application/pdf' } }
      )
  }

  closeConsultation(data) {
    return this.http
      .post(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/consultations/responseConsultation`, data)
      .pipe(map(data => data['tnm']));
  }

  savediagnosys(data) {
    return this.http
      .post(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/procedures/saveDiagnosys`, data)
      .pipe(map(data => data['tnm']));
  }

  selfEdit(data) {
    return this.http
      .patch(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/users/selfEdit/edit`, data)
      .pipe(map(data => data['user']));
  }

  uploadSign(data) {
    console.log(data)
    return this.http
      .post(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/procedures/uploadFilesSign`, data)
      .pipe(map(data => data['user']));
  }


  startPaleative(obj) {
    return this.http
      .post(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/procedures/startPaleatives`, obj)
      .pipe(map(data => data['procedure']));
  }

  getAnswerPaleatives(id) {
    return this.http
      .get(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/procedures/getPaleativesAnswers/${id}`,
    )
  }


  changePassword(data) {
    return this.http
      .post(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/login/changePassword`, data)
      .pipe();
  }

  getUserPayments(id) {
    return this.http
      .get(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/payments/user/${id}`)
      .pipe(map(data => data['payments']));
  }

  saveSchedule(data) {
    return this.http
      .post(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/payments/payments-user/saveSchedule`, data)
      .pipe();
  }


}
