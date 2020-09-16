import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminUsersService, GlobalService } from '@services';
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

export class ListCreateComponent implements OnInit {

  title = 'Crear cita agendada';
  icon = 'add';
  color = '#4caf50';
  subtitle = 'Citas agendadas para este pago.';

  eps;

  tnm = null;
  tnm2 = null;

  mainForm = new FormGroup({
    name: new FormControl(
      '',
      [
        Validators.maxLength(75),
        Validators.required,
        Validators.minLength(2),
      ],
    ),
    date: new FormControl(
      '',
      [
        Validators.required,
      ],
    ),
  });

  constructor(
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ListCreateComponent>,
    private adminUsersService: AdminUsersService,
    private globalService: GlobalService,
    @Inject(MAT_DIALOG_DATA) public incomingdata: any
  ) {
  }

  filesToUpload: Array<File> = [];
  data = this.incomingdata;

  get form() {
    return this.mainForm.controls;
  }

  test() {
    console.log(this.mainForm.valid);
  }

  getEPS() {
    this.globalService.getEPS().subscribe(
      response => {
        this.eps = response;
      },
      error => {
        this._snackBar.open('Error al traer las EPS. Intentalo de nuevo más tarde', 'Aceptar', {
          duration: 3000,
          panelClass: 'snackbarError'
        });
      },
    );
  }

  create() {

    const tmp = {
      name: this.mainForm.controls.name.value,
      date: this.mainForm.controls.date.value,
      paymentId: this.incomingdata.id
    };

    this.adminUsersService
      .saveSchedule(tmp)
      .subscribe(
        response => {
          this.dialogRef.close({ state: 1, message: 'Usuario creado satisfactoriamente.' });
        },
        error => {
          console.log(error)
          this._snackBar.open(error, 'Aceptar', {
            duration: 3000,
            panelClass: 'snackbarError'
          });
        },
      );
  }

  ngOnInit() {
    this.getEPS();
  }
}
