import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class PacientResolverService implements Resolve<any>{

  constructor(
    private http: HttpClient,
    private router: Router,
    private snack : MatSnackBar
    ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)/* : Observable<{}> | Promise<{}> | {} */ {
    return this.http
      .get(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/users/getById/${route.params.id}`)
      .toPromise().then(data => {
        console.log(data)
        if (data.hasOwnProperty('user')) {
          return data;
        } else {
          this.snack.open('El recurso que intentas buscar no existe.', 'Aceptar', {
            duration: 5000,
            panelClass: 'snackbarError'
          });
          this.router.navigate(['configuracion/organos']);
        }
      });
  }
}
