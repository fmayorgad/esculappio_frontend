import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminUsersService } from '@services';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { saveAs as importedSaveAs } from "file-saver";



@Component({
  selector: 'user-estomagodiagnostico-create',
  templateUrl: './estomago.component.html',
  styleUrls: ['./estomago.component.css'],
})

export class EstomagoDiagnosisComponent implements OnInit {

  title = this.incomingdata.patiente.name + ' ' + this.incomingdata.patiente.surname + ' ' + this.incomingdata.patiente.lastname;
  icon = 'how_to_reg';
  color = 'red';
  subtitle = 'Diagnostico para Estomago';

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

  tnms;

  @ViewChild('inputFile') myInputVariable: ElementRef;


  constructor(
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<EstomagoDiagnosisComponent>,
    private adminUsersService: AdminUsersService,
    @Inject(MAT_DIALOG_DATA) public incomingdata: any
  ) {
  }

  filesToUpload: Array<File> = [];

  tnm = this.incomingdata.diagnosys ? parseInt(this.incomingdata.diagnosys['18'], 0) : null;
  mainForm = new FormGroup({
    biopsia: new FormControl(
      this.incomingdata.diagnosys ? parseInt(this.incomingdata.diagnosys['20'], 0) : 1,
      [
        Validators.required,
      ],
    ),
    localizacion: new FormControl(
      this.incomingdata.diagnosys ? parseInt(this.incomingdata.diagnosys['17'], 0) : 1,
      [
        Validators.required,
      ],
    ),

    her: new FormControl(
      this.incomingdata.diagnosys ? parseInt(this.incomingdata.diagnosys['19'], 0) : 1,
      [
        Validators.required,
      ],
    ),
  });

  getTnms() {
    this.adminUsersService.getTnms().subscribe(data => {
      this.tnms = data.filter(o => o.organId === 2);
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
        18: this.tnm, //this.mainForm.controls.name.value
        20: this.mainForm.controls.biopsia.value,
        19: this.mainForm.controls.her.value,
        17: this.mainForm.controls.localizacion.value,
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
