import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class PurchaseOrdersService {

    constructor(private http: HttpClient) {
    }

    getAll() {
        return this.http
            .get(`${environment.apiUrl}/${environment.apiBaseMain.documents}/${environment.versions.v1}/purchase-orders`)
            .pipe(map(data => data['purchaseOrders']));
    }

    getByThird(id) {
        return this.http
            .get(`${environment.apiUrl}/${environment.apiBaseMain.documents}/${environment.versions.v1}/purchase-orders/${id}`)
            .pipe(map(data => data['purchaseOrders']));
    }

    create(data) {
        return this.http
            .post(`${environment.apiUrl}/${environment.apiBaseMain.documents}/${environment.versions.v1}/purchase-orders`, data)
            .pipe(map(response => response));
    }

    edit(data, id) {
        return this.http
            .put(`${environment.apiUrl}/${environment.apiBaseMain.documents}/${environment.versions.v1}/purchase-orders/${id}`, data)
            .pipe(map(response => response));
    }

    nullable(id){
        return this.http
            .patch(`${environment.apiUrl}/${environment.apiBaseMain.documents}/${environment.versions.v1}/purchase-orders/${id}`, {id})
            .pipe(map(response => response));
    }

}
