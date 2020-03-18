import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root',
})
export class ThirdsService {

    constructor(private http: HttpClient) {
    }

    getAll(): Observable<any> {

        try {
            return this.http
                .get(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/third-parties`)
                .pipe(map(data => {
                    console.log(data)
                    return data['thirdParties'];
                }));
        } catch (error) {
            console.log('puta madre')
        }
    }

    create(createObject: any): Observable<any> {

        try {
            return this.http
                .post(
                    `${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/third-parties`,
                    createObject,
                ).pipe(
                    map(data => {
                        console.log(data);
                        return data;
                    })
                );
        } catch (error) {
            return error;
        }

    }

    edit(obj, id) {
        try {
            return this.http
                .put(
                    `${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/third-parties/${id}`,
                    obj,
                ).pipe(
                    map(data => {
                        console.log(data);
                        return data;
                    })
                );
        } catch (error) {
            return error;
        }
    }

    getAccounts(id: number) {
        try {
            return this.http
                .get(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/third-party-accounts?thirdPartyId=${id}`).pipe(
                    map(data => {
                        console.log(data)
                        data = data['thirdPartyAccounts'].map(i => {
                            i.bankName = i.bank.name;
                            i.typeName = i.accountType.name;
                            return i;
                        });
                        return data;
                    }));
        } catch (error) {
            return error;
        }
    }

    createAccount(data): Observable<any> {
        try {
            return this.http
                .post(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/third-party-accounts`, data).pipe(map(data => {
                    console.log(data)
                    const tmp = Object.keys(data).length === 0 ? [] : data['thirdPartyAccount'];
                    return tmp;
                }));
        } catch (error) {
            return error;
        }
    }

    editAccount(data, id): Observable<any> {
        try {
            return this.http
                .put(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/third-party-accounts/${id}`, data).pipe(map(data => {
                    return data;
                }));
        } catch (error) {
            return error;
        }
    }
}
