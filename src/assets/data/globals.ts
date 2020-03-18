import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable()
export class GlobalsUser {
  tree: object = {};
  nav: object = {};
}

export function getProfile() {
  const localvariable: any = JSON.parse(localStorage.getItem('currentUser')).token;
  const helper = new JwtHelperService();
  const decodedToken = helper.decodeToken(localvariable);
  console.log(decodedToken)
  return decodedToken.role;
}
