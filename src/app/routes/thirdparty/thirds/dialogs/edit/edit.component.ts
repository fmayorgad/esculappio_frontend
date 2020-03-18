import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { environmentvariables } from '../../../../../../assets/data/environmentvariables';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ThirdPartyTypesService } from '../../../../../services';
import { ThirdsService } from '../../../../../services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'editthird',
	templateUrl: 'edit.html',
})

export class EditThirdDialogComponent implements OnInit {

	constructor(
		private thirdsService: ThirdsService,
		private thirdPartyTypesService: ThirdPartyTypesService,
		private _snackBar: MatSnackBar,
		public dialogRef: MatDialogRef<EditThirdDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public incomingdata: any
	) { }
	title = 'Editando';
	icon = 'group';
	color = color;
	subtitle = this.incomingdata.businessName;
	typesthirds = [];

	createFormGroup = new FormGroup({
		name: new FormControl(this.incomingdata.name, [Validators.maxLength(75), Validators.required, Validators.minLength(5)]),
		businessName: new FormControl(this.incomingdata.businessName, [Validators.maxLength(75), Validators.required, Validators.minLength(5)]),
		firstname: new FormControl(this.incomingdata.surname, [Validators.maxLength(75), Validators.required, Validators.minLength(3)]),
		lastname: new FormControl(this.incomingdata.surname2, [Validators.maxLength(75), Validators.required, Validators.minLength(3)]),
		address: new FormControl(this.incomingdata.address, [Validators.maxLength(75), Validators.minLength(3)]),
		phones: new FormControl(this.incomingdata.phones, [Validators.maxLength(50),  Validators.minLength(7)]),
		cellphone: new FormControl(this.incomingdata.cellphone, [Validators.maxLength(38),  Validators.minLength(10)]),
		fax: new FormControl(this.incomingdata.fax, [Validators.maxLength(20),  Validators.minLength(5)]),
		typePerson: new FormControl(this.incomingdata.typePersonId, [Validators.required]),
		documentNumber: new FormControl(this.incomingdata.documentNumber, [Validators.required, Validators.maxLength(15), Validators.minLength(8)]),
		documentType: new FormControl(this.incomingdata.documentTypeId, [Validators.required]),
		thirdtype: new FormControl(this.incomingdata.thirdPartyTypeId, [Validators.required]),
		rent: new FormControl( this.incomingdata.declareIncome, []),
		keeper: new FormControl( this.incomingdata.isWithholdingAgent, []),
		taxpayer: new FormControl( this.incomingdata.isGreatContributor, []),
		selfkeep: new FormControl( this.incomingdata.isSelfRetainer, []),
		iva: new FormControl( this.incomingdata.vatInvoice, []),
		keep: new FormControl( this.incomingdata.retentionEffect, []),
	});

	matcher = new MyErrorStateMatcher();

	getAllTypes() {
		this.thirdPartyTypesService.getAll().subscribe(
			data => {
				console.log(data);
				this.typesthirds = data;
			},
			error => {
				// this.alertService.error(error);
				console.log(error);
			});
	}
	ngOnInit() {
		this.getAllTypes();
	}

	edit() {
		console.log(this.createFormGroup);
		console.log(this.createFormGroup.value);

		const tmp = {};
		tmp['code'] = Math.random() * 100;
		tmp['businessName'] = this.createFormGroup.value.businessName;
		tmp['surname'] = this.createFormGroup.value.firstname;
		tmp['surname2'] = this.createFormGroup.value.lastname;
		tmp['name'] = this.createFormGroup.value.name;
		tmp['name2'] = 'NA';
		tmp['phones'] = this.createFormGroup.value.phones;
		tmp['cellphone'] = this.createFormGroup.value.cellphone;
		tmp['fax'] = this.createFormGroup.value.fax;
		tmp['postalCode'] = this.createFormGroup.value.postalcode;
		tmp['address'] = this.createFormGroup.value.address;
		tmp['documentNumber'] = this.createFormGroup.value.documentNumber;
		tmp['typePersonId'] = this.createFormGroup.value.typePerson;
		tmp['documentTypeId'] = this.createFormGroup.value.documentType;
		tmp['thirdPartyTypeId'] = this.createFormGroup.value.thirdtype;

		tmp['retentionEffect'] = this.createFormGroup.value.keep === 0 ? 0 : 1;
		tmp['vatInvoice'] = this.createFormGroup.value.iva === 0 ? 0 : 1;
		tmp['isSelfRetainer'] = this.createFormGroup.value.selfkeep === 0 ? 0 : 1;
		tmp['isGreatContributor'] = this.createFormGroup.value.taxpayer === 0 ? 0 : 1;
		tmp['isWithholdingAgent'] = this.createFormGroup.value.keeper === 0 ? 0 : 1;
		tmp['declareIncome'] = this.createFormGroup.value.rent === 0 ? 0 : 1;

		this.thirdsService.edit(tmp, this.incomingdata.id).subscribe(
			data => {
				console.log(data);
				this.dialogRef.close({ state: 1, message: 'Tercero editado satisfactoriamente.' });
			},
			error => {
				this.dialogRef.close({ state: 0, message: 'No se puedo realizar la acción. Intentalo de nuevo en unos momentos.' });
				console.log(error);
			});
	}
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		const isSubmitted = form && form.submitted;
		return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
	}
}

const color = environmentvariables.colors.success;

