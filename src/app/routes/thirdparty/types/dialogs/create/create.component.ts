import { Component, OnInit, ViewChild , Inject} from '@angular/core';
import { environmentvariables } from '../../../../../../assets/data/environmentvariables';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ThirdPartyTypesService } from '../../../../../services';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
	selector: 'createschool',
	templateUrl: 'create.html',
})

export class CreateThirdTypeDialogComponent {

	constructor(
		private thirdPartyTypesService: ThirdPartyTypesService,
		private _snackBar: MatSnackBar,
		public dialogRef: MatDialogRef<CreateThirdTypeDialogComponent>,
	) { }
	title = 'Crear';
	icon = 'add';
	color = color;
	subtitle = 'Crear un Tipo de Tercero.';

	createFormGroup = new FormGroup({
		name: new FormControl('', [Validators.maxLength(75), Validators.required, Validators.minLength(5)]),
	});

	matcher = new MyErrorStateMatcher();

	create() {
		this.thirdPartyTypesService.create({
			description: this.createFormGroup.value.name
		}).subscribe(
			data => {
				console.log(data);
			},
			error => {
				// this.alertService.error(error);
				console.log(error)
			});
		this._snackBar.open("Tipo de Tercero creado satisfactoriamente.", "Aceptar", {
			duration: 3000,
		}); 
		this.dialogRef.close("Todo creado satisfactoriamente");
	}
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		const isSubmitted = form && form.submitted;
		return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
	}
}

const color = environmentvariables.colors.success;
