import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClientDocumentTypesService {

  constructor(private http: HttpClient) {
  }

  create(obj) {
    return this.http
      .post(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/types-school-documents`, obj)
      .pipe(map(response => response));
  }

  edit(data: object ,id: number) {
    return this.http
      .put(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/types-school-documents/${id}`,
      data)
      .pipe(map(response => response));
  }

  getAll() {
    return this.http
      .get(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/types-school-documents`)
      .pipe(map(data => data['typesSchoolDocuments']));
  }
}
