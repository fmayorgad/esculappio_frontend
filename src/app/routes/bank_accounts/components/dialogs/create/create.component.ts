import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { environmentvariables } from '../../../../../../assets/data/environmentvariables'
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { LocationService } from '../../../../../services/location.service';
import { BankAccountsService, GlobalService } from '../../../../../services';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'createschool',
  templateUrl: 'create.html',
})

export class CreateAccountBankDialogComponent implements OnInit {

  constructor(
    private locationService: LocationService,
    private bankAccountsService: BankAccountsService,
    public dialogRef: MatDialogRef<CreateAccountBankDialogComponent>,
    public globalService: GlobalService
  ) { }

  title = 'Crear';
  icon = 'add';
  color = color;
  subtitle = 'Crear Cuenta Bancaria';
  p = '';
  pc = '';
  pucs = [];
  originalpucs = [];

  /** control for the MatSelect filter keyword */
  public bankFilterCtrl: FormControl = new FormControl();

  createFormGroup = new FormGroup({
    code: new FormControl('', [Validators.maxLength(3), Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.maxLength(50), Validators.minLength(3), Validators.required]),
    accountTypeId: new FormControl('', [Validators.required]),
    pucfilter: new FormControl('', []),
    singleAccountPlanId: new FormControl('', [Validators.required]),
    number: new FormControl('', [Validators.maxLength(15), Validators.required, Validators.minLength(8)]),
    printable: new FormControl(true, []),
  }
  );

  applyFilter(filterValue: string) {
    let t = filterValue;
    this.pucs = this.originalpucs.filter(d => {
      return d.description.trim().toLowerCase().includes(t.trim().toLowerCase()) | d.code.includes(t);
    });
    console.log(this.pucs);
    console.log(t)
  }

  accountTypes = [];

  create() {
    console.log(this.createFormGroup);
    console.log(this.createFormGroup.value);

    let obj = {
      code: this.createFormGroup.value.code,
      description: this.createFormGroup.value.description,
      accountTypeId: this.createFormGroup.value.accountTypeId,
      singleAccountPlanId: this.createFormGroup.value.singleAccountPlanId,
      accountNumber: this.createFormGroup.value.number,
      printCheck: this.createFormGroup.value.printable === true ? 1 : 0
    };

    this.bankAccountsService.create(obj).subscribe(
      data => {
        this.dialogRef.close({ state: 1, message: 'Cuenta creada.' });
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
  }

}


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

const color = environmentvariables.colors.success;
