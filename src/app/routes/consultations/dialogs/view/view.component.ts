import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminUsersService } from '@services';
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
  selector: 'consultation-view-dialog',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})

export class ViewConsultationComponent implements OnInit {

  title = 'Visualizar Consulta';
  icon = 'visibility';
  color = '#1e88e5';
  subtitle = 'Visualizando consulta cerrada y sus respuestas';

  user = this.incomingdata.medicalProcedure.patiente.name + ' ' + this.incomingdata.medicalProcedure.patiente.lastname+ ' ' + this.incomingdata.medicalProcedure.patiente.surname;
  userfiles = {
  };
  fileToUpload: File = null;
  fileType = 'Biopsia';
  fileButton = true;

  id = this.incomingdata;

  @ViewChild('inputFile') myInputVariable: ElementRef;


  constructor(
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ViewConsultationComponent>,
    private adminUsersService: AdminUsersService,
    @Inject(MAT_DIALOG_DATA) public incomingdata: any
  ) {
    incomingdata.medicalProcedure.patiente.birthday = moment(incomingdata.medicalProcedure.patiente.birthday).format('YYYY-MM-DD');
    incomingdata.medicalProcedure.patiente.age = moment().diff(incomingdata.medicalProcedure.patiente.birthday, 'years');
    incomingdata.medicalProcedure.patiente.genderName = incomingdata.medicalProcedure.patiente.gender === 'F' ? 'Femenino' : 'Masculino';
    incomingdata.openingDate = moment(incomingdata.openingDate).format('YYYY-MM-DD');
    console.log(incomingdata)
  }

  filesToUpload: Array<File> = [];

  filescount = 0;
  fd = new FormData();
  filesuploaded = [];

  mainForm = new FormGroup({
    title: new FormControl(
      '',
      [
        Validators.maxLength(20),
        Validators.required,
        Validators.minLength(5),
      ],
    ),
    response: new FormControl(
      '',
      [
        Validators.maxLength(500),
        Validators.required,
        Validators.minLength(5),
      ],
    ),
  });

  close() {
    this.fd.delete('idConsultation');
    this.fd.delete('title');
    this.fd.delete('response');

    this.fd.append('idConsultation', this.incomingdata.id);
    this.fd.append('title', this.mainForm.controls.title.value);
    this.fd.append('response', this.mainForm.controls.response.value);

    this.adminUsersService.closeConsultation(this.fd).subscribe(data => {

      this.myInputVariable.nativeElement.value = '';
      this.fileButton = true;

      this.dialogRef.close({ state: 1, message: 'Usuario creado satisfactoriamente.' });

    },
      error => {
        console.log(error)
        this._snackBar.open(error, 'Aceptar', {
          duration: 3000,
          panelClass: 'snackbarError'
        });
      });
  }

  getFile(id, name) {
    this._snackBar.open('Descargando archivo...', 'Aceptar', {
      duration: 10000,
      panelClass: 'snackbarInfo'
    });

    this.adminUsersService.getConsultationsFiles(id).subscribe(blob => {
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


  getFileAnswer(id, name) {
    this._snackBar.open('Descargando archivo...', 'Aceptar', {
      duration: 10000,
      panelClass: 'snackbarInfo'
    });

    this.adminUsersService.getAnswerFiles(id).subscribe(blob => {
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


  deletefile(i, ind) {

    console.log(ind)

    let bu = this.fd.getAll('files[]');
    this.fd.delete('files[]');

    this.filesuploaded.splice(i, 1)

    bu.filter(i => {
        console.log(i)
        return i['name'] != ind
      })
      .forEach(name => {
        console.log(name)
        return this.fd.append('files[]', name)
      });

    console.log("................")
    console.log(this.fd.getAll('files[]'));
    this._snackBar.open('Archivo borrado del grupo.', 'Aceptar', {
      duration: 3000,
      panelClass: 'snackbarSuccess'
    });
  }



  uploadFile(e) {
    this.fileToUpload = e.target.files[0];
    this.fd.append('files[]', this.fileToUpload, "" + e.target.files[0].name);
    this.filesuploaded.push({ name: e.target.files[0].name, i: e.target.files[0].name });
    this.filescount++;
    this.myInputVariable.nativeElement.value = '';

    if (this.fileToUpload !== undefined) {
      this.fileButton = false;
    } else {
      this.fileButton = true;
    }

    console.log(this.fd)

  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  ngOnInit() {
  }
}
