import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminUsersService } from '@services';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { saveAs as importedSaveAs } from "file-saver";



@Component({
  selector: 'user-tiroidesdiagnostico-create',
  templateUrl: './tiroides.component.html',
  styleUrls: ['./tiroides.component.css'],
})

export class TiroidesDiagnosisComponent implements OnInit {

  title = this.incomingdata.patiente.name + ' ' + this.incomingdata.patiente.surname + ' ' + this.incomingdata.patiente.lastname;
  icon = 'how_to_reg';
  color = 'orange';
  subtitle = 'Diagnostico para Tiroides';

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
  mainAction = this.incomingdata.state === 3 ? false : true;
  tnms;
  tnms2;

  @ViewChild('inputFile') myInputVariable: ElementRef;


  constructor(
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<TiroidesDiagnosisComponent>,
    private adminUsersService: AdminUsersService,
    @Inject(MAT_DIALOG_DATA) public incomingdata: any
  ) {
  }

  filesToUpload: Array<File> = [];

  tnm =  this.incomingdata.diagnosys ? parseInt(this.incomingdata.diagnosys['30'], 0) : 1;
  tnm2 =  this.incomingdata.diagnosys ? parseInt(this.incomingdata.diagnosys['31'], 0) : 1;

  mainForm = new FormGroup({
    biopsia: new FormControl(
      this.incomingdata.diagnosys ? parseInt(this.incomingdata.diagnosys['34'], 0) : 1,
      [
        Validators.required,
      ],
    ),
    localizacion: new FormControl(
      this.incomingdata.diagnosys ? parseInt(this.incomingdata.diagnosys['32'], 0) : 1,
      [
        Validators.required,
      ],
    ),

    i: new FormControl(
      this.incomingdata.diagnosys ? parseInt(this.incomingdata.diagnosys['33'], 0) : 1,
      [
        Validators.required,
      ],
    ),
  });

  getTnms() {
    this.adminUsersService.getTnms().subscribe(data => {
      this.tnms = data.filter(o => o.organId === 5 && o.specification === 1);
      this.tnms2 = data.filter(o => o.organId === 5 && o.specification === 2);
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
        30: this.tnm, //this.mainForm.controls.name.value
        31: this.tnm2,
        34: this.mainForm.controls.biopsia.value,
        33: this.mainForm.controls.i.value,
        32: this.mainForm.controls.localizacion.value,
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
  }
}
