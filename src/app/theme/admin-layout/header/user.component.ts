import { Component } from '@angular/core';
import { AuthenticationService } from '../../../services';
@Component({
  selector: 'app-user',
  templateUrl: 'user.component.html',
})
export class UserComponent {

  constructor(private authenticationService: AuthenticationService) {
  }

  logout() {
    this.authenticationService.logout();
  }
}
