import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { VoucherService } from '../../../../services';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-vouchers-dialogs-create',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class VouchersDialogsEditComponent {
  title = 'Editar';
  icon = 'group';
  color = '#4caf50';
  subtitle = this.incomingdata.description;

  voucherForm = new FormGroup({
    description: new FormControl(
     this.incomingdata.description,
      [Validators.required],
    ),
    code: new FormControl(
     this.incomingdata.code,
      [Validators.required],
    ),
  });

  constructor(
    public voucherService: VoucherService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<VouchersDialogsEditComponent>,
    @Inject(MAT_DIALOG_DATA) public incomingdata: any
  ) {
  }

  get form() {
    return this.voucherForm.controls;
  }

  edit() {
    this.voucherService
      .edit(
        `${this.form.description.value}`,
        `1`,
        `${this.form.code.value}`,
        this.incomingdata.id
      )
      .subscribe(
        response => {
          this.dialogRef.close({ state: 1, message: "Registro editado satisfactoriamente." });
        },
        error => {
          this.dialogRef.close({ state: 0, message: "No se pudo realizar la acción. Intenta de más tarde." });
        },
      );
  }
}
