import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationsService {

  constructor(private http: HttpClient) {
  }

  savePermissions(obj, id) {
    return this.http
      .post(`${environment.apiUrl}/${environment.apiBaseMain.configuration}/${environment.versions.v1}/permissions/${id}`, { data: obj })
      .pipe(map(response => response));
  }

  saveProfile(obj) {
    return this.http
      .put(`${environment.apiUrl}/${environment.apiBaseMain.users}/${environment.versions.v1}/main`, obj)
      .pipe(map(response => response));
  }

  getEntities() {
    return this.http
      .get(`${environment.apiUrl}/${environment.apiBaseMain.configuration}/${environment.versions.v1}/audit/entities`)
      .pipe(map(data => data['entities']));
  }

  setEntityState(state, id) {
    return this.http
      .patch(`${environment.apiUrl}/${environment.apiBaseMain.configuration}/${environment.versions.v1}/audit/entities/${id}`, {state})
      .pipe(map(data => data));
  }

}
