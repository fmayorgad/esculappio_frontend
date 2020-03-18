import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SchoolService } from '../../../../../services';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
	selector: 'app-banks-dialogs-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.css'],
})
export class CreateDialogComponent {

	constructor(
		private _snackBar: MatSnackBar,
		public dialogRef: MatDialogRef<CreateDialogComponent>,
		public schoolService: SchoolService,
		public dialog: MatDialog,
	) {
	}

	title = 'Crear';
	icon = 'add';
	color = '#4caf50';
	subtitle = 'Crear usuario';

	createFormGroup = new FormGroup({
		name: new FormControl(
			'',
			[
				Validators.maxLength(75),
				Validators.required,
				Validators.minLength(5),
			],
		),
		charge: new FormControl(
			'',
			[
				Validators.maxLength(75),
				Validators.required,
				Validators.minLength(5),
			],
		),
		actionId: new FormControl(
			'',
			[
				Validators.required,
			],
		),
	});


	create() {
		this.schoolService
			.createUserAproverReviewer({
				name: this.createFormGroup.value.name,
				charge: this.createFormGroup.value.charge,
				actionId: this.createFormGroup.value.actionId,
			})
			.subscribe(
				response => {
					this.dialogRef.close({ state: 1, message: 'Usuario creado satisfactoriamente.' });
				},
				error => {
					this.dialogRef.close({ state: 0, message: 'No se pudo realizar la acción. Intenta de más tarde.' });
				},
			);
	}

}
