
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { environmentvariables } from '../../../../../../assets/data/environmentvariables';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { LocationService } from '../../../../../services/location.service';
import { SchoolService } from '../../../../../services'
import { MatSnackBar } from '@angular/material/snack-bar';
import { timeout } from 'rxjs/operators';
import { createNewHosts } from '@angularclass/hmr';
import { MatDialogRef } from '@angular/material/dialog';

function compare() {
  //console.log(p,p1)
  return (control): { [key: string]: boolean } | null => {
    if (1 === 1) {
      return { 'invaeeeelid': true };
    }
    return null;
  };
}

@Component({
  selector: 'editchool',
  templateUrl: 'edit.html',
})

export class EditSchoolDialogComponent implements OnInit {

  constructor(
    private locationService: LocationService,
    private _snackBar: MatSnackBar,
    private schoolService: SchoolService,
    public dialogRef: MatDialogRef<EditSchoolDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public incomingdata: any
  ) { }

  title = '';
  icon = 'business';
  color = color;
  subtitle = '';
  p = '';
  pc = '';
  data = this.incomingdata;
  countries;
  departments;
  cities;
  createFormGroup;

  comparation(c) {
    return (control): { [key: string]: boolean } | null => {
      // valido que ya este creado el objeto formulario
      if (this.createFormGroup) {
        return this.createFormGroup.controls.password.value !== this.createFormGroup.controls.passwordconfirm.value ? { noMatch: true } : null;
      }
    };
  }

  getAllContries() {
    this.locationService.getCountry().subscribe(
      data => {
        console.log(data);
        this.countries = data;
      },
      error => {
        console.log(error);
      });
  }

  getDepartments() {
    console.log(this.createFormGroup.value.countryId)
    this.locationService.getDepartment(this.createFormGroup.value.countryId).subscribe(
      data => {
        console.log(data);
        this.departments = data;
      },
      error => {
        console.log(error);
      });
  }

  getCities() {
    this.locationService.getCities(this.createFormGroup.value.departmentId).subscribe(
      data => {
        console.log(data);
        this.cities = data;
      },
      error => {
        console.log(error);
      });
  }

  edit() {
    console.log(this.createFormGroup);
    console.log(this.createFormGroup.value);
    let obj = {
      nit: this.createFormGroup.value.nit,
      name: this.createFormGroup.value.name,
      address: this.createFormGroup.value.address,
      neighborhood: this.createFormGroup.value.neighborhood,
      phones: this.createFormGroup.value.phones,
      fax: this.createFormGroup.value.phones

    };

    this.schoolService.edit(this.incomingdata.id, obj).subscribe(
      data => {
        console.log(data);
        this.dialogRef.close({ state: 1, message: "Institución editada." });
      },
      error => {
        this.dialogRef.close({ state: 0, message: "Institución no pudo ser editada. Intentalo de nuevo en unos momentos." });
        console.log(error);
      });

  }


  ngOnInit() {
    this.getAllContries();
    this.title = 'Editando Colegio';
    this.subtitle = this.data.name;

    console.log(this.incomingdata)

    this.createFormGroup = new FormGroup({
      name: new FormControl(this.data.name, [Validators.maxLength(75), Validators.required, Validators.minLength(10)]),
      nit: new FormControl(this.data.nit, [Validators.maxLength(12), Validators.required]),
      address: new FormControl(this.data.address, [Validators.maxLength(75), Validators.required, Validators.minLength(10)]),
      neighborhood: new FormControl(this.data.neighborhood, [Validators.maxLength(75), Validators.minLength(10)]),
      phones: new FormControl(this.data.phones, [Validators.maxLength(50), Validators.minLength(7), Validators.required]),
      fax: new FormControl(this.data.fax, [Validators.maxLength(50), Validators.minLength(7)]),
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
