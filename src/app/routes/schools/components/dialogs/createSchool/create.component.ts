import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { environmentvariables } from '../../../../../../assets/data/environmentvariables';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { LocationService } from '../../../../../services/location.service';
import { SchoolService } from '../../../../../services'
import { MatSnackBar } from '@angular/material/snack-bar';
import { timeout } from 'rxjs/operators';
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
  selector: 'createschool',
  templateUrl: 'create.html',
})

export class createSchoolDialogComponent implements OnInit {

  constructor(
    private locationService: LocationService,
    private _snackBar: MatSnackBar,
    private schoolService: SchoolService,
    public dialogRef: MatDialogRef<createSchoolDialogComponent>,
  ) { }

  title = 'Crear';
  icon = 'add';
  color = color;
  subtitle = 'Crear colegio en la plataforma';
  p = '';
  pc = '';

  countries;
  departments;
  cities;

  createFormGroup = new FormGroup({
    name: new FormControl('', [Validators.maxLength(75), Validators.required, Validators.minLength(10)]),
    nit: new FormControl('', [Validators.maxLength(12), Validators.required]),
    address: new FormControl('', [Validators.maxLength(75), Validators.required, Validators.minLength(10)]),
    neighborhood: new FormControl('', [Validators.maxLength(75), Validators.required, Validators.minLength(10)]),
    phones: new FormControl('', [Validators.maxLength(50), Validators.minLength(7), Validators.required]),
    fax: new FormControl('', [Validators.maxLength(50), Validators.minLength(7)]),
    countryId: new FormControl('', [Validators.required]),
    departmentId: new FormControl('', [Validators.required]),
    townId: new FormControl('', [Validators.required]),
    superadminname: new FormControl('', [Validators.maxLength(75), Validators.required, Validators.minLength(10)]),
    superadminemail: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators. required, Validators.maxLength(75) ]),
    passwordconfirm: new FormControl('', [this.comparation(this), Validators.required], )
  }
  );

  comparation(c ) {
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

  create() {
    console.log(this.createFormGroup);
    console.log(this.createFormGroup.value);

    let obj = {
      nit: this.createFormGroup.value.nit,
      name: this.createFormGroup.value.name,
      address: this.createFormGroup.value.address,
      neighborhood: this.createFormGroup.value.neighborhood,
      phones: this.createFormGroup.value.phones,
      fax: this.createFormGroup.value.phones,
      cityId: this.createFormGroup.value.townId,
      comuneId: 1,
      sectorId: 1,
      user: {
        name: this.createFormGroup.value.superadminname,
        email:  this.createFormGroup.value.superadminemail,
        password: this.createFormGroup.value.passwordconfirm
      }
    };

    this.schoolService.createSchool(obj).subscribe(
      data => {
        this.dialogRef.close({state: 1, message:"Institución creada."});
      },
      error => {
        // this.alertService.error(error);
        console.log(error);
        this.dialogRef.close({
          state: 0,
          message: 'Error al ejecutar la acción. Intentalo de neuvo más tarde.'
        });
      }); 
  }


  ngOnInit() {
    this.getAllContries();
  }

}


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

const color = environmentvariables.colors.success;
