import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root',
})
export class CampusService {

    constructor(private http: HttpClient) {
    }

    getAll(): Observable<any> {

        return this.http
            .get(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/campus`)
            .pipe(map(data => {
                return data['campus'];
            }));
    }

    create(createObject: any): Observable<any> {
        return this.http
            .post(
                `${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/campus`,
                createObject,
            ).pipe(
                map(data => {
                    console.log(data);
                    return data;
                })
            );
    }

    edit(createObject: any, id: number): Observable<any> {
        return this.http
            .put(
                `${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/campus/${id}`,
                createObject,
            ).pipe(
                map(data => {
                    console.log(data);
                    return data;
                })
            );
    }
}
