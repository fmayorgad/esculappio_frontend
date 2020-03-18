import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RevenueService } from '../../../../services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-revenue-dialogs-create',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class RevenueDialogsEditComponent {
  title = 'Edición';
  icon = 'group';
  color = '#4caf50';
  subtitle = this.incomingdata.description;

  revenueForm = new FormGroup({
    description: new FormControl(
      this.incomingdata.description,
      [Validators.required],
    ),
    classification: new FormControl(
      this.incomingdata.classification,
      [Validators.required],
    ),
    code: new FormControl(
      this.incomingdata.code,
      [Validators.required],
    ),
  });

  clasifications = [
    {
      id: 1,
      name: 'Detalle'
    }, 
    {
      id:2,
      name: "Titulo"
    }]

  constructor(
    public revenueService: RevenueService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<RevenueDialogsEditComponent>,
    @Inject(MAT_DIALOG_DATA) public incomingdata: any
  ) {
  }

  get form() {
    return this.revenueForm.controls;
  }

  edit() {
    this.revenueService
      .edit(
        `${this.form.description.value}`,
        `${this.form.classification.value}`,
        `${this.form.code.value}`,
        this.incomingdata.id
      )
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
