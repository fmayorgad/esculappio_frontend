import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from '@services';
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
  selector: 'user-pieldiagnosis-create',
  templateUrl: './piel.component.html',
  styleUrls: ['./piel.component.css'],
})

export class PielTreatmentComponent implements OnInit {

  title = this.incomingdata.patiente.name + ' ' + this.incomingdata.patiente.lastname + ' ' + this.incomingdata.patiente.surname;
  icon = 'how_to_reg';
  color = '#17a2b8';
  subtitle = 'Piel escamocelular: Tratamiento';
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

  quimos = [];

  tnms;

  @ViewChild('inputFile') myInputVariable: ElementRef;


  constructor(
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PielTreatmentComponent>,
    private globalService: GlobalService,
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

  drugs = [];

  ciclosForm = new FormGroup({
    ciclo: new FormControl(
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


  quimosForm = new FormGroup({
    schema: new FormControl(
      '',
      [
        Validators.required,
      ],
    ),
    drug_id: new FormControl(
      1,
      [
        Validators.required,
      ],
    ),
    dosis: new FormControl(
      1,
      [
        Validators.required,
        Validators.max(1000),
        Validators.min(0.1)
      ],
    ),

    value: new FormControl(
      1,
      [
        Validators.required,
        Validators.max(24),
        Validators.min(1)
      ],
    ),
  });

  quimoInnerForm = new FormGroup({
    ciclo: new FormControl(
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


  getSurgeries() {
    this.globalService.getSurgeriesById(this.incomingdata.organ.id).subscribe(data => {
      this.surgeries = data;
    },
      error => {
        console.log(error)
        this._snackBar.open(error, 'Aceptar', {
          duration: 3000,
          panelClass: 'snackbarError'
        });
      });
  }

  getSurgeriesMedicalProcedure() {
    this.globalService.getSurgeriesMedicalProcedureById(this.incomingdata.id).subscribe(data => {
      this.surgeriesCreated = data;
      console.log(this.surgeriesCreated)
    },
      error => {
        console.log(error)
        this._snackBar.open(error, 'Aceptar', {
          duration: 3000,
          panelClass: 'snackbarError'
        });
      });
  }

  getCiclesMedicalProcedure() {
    this.globalService.getCiclesMedicalProcedureById(this.incomingdata.id).subscribe(data => {
      this.ciclesCreated = data;
      console.log(this.ciclesCreated)
    },
      error => {
        console.log(error)
        this._snackBar.open(error, 'Aceptar', {
          duration: 3000,
          panelClass: 'snackbarError'
        });
      });
  }

  getDrugs() {
    this.globalService.getDrugs(this.incomingdata.organ.id).subscribe(data => {
      this.drugs = data;
      console.log(this.drugs)
    },
      error => {
        this._snackBar.open(error, 'Aceptar', {
          duration: 3000,
          panelClass: 'snackbarError'
        });
      });
  }

  getQuimos() {
    this.globalService.getQuimo(this.incomingdata.id).subscribe(data => {
      console.log(data)
      this.quimos = data;
      this.quimos = this.quimos.map(q => {
        let t = q
        t.form = {
          cicle: 2,
          date: new Date()
        };

        t.ciclesCreated = [
          { cicle: 1, date: '2020-04-18' },
          { cicle: 2, date: '2020-04-21' },
          { cicle: 3, date: '2020-04-22' },
          { cicle: 4, date: '2020-04-30' },
          { cicle: 5, date: '2020-05-08' },
          { cicle: 6, date: '2020-05-16' },
          { cicle: 7, date: '2020-05-18' }
        ];
        return t
      });
      console.log(this.quimos)
    },
      error => {
        this._snackBar.open(error, 'Aceptar', {
          duration: 3000,
          panelClass: 'snackbarError'
        });
      });
  }

  createCicleInner(q) {
    const tmp = {
      cicle: this.innerc,
      date: moment(this.innerd).format('YYYY-MM-DD'),
      quimoId: q.id
    };
    this.globalService.createCicleInner(tmp).subscribe(data => {
      console.log("vamos");
      this.getQuimos();
    },
      error => {
        this._snackBar.open(error, 'Aceptar', {
          duration: 3000,
          panelClass: 'snackbarError'
        });
      });

    this._snackBar.open('Ciclo agregado satisfactoriamente.', 'Aceptar', {
      duration: 3000,
      panelClass: 'snackbarSuccess'
    });
  }

  createSurgery() {
    let data = {
      surgeryId: this.mainForm.controls.surgery.value,
      medicalProcedureId: this.incomingdata.id,
      date: moment(this.mainForm.controls.date.value).format('YYYY-MM-DD')
    }

    this.globalService.createSurgery(data).subscribe(data => {
      this.mainForm.controls.surgery.reset();
      this.getSurgeriesMedicalProcedure();
      this._snackBar.open('Cirugía registrada satisfactoriamente.', 'Aceptar', {
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


  createQuimo() {
    let data = {
      drugId: this.quimosForm.controls.drug_id.value,
      value: this.quimosForm.controls.value.value,
      schema: this.quimosForm.controls.schema.value,
      dosis: this.quimosForm.controls.dosis.value,
      medicalProcedureId: this.incomingdata.id
    }

    this.globalService.createQuimo(data).subscribe(data => {
      this.quimosForm.controls.drug_id.reset();
      this.quimosForm.controls.value.reset();
      this.quimosForm.controls.schema.reset();
      this.quimosForm.controls.dosis.reset();
      this.getQuimos();
      this._snackBar.open('Quimio registrada satisfactoriamente.', 'Aceptar', {
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

  createCicle() {
    let data = {
      cicle: this.ciclosForm.controls.ciclo.value,
      medicalProcedureId: this.incomingdata.id,
      date: moment(this.ciclosForm.controls.date.value).format('YYYY-MM-DD')
    }

    this.globalService.createCicles(data).subscribe(data => {
      this.ciclosForm.controls.ciclo.reset();
      this.getCiclesMedicalProcedure();
      this._snackBar.open('Ciclo creado satisfactoriamente.', 'Aceptar', {
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

  ngOnInit() {
    console.log(this.incomingdata)
    this.getSurgeries();
    this.getQuimos();
    this.getDrugs();
    this.getSurgeriesMedicalProcedure();
    this.getCiclesMedicalProcedure();
  }
}
