import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { GlobalsUser } from '../../assets/data/globals';

import { AuthenticationService } from '../services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private globalsUser: GlobalsUser
  ) { }

  // Función cíclica que permite saber si se tiene acceso a una ruta o no
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      // es posible definir una estructura ciclica sin tener que definir el indexpath, pero se tendria que cambiar la estrucutra de las rutas
      // y por orden preferimos dejar las rutas y subrutas separadas usando LOADCHILDREN  en las rutas principales

      // cuando lastpathindex es cero, se esta validando la primer posición de ruta
      if (route['_lastPathIndex'] === 0) {

        if (this.globalsUser.nav[route.routeConfig.path]) {
          return true;
        } else {
          return false;
        }
      }
      // segunda posición
      if (route['_lastPathIndex'] === 1) {
        if (this.globalsUser.nav[ route['_urlSegment'].segments[route['_lastPathIndex'] - 1].path ].children[route.routeConfig.path]) {
          return true;
        } else {
          return false;
        }
      }
      return true;
    } else {
      this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }

  }

  // se revisa si puede ejecutar una ruta hija
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(route, state);
  }

}

