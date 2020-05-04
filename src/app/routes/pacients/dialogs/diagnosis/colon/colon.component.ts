import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminUsersService } from '@services';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { saveAs as importedSaveAs } from "file-saver";



@Component({
  selector: 'user-colondiagnostico-create',
  templateUrl: './colon.component.html',
  styleUrls: ['./colon.component.css'],
})

export class ColonDiagnosisComponent implements OnInit {

  title = this.incomingdata.patiente.name + ' ' + this.incomingdata.patiente.surname + ' ' + this.incomingdata.patiente.lastname;
  icon = 'how_to_reg';
  color = 'green';
  subtitle = 'Diagnostico para Colon - Rector';

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

  tnms;

  @ViewChild('inputFile') myInputVariable: ElementRef;


  constructor(
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ColonDiagnosisComponent>,
    private adminUsersService: AdminUsersService,
    @Inject(MAT_DIALOG_DATA) public incomingdata: any
  ) {
  }

  filesToUpload: Array<File> = [];

  tnm = 1;
  tnm2 = 1;

  mainForm = new FormGroup({
    biopsia: new FormControl(
      1,
      [
        Validators.required,
      ],
    ),
    localizacion: new FormControl(
      1,
      [
        Validators.required,
      ],
    ),

    her: new FormControl(
      1,
      [
        Validators.required,
      ],
    ),
  });

  getTnms() {
    this.adminUsersService.getTnms().subscribe(data => {
      this.tnms = data.filter(o => o.organId === 3);
    },
      error => {
        console.log(error)
        this._snackBar.open(error, 'Aceptar', {
          duration: 3000,
          panelClass: 'snackbarError'
        });
      });
  }

  upload() {

    const fd = new FormData();
    fd.append('files', this.fileToUpload, this.fileToUpload.name);
    fd.append('procedure', this.incomingdata.id);
    fd.append('type', this.fileType);

    this.adminUsersService.uploadFile(fd).subscribe(data => {

      this.myInputVariable.nativeElement.value = '';
      this.fileButton = true;
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

  getFile(id, name) {
    this._snackBar.open('Descargando archivo...', 'Aceptar', {
      duration: 10000,
      panelClass: 'snackbarInfo'
    });

    this.adminUsersService.getFileById(id).subscribe(blob => {
      importedSaveAs(blob, name);
      this._snackBar.open('Archivo ' + name + ' descargado correctamente.', 'Aceptar', {
        duration: 3000,
        panelClass: 'snackbarSuccess'
      });
    },
      error => {
        this._snackBar.open('Error al descargar el archivo. Intentalo de nuevo más tarde: ' + error, 'Aceptar', {
          duration: 3000,
          panelClass: 'snackbarError'
        });
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
  }

  ngOnInit() {
    this.getTnms();
    this.getById();
  }
}
