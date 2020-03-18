import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { SchoolService } from '../../../../../services';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import * as moment from 'moment';

@Component({
  selector: 'app-dialogs-request',
  templateUrl: './showrequests.component.html',
})
export class ShowRequestsDialogComponent implements OnInit {

  constructor(
    private schoolService: SchoolService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ShowRequestsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public incomingdata: any
  ) {
  }
  data = this.incomingdata;
  title = 'Solicitudes de modificación';
  icon = 'view_list';
  color = '#4caf50';
  subtitle = 'Solicitudes del Periodo ' + this.incomingdata.startDate;

  month = this.incomingdata

  ngOnInit() {
    console.log(this.month)
  }

}

