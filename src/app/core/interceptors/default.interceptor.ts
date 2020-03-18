import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {

  constructor(
    private _snackBar: MatSnackBar,
  ){

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log(req)
    return next.handle(req).pipe(
      mergeMap((event: any) => {
        return of(event);
      })/* , // se remueve para darle manejo al error directamente en el servicio o subcriptor
      catchError((err: HttpErrorResponse) => {
        this._snackBar.open('Error. Intentelo de nuevo más tarde. Error: '+err.message, 'Aceptar', {
          duration: 3000,
      });
        return of(err);
      })  */
    );
  }
}
