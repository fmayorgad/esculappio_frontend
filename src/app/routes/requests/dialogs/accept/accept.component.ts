import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { SchoolService } from '../../../../services';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
@Component({
  selector: 'accept-dialogs-create',
  templateUrl: './accept.component.html',
  styleUrls: ['./accept.component.css'],
})
export class AcceptDialogComponent {

  constructor(
    private schoolService: SchoolService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AcceptDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public incomingdata: any
  ) {
    console.log(incomingdata)
  }

  title = 'Aprobar Solicitud';
  icon = 'check';
  color = '#4caf50';
  subtitle = 'Aprobar solicitud de modificación';
  minDate = new Date();

  requestForm = new FormGroup({
    end: new FormControl(
      '',
      [
        Validators.required,
      ],
    ),
    description: new FormControl(
      '',
      [
        Validators.maxLength(200),
        Validators.required,
        Validators.minLength(10)
      ],
    ),
  });

  accept() {

    const tmp = {};
    tmp['initialApprovalDate'] = moment().format('YYYY-MM-DD');
    tmp['endApprovalDate'] = moment(this.requestForm.controls.end.value).format('YYYY-MM-DD');
    tmp['approvalDescription'] = this.requestForm.controls.end.value;
    tmp['requestStatusId'] = 1;
    tmp['id'] = this.incomingdata.id;

    this.schoolService
      .accept(tmp)
      .subscribe(
        response => {
          this.dialogRef.close({ state: 1, message: 'Solicitud aprobada. La institución puede editar el periodo a partir de este momento.' });
        },
        error => {
          this.dialogRef.close({ state: 0, message: 'No se pudo realizar la acción. Intenta de más tarde.' });
        },
      );

  }

}
