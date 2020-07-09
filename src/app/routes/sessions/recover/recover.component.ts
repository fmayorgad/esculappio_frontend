import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../../../services';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private _snackBar: MatSnackBar,
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

        this._snackBar.open('Hemos enviado un email de recuperación a la cuenta registrada. Revisa tu bandeja de spam en caso de no encontrarlo en la de recibidos.', 'Aceptar', {
          duration: 5000,
        });
      },
      
      error => {
      });
  }

  ngOnInit() {}

}
