import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, ViewChild, Inject} from '@angular/core';
import { environmentvariables } from '../../../../../../assets/data/environmentvariables';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { GlobalService } from '../../../../../services';
import { AdminDocumentTypesService } from '../../../../../services/documentTypes/admin/documentTypes';
import { MatSnackBar } from '@angular/material/snack-bar';
import { timeout } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'edittype',
  templateUrl: 'edit.html',
})

export class EditAdminDocumentTypeDialogComponent implements OnInit {

  constructor(
    private _snackBar: MatSnackBar,
    private globalService: GlobalService,
    private adminDocumentTypesService: AdminDocumentTypesService,
    public dialogRef: MatDialogRef<EditAdminDocumentTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public incomingdata: any
  ) { }

  title = 'Editando';
  icon = 'folder';
  color = color;
  subtitle = this.incomingdata.description;

  formGroup = new FormGroup({
    code: new FormControl(this.incomingdata.code, [Validators.maxLength(3), Validators.required, Validators.minLength(3)]),
    description: new FormControl(this.incomingdata.description, [Validators.minLength(4), Validators.required, Validators.maxLength(30)]),
    natureDocumentId: new FormControl(this.incomingdata.natureDocumentId, [Validators.required])
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

  edit() {
    const obj = {
      code: this.formGroup.value.code,
      description: this.formGroup.value.description,
      natureDocumentId: this.formGroup.value.natureDocumentId
    };

    this.adminDocumentTypesService.edit(obj, this.incomingdata.id).subscribe(
      data => {
        this.dialogRef.close({ state: 1, message: 'Tipo de documento editado satisfactoriamente.' });
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
