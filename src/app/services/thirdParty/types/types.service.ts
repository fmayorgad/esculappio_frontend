import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { environment } from '@env/environment';

@Injectable({
	providedIn: 'root',
})
export class ThirdPartyTypesService {

	constructor(private http: HttpClient) {
	}
	handleError(error: HttpErrorResponse) {
		console.log("lalalalalalalala");
		return throwError(error);
	}

	getAll(): Observable<any> {

		try {
			return this.http
				.get(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/third-party-types`)
				.pipe(map(data => {
					console.log(data)
					return data["thirdParties"];
				}), catchError(this.handleError));
		} catch (error) {
			console.log("puta madre")
		}
	}

	edit(description: string, id: number) {
		return this.http
			.put(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/third-party-types/${id}`, { description })
			.pipe(map(response => response));
	}

	create(createObject: any): Observable<any> {

		try {
			return this.http
				.post(
					`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/third-party-types`,
					{ description: createObject.description },
				).pipe(
					map(data => {
						console.log(data);
						return data;
					})
				);
		} catch (error) {
			console.log("dasdasd")
		}

	}
}
