import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { CampusService } from '../../../../../services';

@Component({
	selector: 'app-banks-dialogs-create',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.css'],
})
export class SubsidiariesDialogsEditComponent {
	title = 'Editando';
	icon = 'group';
	color = '#4caf50';
	subtitle = this.incomingdata.name;

	constructor(
		private _snackBar: MatSnackBar,
		public dialogRef: MatDialogRef<SubsidiariesDialogsEditComponent>,
		@Inject(MAT_DIALOG_DATA) public incomingdata: any,
		public campusService: CampusService,
	) {
	}

	proyectosForm = new FormGroup({
		code: new FormControl(
			this.incomingdata.code,
			[
				Validators.maxLength(75),
				Validators.required,
				Validators.minLength(5),
			],
		),
		name: new FormControl(
			this.incomingdata.name,
			[
				Validators.maxLength(75),
				Validators.required,
				Validators.minLength(5),
			],
		),
	});


	get form() {
		return this.proyectosForm.controls;
	}

	edit() {
		this.campusService
		  .edit(
			{
				code: this.form.code.value,
				name: this.form.name.value,
				schoolId: 5,
				// name: this.form.name.value,
			},
			this.incomingdata.id
		  )
		  .subscribe(
			response => {
			  this.dialogRef.close({ state: 1, message: 'Registro editado satisfactoriamente.' });
			},
			error => {
			  this.dialogRef.close({ state: 0, message: 'No se pudo realizar la acción. Intenta de más tarde.' });
			},
		  );
	}
}
