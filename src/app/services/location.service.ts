import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LocationService {

  constructor(private http: HttpClient) {
  }

  getCities(departmentId) {
    return this.http
        .get(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/countries/departments/${departmentId}/towns`)
      .pipe(map(data => data));
  }

  getDepartment(countryID) {
    return this.http
      .get(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/countries/${countryID}/departments`)
      .pipe(map(data => data));
  }

  getCountry() {
    return this.http
      .get(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/countries`)
      .pipe(map(data => {
          console.log(data)
          return data}));
  }
}
