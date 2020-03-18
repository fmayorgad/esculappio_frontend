import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { SchoolService } from '../../../../../services';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import * as moment from 'moment';

@Component({
  selector: 'app-dialogs-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'],
})
export class RequestDialogComponent {

  constructor(
    private schoolService: SchoolService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<RequestDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public incomingdata: any
  ) {
  }
  data = this.incomingdata;
  title = 'Solicitud de modificación';
  icon = 'swap_vert';
  color = '#4caf50';
  subtitle = 'Solicitud para: ' + this.incomingdata.startDate;
  minDate = new Date();
  maxDate = moment().add(5, 'days').toDate();

  requestForm = new FormGroup({
    init: new FormControl(
      null,
      [
        Validators.maxLength(75)
      ],
    ),
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


  get form() {
    return this.requestForm.controls;
  }

  selectFirstDate() {
    console.log(232)
  }

  makeRequest() {
    const tmp = {};
    tmp['startDateRequested'] = moment(this.form.init.value).format('YYYY-MM-DD');
    tmp['endDateRequested'] = moment(this.form.end.value).format('YYYY-MM-DD');
    tmp['description'] = this.form.description.value;
    tmp['monthId'] = this.incomingdata.id;

    this.schoolService
      .makeRequest(tmp)
      .subscribe(
        response => {
          this.dialogRef.close({ state: 1, message: 'Solicitud enviada satisfactoriamente.' });
        },
        error => {
          this.dialogRef.close({ state: 0, message: 'No se pudo realizar la acción. Intenta de más tarde.' });
        },
      );
  }
}

