import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class SchoolService {

  constructor(private http: HttpClient) {
  }

  getAllSchools() {
    return this.http
      .get(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/schools`)
      .pipe(map(data => data['schools']));
  }

  getSchoolsByUserEmail(email: string) {
    return this.http
      .get(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/schools?email=${email}`)
      .pipe(map(data => data['schools']));
  }

  createSchool(obj) {
    return this.http
      .post(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/schools`,
        obj
      )
      .pipe(map(data => data['schools']));
  }

  edit(id, obj) {
    return this.http
      .put(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/schools/` + id,
        obj
      )
      .pipe();
  }

  // configuración de la institución
  getAccountingPeriods() {
    return this.http
      .get(`${environment.apiUrl}/${environment.apiBaseMain.documents}/${environment.versions.v1}/months`)
      .pipe(map(data => data['months']));
  }

  closeMonth(id) {
    return this.http
      .put(`${environment.apiUrl}/${environment.apiBaseMain.documents}/${environment.versions.v1}/months/` + id,
        {}
      ).pipe();
  }

  //crear solicitud de modificación
  makeRequest(data) {
    return this.http
      .post(`${environment.apiUrl}/${environment.apiBaseMain.data}/${environment.versions.v1}/requests`,
        data
      )
      .pipe(map(data => data['schools']));
  }

  getRequest() {
    return this.http
      .get(`${environment.apiUrl}/${environment.apiBaseMain.data}/${environment.versions.v1}/requests`)
      .pipe(map(data => data['requests']));
  }

  accept(data) {
    return this.http
      .put(`${environment.apiUrl}/${environment.apiBaseMain.data}/${environment.versions.v1}/requests/${data.id}`, data)
      .pipe(map(data => data));
  }

  //aprobadores y revisores

  getAproversReviewers() {
    return this.http
      .get(`${environment.apiUrl}/${environment.apiBaseMain.documents}/${environment.versions.v1}/approver-reviewer`)
      .pipe(map(data => data['approverReviewers']));
  }

  activate(data) {
    return this.http
      .patch(`${environment.apiUrl}/${environment.apiBaseMain.documents}/${environment.versions.v1}/approver-reviewer/${data}`, {})
      .pipe(map(data => data));
  }

  createUserAproverReviewer(data) {
    return this.http
      .post(`${environment.apiUrl}/${environment.apiBaseMain.documents}/${environment.versions.v1}/approver-reviewer`, data)
      .pipe(map(data => data));
  }

}
