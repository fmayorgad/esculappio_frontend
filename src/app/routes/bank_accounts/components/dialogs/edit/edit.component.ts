
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { environmentvariables } from '../../../../../../assets/data/environmentvariables'
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { LocationService } from '../../../../../services/location.service';
import { GlobalService, BankAccountsService } from '../../../../../services'
import { MatSnackBar } from '@angular/material/snack-bar';
import { timeout } from 'rxjs/operators';
import { createNewHosts } from '@angularclass/hmr';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'editchool',
  templateUrl: 'edit.html',
})

export class EditSchoolDialogComponent implements OnInit {

  constructor(
    private locationService: LocationService,
    private _snackBar: MatSnackBar,
    public globalService: GlobalService,
    private bankAccountsService: BankAccountsService,
    public dialogRef: MatDialogRef<EditSchoolDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public incomingdata: any
  ) { }

  title = 'Editando';
  icon = 'business';
  color = color;
  subtitle = this.incomingdata.description;

  data = this.incomingdata;
  countries;
  departments;
  cities;
  createFormGroup;
  pucs = [];
  originalpucs = [];
  accountTypes = [];

  applyFilter(filterValue: string) {
    let t = filterValue;
    this.pucs = this.originalpucs.filter(d => {
      return d.description.trim().toLowerCase().includes(t.trim().toLowerCase()) | d.code.includes(t);
    });
    console.log(this.pucs);
    console.log(t)
  }
  edit() {

    let obj = {
      code: this.createFormGroup.value.code,
      description: this.createFormGroup.value.description,
      accountTypeId: this.createFormGroup.value.accountTypeId,
      singleAccountPlanId: this.createFormGroup.value.singleAccountPlanId,
      accountNumber: this.createFormGroup.value.number,
      printCheck: this.createFormGroup.value.printable === true ? 1 : 0
    };

    this.bankAccountsService.edit(obj, this.incomingdata.id).subscribe(
      data => {
        this.dialogRef.close({ state: 1, message: 'Cuenta editada.' });
      },
      error => {
        this.dialogRef.close({
          state: 0,
          message: 'Error al ejecutar la acción. Intentalo de neuvo más tarde.'
        });
      });
  }


  ngOnInit() {

    this.globalService.getBankAccountTypes().subscribe(
      data => {
        console.log(data)
        this.accountTypes = data;
      },
      error => {
        this.dialogRef.close({
          state: 0,
          message: 'Error al ejecutar la acción. Intentalo de neuvo más tarde.'
        });
      });

    this.globalService.getPUCs().subscribe(
      data => {
        console.log(data)
        this.pucs = data;
        this.originalpucs = data;
        console.log(this.pucs)
      },
      error => {
        this.dialogRef.close({
          state: 0,
          message: 'Error al ejecutar la acción. Intentalo de neuvo más tarde.'
        });
      });
    console.log(this.incomingdata)
    this.createFormGroup = new FormGroup({
      code: new FormControl(this.incomingdata.code, [Validators.maxLength(3), Validators.required, Validators.minLength(3)]),
      description: new FormControl(this.incomingdata.description, [Validators.maxLength(50), Validators.minLength(3), Validators.required]),
      accountTypeId: new FormControl(this.incomingdata.accountTypeId, [Validators.required]),
      pucfilter: new FormControl(this.incomingdata.pucfilter, []),
      singleAccountPlanId: new FormControl(this.incomingdata.singleAccountPlanId, [Validators.required]),
      number: new FormControl(this.incomingdata.accountNumber, [Validators.maxLength(15), Validators.required, Validators.minLength(8)]),
      printable: new FormControl(true, []),
    }
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