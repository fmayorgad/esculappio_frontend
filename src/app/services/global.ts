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

  currency(number){
    return new Intl.NumberFormat("en-ES" , {style: "currency", currency: "COP"}).format(number)
  }
}
