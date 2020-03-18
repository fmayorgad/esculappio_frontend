import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { map, retry, catchError} from 'rxjs/operators';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root',
})
export class ProjectsService {

    constructor(private http: HttpClient) {
    }

    getAll(): Observable<any> {

        return this.http
            .get(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/projects`)
            .pipe(map(data => {
                return data['projects'];
            }),catchError((err: HttpErrorResponse) => {
                console.log("hjehjejejeje");
                return of(err);
              }) 
            );
    }

    create(createObject: any): Observable<any> {
        return this.http
            .post(
                `${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/projects`,
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
                `${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/projects/${id}`,
                createObject,
            ).pipe(
                map(data => {
                    console.log(data);
                    return data;
                }),
            );
    }
}
