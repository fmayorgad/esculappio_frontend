import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectsService } from '../../../../../services';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
	selector: 'app-banks-dialogs-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.css'],
})
export class ProyectsDialogsCreateComponent {

	constructor(
		private _snackBar: MatSnackBar,
		public dialogRef: MatDialogRef<ProyectsDialogsCreateComponent>,
		public projectsService: ProjectsService,
		public dialog: MatDialog,
	) {
	}

	title = 'Crear';
	icon = 'add';
	color = '#4caf50';
	subtitle = 'Crear un Proyecto';

	proyectosForm = new FormGroup({
		code: new FormControl(
			'',
			[
				Validators.maxLength(75),
				Validators.required,
				Validators.minLength(5),
			],
		),
		description: new FormControl(
			'',
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

	create() {
		this.projectsService
			.create({
				code: this.form.code.value,
				description: this.form.description.value,
			})
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
