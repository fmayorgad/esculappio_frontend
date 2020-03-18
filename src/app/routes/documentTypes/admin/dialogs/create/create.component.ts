import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { environmentvariables } from '../../../../../../assets/data/environmentvariables';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { GlobalService } from '../../../../../services';
import { AdminDocumentTypesService } from '../../../../../services/documentTypes/admin/documentTypes';
import { MatSnackBar } from '@angular/material/snack-bar';
import { timeout } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'createtype',
  templateUrl: 'create.html',
})

export class CreateAdminDocumentTypeDialogComponent implements OnInit {

  constructor(
    private _snackBar: MatSnackBar,
    private globalService: GlobalService,
    private adminDocumentTypesService: AdminDocumentTypesService,
    public dialogRef: MatDialogRef<CreateAdminDocumentTypeDialogComponent>,
  ) { }

  title = 'Crear';
  icon = 'add';
  color = color;
  subtitle = 'Crear Tipo de Documento en la plataforma';

  createFormGroup = new FormGroup({
    code: new FormControl('', [Validators.maxLength(3), Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.minLength(4), Validators.required, Validators.maxLength(30)]),
    natureDocumentId: new FormControl('', [Validators.required])
  });

  natures;

  getAll() {
    this.globalService.getDocumentNature().subscribe(
      data => {
        console.log(data);
        this.natures = data;
      },
      error => {
        console.log(error);
      });
  }

  create() {
    const obj = {
      code: this.createFormGroup.value.code,
      description: this.createFormGroup.value.description,
      natureDocumentId: this.createFormGroup.value.natureDocumentId
    };

    this.adminDocumentTypesService.create(obj).subscribe(
      data => {
        this.dialogRef.close({ state: 1, message: 'Tipo de documento creado satisfactoriamente.' });
      },
      error => {
        console.log(error);
        this.dialogRef.close({
          state: 0,
          message: 'Error al ejecutar la acción. Intentalo de neuvo más tarde.'
        });
      });
  }

  ngOnInit() {
    this.getAll();
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

const color = environmentvariables.colors.success;
