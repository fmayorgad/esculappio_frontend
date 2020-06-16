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
  selector: 'user-idx-create',
  templateUrl: './idx.component.html',
  styleUrls: ['./idx.component.css'],
})

export class AnotationCreateComponent implements OnInit {

  title = 'Registrar Anotación';
  icon = 'accessibility';
  color = '#4caf50';
  subtitle = 'Registro de anitación';

  eps;

  mainForm = new FormGroup({
    idx: new FormControl(
      '',
      [
        Validators.maxLength(500),
        Validators.required,
        Validators.minLength(5),
      ],
    ),
  });

  constructor(
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AnotationCreateComponent>,
    private adminUsersService: AdminUsersService,
    private globalService: GlobalService,
    @Inject(MAT_DIALOG_DATA) public incomingdata: any
  ) {
  }

  filesToUpload: Array<File> = [];

  get form() {
    return this.mainForm.controls;
  }

  test() {
    console.log(this.mainForm.valid);
  }


  create() {

    const tmp = {
      anotation: this.mainForm.controls.idx.value,
    };

    this.adminUsersService
      .ridx(this.incomingdata.id, tmp)
      .subscribe(
        response => {
          this.dialogRef.close({ state: 1, message: 'Registro realizado satisfactoriamente.' });
        },
        error => {
          this._snackBar.open('Error al registrar el IDX. Intentalo de nuevo más tarde', 'Aceptar', {
            duration: 3000,
            panelClass: 'snackbarError'
          });
        },
      );
  }

  ngOnInit() {

  }
}
