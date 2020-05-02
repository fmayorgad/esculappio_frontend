import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminUsersService, GlobalService, QuestionsService } from '@services';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

const identype = {
  'Cédula de Ciudadanía': 1,
  'Cédula de Extranjería': 2,
  'Pasaporte': 3,
  'Registro Civil': 4,
  'Tarjeta de Identidad': 5
}

@Component({
  selector: 'user-addprocedure-create',
  templateUrl: './procedure.component.html',
  styleUrls: ['./procedure.component.css'],
})

export class ProcedureCreateComponent implements OnInit {

  title = 'Crear Historia Clínica';
  icon = 'add';
  color = '#4caf50';
  subtitle = 'Crear historia para el paciente.';

  eps;
  organs;

  mainForm = new FormGroup({
    eps: new FormControl(
      1,
      [
      ],
    ),
    organId: new FormControl(
      1,
      [
        Validators.required
      ],
    ),
  });

  constructor(
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ProcedureCreateComponent>,
    private adminUsersService: AdminUsersService,
    private globalService: GlobalService,
    private questionsService: QuestionsService,
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

  getOrgans() {
    this.questionsService.getAll().subscribe(
      response => {
        this.organs = response;
      },
      error => {
        this._snackBar.open('Error al traer el listado de organos. Intentalo de nuevo más tarde', 'Aceptar', {
          duration: 3000,
          panelClass: 'snackbarError'
        });
      },
    );
  }

  create() {

    const tmp = {
      organId: this.mainForm.controls.organId.value,
      eps: this.mainForm.controls.eps.value,
      patientId: this.incomingdata.id,
      state: 1
    };

    this.adminUsersService
      .createProcedure(tmp)
      .subscribe(
        response => {
          this.dialogRef.close({ state: 1, message: 'Procedimiento creado satisfactoriamente.' });
        },
        error => {
          this._snackBar.open('Error al crear el procedimiento. Intentalo de nuevo más tarde', 'Aceptar', {
            duration: 3000,
            panelClass: 'snackbarError'
          });
        },
      );
  }

  upload() {
    // const formData: any = new FormData();
    // const files: Array<File> = this.filesToUpload;
    // console.log(files);

    // for (let i = 0; i < files.length; i++) {
    //   formData.append("uploads[]", files[i], files[i]['name']);
    // }
    // console.log('form data variable :   ' + formData.toString());
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
    this.getOrgans();
  }
}
