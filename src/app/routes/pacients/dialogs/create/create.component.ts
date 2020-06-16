import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminUsersService, GlobalService } from '@services';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

const identype = {
  'Cédula de Ciudadanía': 1,
  'Cédula de Extranjería': 2,
  'Pasaporte': 3,
  'Registro Civil': 4,
  'Tarjeta de Identidad': 5
}

@Component({
  selector: 'user-admin-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})

export class UserPacientCreateComponent implements OnInit {

  title = 'Crear Paciente';
  icon = 'add';
  color = '#4caf50';
  subtitle = 'Crear paciente pendiente de diagnostico.';

  eps;

  tnm = null;
  tnm2 = null;

  mainForm = new FormGroup({
    name: new FormControl(
      '',
      [
        Validators.maxLength(75),
        Validators.required,
        Validators.minLength(2),
      ],
    ),
    email: new FormControl(
      '',
      [
        Validators.maxLength(20),
        Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"),
        Validators.required,
        Validators.minLength(8),
      ],
    ),
    lastname: new FormControl(
      '',
      [
        Validators.maxLength(75),

        Validators.minLength(2),
      ],
    ),
    gender: new FormControl(
      'F',
      [
        Validators.required,
      ],
    ),
    password: new FormControl(
      '',
      [
        Validators.maxLength(12),
        Validators.minLength(8),
        Validators.required,
      ],
    ),

    cellphone: new FormControl(
      '',
      [
        Validators.maxLength(25),
        Validators.minLength(10),
        Validators.required,
      ],
    ),

    phone: new FormControl(
      '',
      [
        Validators.maxLength(15),
        Validators.minLength(7),
        Validators.required,
      ],
    ),

    surname: new FormControl(
      '',
      [
        Validators.maxLength(75),
        Validators.required,
        Validators.minLength(2),
      ],
    ),

    eps: new FormControl(
      1,
      [

      ],
    ),
    blood_group: new FormControl(
      'A',
      [
        Validators.required
      ],
    ),
    rh_factor: new FormControl(
      '+',
      [
        Validators.required
      ],
    ),
    identificationType: new FormControl(
      1,
      [
        Validators.required,
      ],
    ),
    identificationValue: new FormControl(
      '',
      [
        Validators.maxLength(12),
        Validators.required,
        Validators.minLength(7),
      ],
    ),
    profile: new FormControl(
      3,
      [
      ],
    ),
 
  });

  constructor(
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UserPacientCreateComponent>,
    private adminUsersService: AdminUsersService,
    private globalService: GlobalService,
    @Inject(MAT_DIALOG_DATA) public incomingdata: any
  ) {
  }

  filesToUpload: Array<File> = [];

  get form() {
    return this.mainForm.controls;
  }

  test() {
    console.log(this.mainForm.valid);
  }

  getEPS() {
    this.globalService.getEPS().subscribe(
      response => {
        this.eps = response;
      },
      error => {
        this._snackBar.open('Error al traer las EPS. Intentalo de nuevo más tarde', 'Aceptar', {
          duration: 3000,
          panelClass: 'snackbarError'
        });
      },
    );
  }

  create() {

    const tmp = {
      name: this.mainForm.controls.name.value,
      email: this.mainForm.controls.email.value,
      lastname: this.mainForm.controls.lastname.value,
      gender: this.mainForm.controls.gender.value,
      surname: this.mainForm.controls.surname.value,
      identificationType: this.mainForm.controls.identificationType.value,
      identificationValue: this.mainForm.controls.identificationValue.value,
      profileId: 4,
      password: this.mainForm.controls.password.value,
      cellphone: this.mainForm.controls.cellphone.value,
      phone: this.mainForm.controls.phone.value,
      eps: this.mainForm.controls.eps.value,
      blood_group: this.mainForm.controls.blood_group.value,
      rh_factor: this.mainForm.controls.rh_factor.value,
    };

    this.adminUsersService
      .createAdmin(tmp)
      .subscribe(
        response => {
          this.dialogRef.close({ state: 1, message: 'Usuario creado satisfactoriamente.' });
        },
        error => {
          this._snackBar.open('Error al crear el usuario. Intentalo de nuevo más tarde', 'Aceptar', {
            duration: 3000,
            panelClass: 'snackbarError'
          });
        },
      );
  }

  upload() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    console.log(files);

    for (let i = 0; i < files.length; i++) {
      formData.append("uploads[]", files[i], files[i]['name']);
    }
    console.log('form data variable :   ' + formData.toString());
    // this.http.post('http://localhost:3003/upload', formData)
    //   .map(files => files.json())
    //   .subscribe(files => console.log('files', files))
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    //this.product.photo = fileInput.target.files[0]['name'];
  }

  ngOnInit() {
    this.getEPS();
  }
}
