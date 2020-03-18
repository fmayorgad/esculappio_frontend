import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class BudgetNotesService {

    constructor(private http: HttpClient) {
    }

    getAll() {
        return this.http
            .get(`${environment.apiUrl}/${environment.apiBaseMain.documents}/${environment.versions.v1}/budget-notes`)
            .pipe(map(data => data['budgetNotes']));
    }

    create(data) {
        return this.http
            .post(`${environment.apiUrl}/${environment.apiBaseMain.documents}/${environment.versions.v1}/budget-notes`, data)
            .pipe(map(response => response));
    }

    edit(data, id) {
        return this.http
            .put(`${environment.apiUrl}/${environment.apiBaseMain.documents}/${environment.versions.v1}/budget-notes/${id}`, data)
            .pipe(map(response => response));
    }

    cancel(id){
        return this.http
            .patch(`${environment.apiUrl}/${environment.apiBaseMain.documents}/${environment.versions.v1}/budget-notes`, {id})
            .pipe(map(response => response));
    }

}
