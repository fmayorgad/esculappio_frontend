import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminUsersService } from '@services';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { saveAs as importedSaveAs } from "file-saver";



@Component({
  selector: 'user-esofagodiagnostico-create',
  templateUrl: './esofago.component.html',
  styleUrls: ['./esofago.component.css'],
})

export class EsofagoDiagnosisComponent implements OnInit {

  title = this.incomingdata.patiente.name + ' ' + this.incomingdata.patiente.surname + ' ' + this.incomingdata.patiente.lastname;
  icon = 'how_to_reg';
  color = 'grey';
  subtitle = 'Diagnostico para Esofago y Unión GE';

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
  tnms2;

  mainAction = this.incomingdata.state === 3 ? false : true;

  @ViewChild('inputFile') myInputVariable: ElementRef;


  constructor(
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<EsofagoDiagnosisComponent>,
    private adminUsersService: AdminUsersService,
    @Inject(MAT_DIALOG_DATA) public incomingdata: any
  ) {
  }

  filesToUpload: Array<File> = [];

  tnm =  this.incomingdata.diagnosys ? parseInt(this.incomingdata.diagnosys['39'], 0) : 1;

  mainForm = new FormGroup({
    biopsia: new FormControl(
      this.incomingdata.diagnosys ? parseInt(this.incomingdata.diagnosys['42'], 0) : 1,
      [
        Validators.required,
      ],
    ),
    localizacion: new FormControl(
      this.incomingdata.diagnosys ? parseInt(this.incomingdata.diagnosys['40'], 0) : 1,
      [
        Validators.required,
      ],
    ),

    i: new FormControl(
      this.incomingdata.diagnosys ? parseInt(this.incomingdata.diagnosys['41'], 0) : 1,
      [
        Validators.required,
      ],
    ),
  });


  savediagnosys() {
    let send = {
      data: {
        39: this.tnm, //this.mainForm.controls.name.value
        41: this.mainForm.controls.i.value,
        40: this.mainForm.controls.localizacion.value,
        42: this.mainForm.controls.biopsia.value,
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


  getTnms() {
    this.adminUsersService.getTnms().subscribe(data => {
      this.tnms = data.filter(o => o.organId === 7);
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
    this.getTnms();
  }
}
