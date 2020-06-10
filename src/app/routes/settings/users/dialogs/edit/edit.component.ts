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
  selector: 'user-admin-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class UserAdminEditComponent {
  title = 'Editar';
  icon = 'edit';
  color = '#2196f3';
  subtitle = 'Editando usuario: ' + this.incomingdata.name;

  requieredProfessionalNumer = [];

  mainForm = new FormGroup({
    name: new FormControl(
      this.incomingdata.name,
      [
        Validators.maxLength(75),
        Validators.required,
        Validators.minLength(5),
      ],
    ),
    lastname: new FormControl(
      this.incomingdata.lastname,
      [
        Validators.maxLength(75),
        Validators.required,
        Validators.minLength(5),
      ],
    ),
    gender: new FormControl(
      this.incomingdata.gender,
      [
        Validators.required,
      ],
    ),
    surname: new FormControl(
      this.incomingdata.surname,
      [
        Validators.maxLength(75),
        Validators.minLength(5),
      ],
    ),
    identificationType: new FormControl(
      identype[this.incomingdata.identificationType],
      [
        Validators.required,
      ],
    ),
    identificationValue: new FormControl(
      this.incomingdata.identificationValue,
      [
        Validators.maxLength(12),
        Validators.required,
        Validators.minLength(8),
      ],
    ),
    profile: new FormControl(
      this.incomingdata.profile.id,
      [
      ],
    ),
    professionalNumber: new FormControl(
      this.incomingdata.professionalNumber,
      this.requieredProfessionalNumer,
    ),
  });


  constructor(
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UserAdminEditComponent>,
    private adminUsersService: AdminUsersService,
    @Inject(MAT_DIALOG_DATA) public incomingdata: any
  ) {

    console.log(incomingdata);
  }

  get form() {
    return this.mainForm.controls;
  }


  edit() {

    const tmp = {
      name: this.mainForm.controls.name.value,
      lastname: this.mainForm.controls.lastname.value,
      gender: this.mainForm.controls.gender.value,
      surname: this.mainForm.controls.surname.value,
      identificationType: this.mainForm.controls.identificationType.value,
      identificationValue: this.mainForm.controls.identificationValue.value,
      profileId: this.mainForm.controls.profile.value,
      professionalNumber: this.mainForm.controls.profile.value === 2 || this.mainForm.controls.profile.value === 5 ? this.mainForm.controls.professionalNumber.value : this.mainForm.controls.identificationValue.value,
    };

    this.adminUsersService
      .editState(this.incomingdata.id, tmp)
      .subscribe(
        response => {
          this.dialogRef.close({ state: 1, message: 'Datos editados satisfactoriamente.' });
        },
        error => {
          this._snackBar.open('Error al ejecutar la acción. Intentalo de nuevo más tarde', 'Aceptar', {
            duration: 3000,
            panelClass: 'snackbarError'
          });
        },
      );
  }
}
