import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminUsersService, GlobalService } from '@services';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { saveAs as importedSaveAs } from "file-saver";
import * as moment from 'moment';

const identype = {
  'Cédula de Ciudadanía': 1,
  'Cédula de Extranjería': 2,
  'Pasaporte': 3,
  'Registro Civil': 4,
  'Tarjeta de Identidad': 5
}

@Component({
  selector: 'user-mamadiagnosis-create',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})

export class OvarioDiagnosisComponent implements OnInit {

  title = this.incomingdata.patiente.name + ' ' + this.incomingdata.patiente.lastname + ' ' + this.incomingdata.patiente.surname;
  icon = 'how_to_reg';
  color = '#2196f3';
  subtitle = 'Diagnostico para Ovario';
  mainAction = this.incomingdata.state === 3 ? false : true;

  user = this.incomingdata.patiente.name + ' ' + this.incomingdata.patiente.lastname + ' ' + this.incomingdata.patiente.surname;
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
  patologies;

  @ViewChild('inputFile') myInputVariable: ElementRef;


  constructor(
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<OvarioDiagnosisComponent>,
    private adminUsersService: AdminUsersService,
    private globalService: GlobalService,
    @Inject(MAT_DIALOG_DATA) public incomingdata: any
  ) {
    console.log(this.incomingdata.diagnosysMedicalProcedure)
  }

  filesToUpload: Array<File> = [];

  tnm =  this.incomingdata.diagnosys ? parseInt(this.incomingdata.diagnosys['50'], 0) : null;

  mainForm = new FormGroup({
    localizacion: new FormControl(
      this.incomingdata.diagnosys ? parseInt(this.incomingdata.diagnosys['58'], 0) : 1,
      [
        Validators.required,
      ],
    ),
    patologia: new FormControl(
      this.incomingdata.diagnosys ? parseInt(this.incomingdata.diagnosys['51'], 0) : 1,
      [
        Validators.required,
      ],
    ),
    afp: new FormControl(
      this.incomingdata.diagnosys ? parseInt(this.incomingdata.diagnosys['52'], 0) : 1,
      [
        Validators.max(100),
        Validators.required,
        Validators.min(0)
      ],
    ),

    bhcg: new FormControl(
      this.incomingdata.diagnosys ? parseInt(this.incomingdata.diagnosys['53'], 0) : 1,
      [
        Validators.max(100),
        Validators.required,
        Validators.min(0)
      ],
    ),

    ca125: new FormControl(
      this.incomingdata.diagnosys ? parseInt(this.incomingdata.diagnosys['54'], 0) : 1,
      [
        Validators.max(100),
        Validators.required,
        Validators.min(0)
      ],
    ),

    ca199: new FormControl(
      this.incomingdata.diagnosys ? parseInt(this.incomingdata.diagnosys['55'], 0) : 1,
      [
        Validators.max(100),
        Validators.required,
        Validators.min(0)
      ],
    ),

    inmuno: new FormControl(
      this.incomingdata.diagnosys ? parseInt(this.incomingdata.diagnosys['56'], 0) : 1,
      [
        Validators.max(100),
        Validators.required,
        Validators.min(0)
      ],
    ),
    afpf: new FormControl(
      this.incomingdata.diagnosys ? new Date(this.incomingdata.diagnosys['59']) : 1,
      [
        Validators.required,
      ],
    ),

    bhcgf: new FormControl(
      this.incomingdata.diagnosys ? new Date(this.incomingdata.diagnosys['60']) : 1,
      [
        Validators.required,
      ],
    ),

    ca125f: new FormControl(
      this.incomingdata.diagnosys ? new Date(this.incomingdata.diagnosys['61']) : 1,
      [
        Validators.required,
      ],
    ),

    ca199f: new FormControl(
      this.incomingdata.diagnosys ? new Date(this.incomingdata.diagnosys['57']) : 1,
      [
        Validators.required,
      ],
    ),

  });

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

  getTnms() {
    this.adminUsersService.getTnms().subscribe(data => {
      this.tnms = data.filter(o => o.organId === 9);
    },
      error => {
        console.log(error)
        this._snackBar.open(error, 'Aceptar', {
          duration: 3000,
          panelClass: 'snackbarError'
        });
      });
  }

  getPatologies() {
    this.globalService.getPatologies(this.incomingdata.organId).subscribe(data => {
      this.patologies = data;
    },
      error => {
        console.log(error)
        this._snackBar.open(error, 'Aceptar', {
          duration: 3000,
          panelClass: 'snackbarError'
        });
      });
  }

  savediagnosys() {
    let send = {
      data: {
        50: this.tnm, 
        58: this.mainForm.controls.localizacion.value,
        51: this.mainForm.controls.patologia.value,
        52: this.mainForm.controls.afp.value,
        53: this.mainForm.controls.bhcg.value,
        54: this.mainForm.controls.ca125.value,
        55: this.mainForm.controls.ca199.value,

        56: this.mainForm.controls.inmuno.value,
        59: moment(this.mainForm.controls.afpf.value),
        60: moment(this.mainForm.controls.bhcgf.value),
        61: moment(this.mainForm.controls.ca125f.value),
        57: moment(this.mainForm.controls.ca199f.value),
      },
      procedure: this.incomingdata.id
    };

    this.adminUsersService.savediagnosys(send).subscribe(data => {

      this.dialogRef.close();
      this._snackBar.open('Diagnostico realizado. Ahora este proceso puede iniciar un tratamiento.', 'Aceptar', {
        duration: 3000,
        panelClass: 'snackbarSuccess'
      });
    },
      error => {
        console.log(error)
        this._snackBar.open(error, 'Aceptar', {
          duration: 3000,
          panelClass: 'snackbarError'
        });
      }); 

    console.log(send);
  }

  ngOnInit() {
    this.getTnms();
    this.getPatologies();
  }
}
