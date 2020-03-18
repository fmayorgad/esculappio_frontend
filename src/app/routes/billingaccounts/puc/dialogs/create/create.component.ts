import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { PUCService } from '../../../../../services';

@Component({
  selector: 'app-banks-dialogs-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class PUCDialogsCreateComponent {
  title = 'Crear';
  icon = 'add';
  color = '#4caf50';
  subtitle = 'Crear una Cuenta Contable';

  formGroup = new FormGroup({
    code: new FormControl(
      '',
      [
        Validators.maxLength(30),
        Validators.required,
        Validators.minLength(1),
      ],
    ),
    description: new FormControl(
      '',
      [
        Validators.maxLength(75),
        Validators.required,
        Validators.minLength(4),
      ],
    ),
  });

  constructor(
    private pucService: PUCService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PUCDialogsCreateComponent>,
  ) {
  }


  create() {
    const obj = {
      code: this.formGroup.value.code,
      description: this.formGroup.value.description,
    };
    this.pucService
      .create(obj)
      .subscribe(
        response => {
					this.dialogRef.close({ state: 1, message: 'Registro guardado satisfactoriamente.' });
				},
				error => {
					this.dialogRef.close({ state: 0, message: 'No se pudo realizar la acción. Intenta de más tarde.' });
				},
      );
  }
}
