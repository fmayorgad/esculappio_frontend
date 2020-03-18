import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BudgetNotesService } from '../../../../../services';

@Component({
	selector: 'budget-close-dialog',
	templateUrl: './close.component.html',
	styleUrls: ['./close.component.css'],
})
export class CloseDialogsComponent {

	constructor(
		private budgetNotesService: BudgetNotesService,
		private _snackBar: MatSnackBar,
		public dialogRef: MatDialogRef<CloseDialogsComponent>,
		@Inject(MAT_DIALOG_DATA) public incomingdata: any
	) {
	}

	title = 'Anular Nota';
	icon = 'close';
	color = '#ef291b';
	subtitle = 'Cancelar Nota presupuestal';
	startDate = this.incomingdata.startDate;

	closeForm = new FormGroup({
		validate: new FormControl('', [Validators.required])
	});

	get form() {
		return this.closeForm.controls;
	}

	close() {
		this.budgetNotesService
			.cancel(this.incomingdata.id)
			.subscribe(
				response => {
					this.dialogRef.close({ state: 1, message: 'Nota Presupuestal anulada satisfactoriamente.' });
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
