import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminUsersService } from '@services';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

const identype = {
  'Cédula de Ciudadanía': 1,
  'Cédula de Extranjería': 2,
  'Pasaporte': 3,
  'Registro Civil': 4,
  'Tarjeta de Identidad': 5
}

@Component({
  selector: 'user-adddocument-create',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
})

export class DocumentCreateComponent implements OnInit {

  title = 'Completar Procedimiento';
  icon = 'add';
  color = '#2196f3';
  subtitle = 'Completar los documentos faltantes para diagnosticar.';

  user = this.incomingdata.patiente.name + ' ' + this.incomingdata.patiente.surname + ' ' + this.incomingdata.patiente.lastname;
  userfiles = {
    b: this.incomingdata.filesMedicalProcedure.filter(f => f.fileType === 'Biopsia'),
    i: this.incomingdata.filesMedicalProcedure.filter(f => f.fileType === 'Imagenes médicas'),
    r: this.incomingdata.filesMedicalProcedure.filter(f => f.fileType === 'Radioterapias'),
    q: this.incomingdata.filesMedicalProcedure.filter(f => f.fileType === 'Quimioterapia'),
    h: this.incomingdata.filesMedicalProcedure.filter(f => f.fileType === 'Historia clínica'),
  };
  fileToUpload: File = null;
  fileType = 'Biopsia';
  fileButton = true;


  constructor(
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DocumentCreateComponent>,
    private adminUsersService: AdminUsersService,
    @Inject(MAT_DIALOG_DATA) public incomingdata: any
  ) {
  }

  filesToUpload: Array<File> = [];

  upload() {

    const fd = new FormData();
    fd.append('files', this.fileToUpload, this.fileToUpload.name);
    fd.append('procedure', this.incomingdata.id);
    fd.append('type', this.fileType);

    this.adminUsersService.uploadFile(fd).subscribe(data => {
      this._snackBar.open('Archivo ' + this.fileToUpload.name + ' subido correctamente.', 'Aceptar', {
        duration: 3000,
        panelClass: 'snackbarSuccess'
      });
      this.getById();
    },
      error => {
        console.log(error)
        this._snackBar.open(error, 'Aceptar', {
          duration: 3000,
          panelClass: 'snackbarError'
        });
      });
  }


  deletefile(id) {
    this.adminUsersService.deleteFile(id).subscribe(data => {
      this._snackBar.open('Archivo borrado correctamente.', 'Aceptar', {
        duration: 3000,
        panelClass: 'snackbarSuccess'
      });
      this.getById();
    },
      error => {
        this._snackBar.open(error, 'Aceptar', {
          duration: 3000,
          panelClass: 'snackbarError'
        });
      });
  }

  getById() {
    this.adminUsersService.getProcedureById(this.incomingdata.id).subscribe(
      data => {
        console.log(data)
        this.userfiles = {
          b: data.filesMedicalProcedure.filter(f => f.fileType === 'Biopsia'),
          i: data.filesMedicalProcedure.filter(f => f.fileType === 'Imagenes médicas'),
          r: data.filesMedicalProcedure.filter(f => f.fileType === 'Radioterapias'),
          q: data.filesMedicalProcedure.filter(f => f.fileType === 'Quimioterapia'),
          h: data.filesMedicalProcedure.filter(f => f.fileType === 'Historia clínica'),
        };

        console.log(this.userfiles)
      },
      error => {
      });
  }

  getFile(id) {
    this.adminUsersService.getFileById(id).subscribe(
      data => {
        console.log(data)
      },
      error => {
      });
  }


  uploadFile(e) {
    this.fileToUpload = e.target.files[0];
    if (this.fileToUpload !== undefined) {
      this.fileButton = false;
    } else {
      this.fileButton = true;
    }
    console.log(this.fileButton)

  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    //this.product.photo = fileInput.target.files[0]['name'];
  }

  ngOnInit() {
    console.log(this.userfiles)
    this.getById();
  }
}
