import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../../../services';
@Component({
  selector: 'app-register',
  templateUrl: './recover.component.html',
})
export class RecoverComponent implements OnInit {
  reactiveForm: FormGroup;
  loginForm;
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    ) {
    this.loginForm = this.formBuilder.group({
			username: ['', [Validators.required, Validators.email]]
		});
  }

  recover(){
    this.authenticationService.recover(
      this.loginForm.controls.username.value
    ).subscribe(
      data => {
      },
      error => {
      });
  }

  ngOnInit() {}

}
