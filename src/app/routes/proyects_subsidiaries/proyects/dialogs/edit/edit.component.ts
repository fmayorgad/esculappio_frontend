import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { ProjectsService } from '../../../../../services';

@Component({
	selector: 'app-banks-dialogs-create',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.css'],
})
export class ProyectsDialogsEditComponent {
	title = 'Editando';
	icon = 'group';
	color = '#4caf50';
	subtitle = this.incomingdata.description;

	constructor(
		private _snackBar: MatSnackBar,
		public dialogRef: MatDialogRef<ProyectsDialogsEditComponent>,
		@Inject(MAT_DIALOG_DATA) public incomingdata: any,
		public projectsService: ProjectsService,
	) {
	}

	proyectosForm = new FormGroup({
		// name: new FormControl(
		// 	'',
		// 	[
		// 		Validators.maxLength(75),
		// 		Validators.required,
		// 		Validators.minLength(5),
		// 	],
		// ),
		code: new FormControl(
			this.incomingdata.code,
			[
				Validators.maxLength(75),
				Validators.required,
				Validators.minLength(5),
			],
		),
		description: new FormControl(
			this.incomingdata.description,
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
		this.projectsService
		  .edit(
			{
				code: this.form.code.value,
				description: this.form.description.value,
				schoolId: 5,
				// name: this.form.name.value,
			},
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
