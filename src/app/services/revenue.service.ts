import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RevenueService {

  constructor(private http: HttpClient) {
  }

  getAllRevenues() {
    return this.http
      .get(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/revenues`)
      .pipe(map(data => data['revenues']));
  }

  createRevenue(description: string, classification: string, code: string) {
    return this.http
      .post(
        `${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/revenues`,
        { description, classification, code })
      .pipe(map(response => response));
  }

  edit(description: string, classification: string, code: string, id: number) {
    return this.http
      .put(
        `${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/revenues/${id}`,
        { description, classification, code })
      .pipe(map(response => response));
  }
}
