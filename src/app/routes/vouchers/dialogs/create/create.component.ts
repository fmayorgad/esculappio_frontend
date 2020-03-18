import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { VoucherService } from '../../../../services';

@Component({
  selector: 'app-vouchers-dialogs-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class VouchersDialogsCreateComponent {
  title = 'Crear';
  icon = 'add';
  color = '#4caf50';
  subtitle = 'Crear Comprobante';

  voucherForm = new FormGroup({
    description: new FormControl(
      '',
      [Validators.required],
    ),
    code: new FormControl(
      '',
      [Validators.required],
    ),
  });

  constructor(
    public voucherService: VoucherService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<VouchersDialogsCreateComponent>,
  ) {
  }

  get form() {
    return this.voucherForm.controls;
  }

  create() {
    this.voucherService
      .createVoucher(
        `${this.form.description.value}`,
        `1`,
        `${this.form.code.value}`
      )
      .subscribe(
        response => {
          this.dialogRef.close({ state: 1, message: "Registro guardado satisfactoriamente." });
        },
        error => {
          this.dialogRef.close({ state: 0, message: "No se pudo realizar la acción. Intenta de más tarde." });
        },
      );
  }
}
