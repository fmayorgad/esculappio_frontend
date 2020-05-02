import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminUsersService } from '@services';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

const identype = {
  'Cédula de Ciudadanía': 1,
  'Cédula de Extranjería': 2,
  'Pasaporte': 3,
  'Registro Civil': 4,
  'Tarjeta de Identidad': 5
}

@Component({
  selector: 'user-admin-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class UserAdminCreateComponent {
  title = 'Crear';
  icon = 'add';
  color = '#4caf50';
  subtitle = 'Crear usuario administrativo';

  mainForm = new FormGroup({
    name: new FormControl(
      '',
      [
        Validators.maxLength(75),
        Validators.required,
        Validators.minLength(5),
      ],
    ),
    email: new FormControl(
      '',
      [
        Validators.maxLength(20), 
        Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"),
        Validators.required,
        Validators.minLength(8),
      ],
    ),
    lastname: new FormControl(
      '',
      [
        Validators.maxLength(75),
        Validators.required,
        Validators.minLength(5),
      ],
    ),
    gender: new FormControl(
      'F',
      [
        Validators.required,
      ],
    ),
    password: new FormControl(
      '',
      [
        Validators.maxLength(12),
        Validators.minLength(8),
        Validators.required,
      ],
    ),
    surname: new FormControl(
      '',
      [
        Validators.maxLength(75),
        Validators.minLength(5),
      ],
    ),
    identificationType: new FormControl(
      1,
      [
        Validators.required,
      ],
    ),
    identificationValue: new FormControl(
      '',
      [
        Validators.maxLength(12),
        Validators.required,
        Validators.minLength(8),
      ],
    ),
    profile: new FormControl(
      3,
      [
      ],
    ),
    professionalNumber: new FormControl(
      '',
      [ ]
    ),
  });

  constructor(
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UserAdminCreateComponent>,
    private adminUsersService: AdminUsersService,
    @Inject(MAT_DIALOG_DATA) public incomingdata: any
  ) {
  }

  get form() {
    return this.mainForm.controls;
  }

  test() {
    console.log(this.mainForm.valid);
  }

  create() {

    const tmp = {
      name: this.mainForm.controls.name.value,
      email: this.mainForm.controls.email.value,
      lastname: this.mainForm.controls.lastname.value,
      gender: this.mainForm.controls.gender.value,
      surname: this.mainForm.controls.surname.value,
      identificationType: this.mainForm.controls.identificationType.value,
      identificationValue: this.mainForm.controls.identificationValue.value,
      profileId: this.mainForm.controls.profile.value,
      password: this.mainForm.controls.password.value,
      professionalNumber: this.mainForm.controls.profile.value === 2 || this.mainForm.controls.profile.value === 5 ? this.mainForm.controls.professionalNumber.value : this.mainForm.controls.identificationValue.value,
    };

    this.adminUsersService
      .createAdmin(tmp)
      .subscribe(
        response => {
          this.dialogRef.close({ state: 1, message: 'Usuario creado satisfactoriamente.' });
        },
        error => {
          this._snackBar.open('Error al crear el usuario. Intentalo de nuevo más tarde', 'Aceptar', {
            duration: 3000,
            panelClass: 'snackbarError'
          });
        },
      );
  }
}
