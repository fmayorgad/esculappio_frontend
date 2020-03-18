import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-user-panel',
  templateUrl: './app-user-panel.component.html',
})
export class UserPanelComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService) {
  }
  local;
  username = localStorage.getItem('currentUser');
  email;
  decodedToken;
  role;
  ip = 1;
  last = 2;

  logout() {
    this.authenticationService.logout();
  }

  ngOnInit() {
    const helper = new JwtHelperService();
    this.local = localStorage.getItem('currentUser');
    this.local = JSON.parse(this.local);
    this.decodedToken = helper.decodeToken(this.local.token);
    this.username = this.decodedToken.name;
    this.email = this.decodedToken.email;
    this.role = this.decodedToken.rolename ? this.decodedToken.rolename : this.decodedToken.role;
    this.last = this.local.user.lastLogin;
    this.ip = this.local.user.from;
  }
}
