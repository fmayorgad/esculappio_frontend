import { Component, OnInit, ViewChild , Inject} from '@angular/core';
import { environmentvariables } from '../../../../../../assets/data/environmentvariables';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ThirdPartyTypesService } from '../../../../../services';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
	selector: 'createschool',
	templateUrl: 'edit.html',
})

export class EditThirdTypeDialogComponent {

	constructor(
		private thirdPartyTypesService: ThirdPartyTypesService,
		private _snackBar: MatSnackBar,
		public dialogRef: MatDialogRef<EditThirdTypeDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public incomingdata: any
	) { }
	title = 'Editando';
	icon = 'group';
	color = color;
	subtitle = this.incomingdata.description;

	createFormGroup = new FormGroup({
		name: new FormControl(this.incomingdata.description, [Validators.maxLength(75), Validators.required, Validators.minLength(5)]),
	});

	matcher = new MyErrorStateMatcher();

	edit() {
		this.thirdPartyTypesService.edit( this.createFormGroup.value.name, this.incomingdata.id).subscribe(
			response => {
			  this.dialogRef.close({ state: 1, message: 'Datos guardados satisfactoriamente.' });
			},
			error => {
			  this.dialogRef.close({ state: 0, message: 'No se pudo realizar la acción. Intenta de más tarde.' });
			},
		  );
	}
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		const isSubmitted = form && form.submitted;
		return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
	}
}

const color = environmentvariables.colors.success;
