import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { SchoolService } from '../../../../services';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
@Component({
  selector: 'reject-dialogs-create',
  templateUrl: './reject.component.html',
  styleUrls: ['./reject.component.css'],
})
export class RejectDialogComponent {

  constructor(
    private schoolService: SchoolService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<RejectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public incomingdata: any
  ) {
    console.log(incomingdata)
  }

  title = 'Rechazar Solicitud';
  icon = 'close';
  color = '#d0262a';
  subtitle = 'Rechazar solicitud de modificación #' + this.incomingdata.id;
  minDate = new Date();

  requestForm = new FormGroup({
    description: new FormControl(
      '',
      [
        Validators.maxLength(200),
        Validators.required,
        Validators.minLength(10)
      ],
    ),
  });

  reject() {

    const tmp = {};
    tmp['approvalDescription'] = this.requestForm.controls.description.value;
    tmp['requestStatusId'] = 2;
    tmp['id'] = this.incomingdata.id;

    this.schoolService
      .accept(tmp)
      .subscribe(
        response => {
          this.dialogRef.close({ state: 1, message: 'Solicitud Rechazada satisfactoriamente.' });
        },
        error => {
          this.dialogRef.close({ state: 0, message: 'No se pudo realizar la acción. Intenta de más tarde.' });
        },
      );

  }

}
