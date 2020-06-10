import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalService, AdminUsersService } from '@services';
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
  selector: 'user-paleativediagnosis-create',
  templateUrl: './paleative.component.html',
  styleUrls: ['./paleative.component.css'],
})

export class PaleativesTreatmentComponent implements OnInit {

  title = this.incomingdata.patiente.name + ' ' + this.incomingdata.patiente.surname + ' ' + this.incomingdata.patiente.lastname;
  icon = 'how_to_reg';
  color = 'tomato';
  subtitle = 'Paleativos';
  mainAction = this.incomingdata.state === 3 ? false : true;

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

  paleatives = [];

  tnms;

  @ViewChild('inputFile') myInputVariable: ElementRef;


  constructor(
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PaleativesTreatmentComponent>,
    private globalService: GlobalService,
    private adminUsersService: AdminUsersService,
    @Inject(MAT_DIALOG_DATA) public incomingdata: any
  ) {
  }

  filesToUpload: Array<File> = [];
  surgeries;
  surgeriesCreated = [];
  ciclesCreated = [];
  ciclos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
  ciclos2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  schemas = [1, 2, 3, 4, 5];

  innerc = 1;
  innerd = new Date();

  started = 0;

  mainForm = new FormGroup({
    surgery: new FormControl(
      '',
      [
        Validators.required,
      ],
    ),
    date: new FormControl(
      new Date(),
      [
        Validators.required,
      ],
    ),
  });


  paleativeForm = new FormGroup({
    dateControl: new FormControl(
      new Date(),
      [
        Validators.required,
      ],
    ),
    date: new FormControl(
      new Date(),
      [
        Validators.required,
      ],
    ),
    dosis: new FormControl(
      '',
      [
        Validators.required,
        Validators.min(0.1),
        Validators.max(1000),
      ],
    ),

    dosisType: new FormControl(
      '',
      [
        Validators.required,
      ],
    ),

    drug: new FormControl(
      '',
      [
        Validators.required,
      ],
    ),

    presentation: new FormControl(
      '',
      [
        Validators.required,
      ],
    ),

    cd: new FormControl(
      '',
      [
        Validators.min(1),
        Validators.required,
        Validators.max(24)
      ],
    ),
  });


  startPaleative() {
    this.adminUsersService.ridx(this.incomingdata.id, { paleativesDate: moment(this.mainForm.controls.date.value).format('YYYY-MM-DD') }).subscribe(data => {
      this._snackBar.open('Paleativos iniciados', 'Aceptar', {
        duration: 3000,
        panelClass: 'snackbarSuccess'
      });
      this.dialogRef.close();
    },
      error => {
        this._snackBar.open(error, 'Aceptar', {
          duration: 3000,
          panelClass: 'snackbarError'
        });
      });
  }

  changedate(v) {
    this.started = v;
  }


  sendPaleative() {
    let data = {
      dateControl: moment(this.paleativeForm.controls.dateControl.value).format('YYYY-MM-DD'),
      medicalProcedureId: this.incomingdata.id,
      date: moment(this.paleativeForm.controls.date.value).format('YYYY-MM-DD'),
      dosis: this.paleativeForm.controls.dosis.value,
      dosisType: this.paleativeForm.controls.dosisType.value,
      drug: this.paleativeForm.controls.drug.value,
      presentation: this.paleativeForm.controls.presentation.value,
      cd: this.paleativeForm.controls.cd.value,
    };

    this.globalService.createPaleative(data).subscribe(data => {
      this.paleativeForm.controls.dosisType.reset();
      this.paleativeForm.controls.dosis.reset();
      this.paleativeForm.controls.drug.reset();
      this.getPaleative();
      this._snackBar.open('Paliativo agregado satisfactoriamente.', 'Aceptar', {
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
  }


  getPaleative() {
     this.globalService.getPaleatives(this.incomingdata.id).subscribe(data => {
      this.paleatives = data;
    },
      error => {
        this._snackBar.open(error, 'Aceptar', {
          duration: 3000,
          panelClass: 'snackbarError'
        });
      });
  }

  ngOnInit() {
    console.log(this.incomingdata)
    this.getPaleative();
  }
}
