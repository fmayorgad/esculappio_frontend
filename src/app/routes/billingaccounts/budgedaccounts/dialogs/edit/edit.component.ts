import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BudgetAccountsService } from '../../../../../services';

@Component({
  selector: 'edit-dialogs-create',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class BudgetAccountsDialogsEditComponent {
  title = 'Editando';
  icon = 'group';
  color = '#4caf50';
  subtitle = `${this.incomingdata.code} - ${this.incomingdata.description}`;

  formGroup = new FormGroup({
    code: new FormControl(
      this.incomingdata.code,
      [
        Validators.maxLength(30),
        Validators.required,
        Validators.minLength(1),
      ],
    ),
    description: new FormControl(
      this.incomingdata.description,
      [
        Validators.maxLength(75),
        Validators.required,
        Validators.minLength(4),
      ],
    ),
  });

  constructor(
    private budgetAccountsService: BudgetAccountsService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<BudgetAccountsDialogsEditComponent>,
    @Inject(MAT_DIALOG_DATA) public incomingdata: any
  ) {
  }


  edit() {
    const obj = {
      code: this.formGroup.value.code,
      description: this.formGroup.value.description,
    };
    this.budgetAccountsService
      .edit(obj,this.incomingdata.id)
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
