import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {

  constructor(private http: HttpClient) {
  }

  getEPS() {
    return this.http
      .get(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/general/eps`)
      .pipe(map(data => data['eps']));
  }

  getSurgeriesById(id) {
    return this.http
      .get(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/organs/surgeries/${id}`)
      .pipe(map(data => data['surgeries']));
  }

  currency(number){
    return new Intl.NumberFormat("en-ES" , {style: "currency", currency: "COP"}).format(number)
  }


  getSurgeriesMedicalProcedureById(id) {
    return this.http
      .get(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/organs/surgeries/medicalProcedure/${id}`)
      .pipe(map(data => data['surgeries']));
  }

  createSurgery(obj) {
    return this.http
    .post(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/organs/surgery/create`, obj)
    .pipe(map(response => response));
  }


  getCiclesMedicalProcedureById(id) {
    return this.http
      .get(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/organs/cicles/medicalProcedure/${id}`)
      .pipe(map(data => data['cicles']));
  }

  createCicles(obj) {
    return this.http
    .post(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/organs/cicles/create`, obj)
    .pipe(map(response => response));
  }


  getDrugs(id) {
    return this.http
      .get(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/organs/drugs/${id}`)
      .pipe(map(data => data['drugs']));
  }

  createQuimo(obj) {
    return this.http
    .post(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/procedures/quimo/create/newQuimo  `, obj)
    .pipe(map(response => response));
  }

  getQuimo(id) {
    return this.http
      .get(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/procedures/quimo/${id}`)
      .pipe(map(data => data['quimo']));
  }

  createCicleInner(data) {
    return this.http
    .post(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/procedures/quimo/create/innerCicle  `, data)
    .pipe(map(response => response));
  }
}
