import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { BankService } from '../../../../services';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-banks-dialogs-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class BanksDialogsEditComponent {

  constructor(
    private bankService: BankService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<BanksDialogsEditComponent>,
    @Inject(MAT_DIALOG_DATA) public incomingdata: any
  ) {
  }
  data = this.incomingdata;
  title = 'Editar';
  icon = 'group';
  color = '#4caf50';
  subtitle = this.incomingdata.name;


  bankForm = new FormGroup({
    name: new FormControl(
      this.incomingdata.name,
      [
        Validators.maxLength(75),
        Validators.required,
        Validators.minLength(5),
      ],
    ),
    code: new FormControl(
      this.incomingdata.code,
      [
        Validators.maxLength(75),
        Validators.required,
        Validators.minLength(2),
      ],
    ),
  });


  get form() {
    return this.bankForm.controls;
  }

  edit() {
    this.bankService
      .edit(`${this.form.name.value}`, `${this.form.code.value}`,this.data.id)
      .subscribe(
        response => {
          this.dialogRef.close({ state: 1, message: "Datos guardados satisfactoriamente." });
        },
        error => {
          this.dialogRef.close({ state: 0, message: "No se pudo realizar la acción. Intenta de más tarde.." });
        },
      );
  }
}
