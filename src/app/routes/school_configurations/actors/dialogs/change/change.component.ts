import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SchoolService } from '../../../../../services';

@Component({
	selector: 'app-banks-dialogs-create',
	templateUrl: './change.component.html',
	styleUrls: ['./change.component.css'],
})
export class ChangeDialogsComponent {

	constructor(
		private schoolService: SchoolService,
		private _snackBar: MatSnackBar,
		public dialogRef: MatDialogRef<ChangeDialogsComponent>,
		@Inject(MAT_DIALOG_DATA) public incomingdata: any
	) {
	}

	title = 'Habilitar usuario';
	icon = 'check';
	color = '#459847';
	subtitle = 'Habilitar a ' + this.incomingdata.name;
	role = this.incomingdata.actionId === 1 ? 'Revisor' : 'Aprobador';

	closeForm = new FormGroup({
		validate: new FormControl('', [Validators.required])
	});

	get form() {
		return this.closeForm.controls;
	}

	change() {
		console.log(this.incomingdata)
		this.schoolService
			.activate(this.incomingdata.id)
			.subscribe(
				response => {
					this.dialogRef.close({ state: 1, message: 'Usuario habilitado como ' + this.role });
				},
				error => {
					console.log(error);
					this.dialogRef.close({
						state: 0,
						message: 'Error al ejecutar la acción. Intentalo de nuevo más tarde.'
					});
				});
	}
}
