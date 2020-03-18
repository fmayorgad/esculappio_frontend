import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { environmentvariables } from '../../../../../../assets/data/environmentvariables';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { timeout } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminDocumentTypesService, CampusService, GlobalService, VoucherService, ClientDocumentTypesService } from '../../../../../services';

@Component({
  selector: 'edittype',
  templateUrl: 'edit.html',
})

export class EditClientDocumentTypeDialogComponent implements OnInit {

  constructor(
    private _snackBar: MatSnackBar,
    private globalService: GlobalService,
    private adminDocumentTypesService: AdminDocumentTypesService,
    private campusService: CampusService,
    public dialogRef: MatDialogRef<EditClientDocumentTypeDialogComponent>,
    public voucherService: VoucherService,
    public clientDocumentTypesService: ClientDocumentTypesService,
    @Inject(MAT_DIALOG_DATA) public incomingdata: any
  ) {
  }

  title = 'Editando';
  icon = 'folder';
  color = color;
  subtitle = `${this.incomingdata.typeAdministratorDocument.code} - ${this.incomingdata.typeAdministratorDocument.description}`;

  createFormGroup = new FormGroup({
    typeAdministratorDocumentId  : new FormControl( this.incomingdata.typeAdministratorDocumentId , [Validators.required]),
    treasuryCode: new FormControl( this.incomingdata.treasuryCode , [Validators.minLength(4), Validators.required, Validators.maxLength(4)]),
    utilityCenter: new FormControl( this.incomingdata.utilityCenter , [Validators.required]),
    voucherId: new FormControl(this.incomingdata.voucherId, [Validators.required]),
    chronologicalOrder : new FormControl(this.incomingdata.chronologicalOrder, []),
    showDate : new FormControl(this.incomingdata.showDate, [])
  });

  documentType;
  campus;
  natures = {};
  vouchers;

  getAllVouchers() {
    this.voucherService
      .getAllVouchers()
      .subscribe(
        vouchers => {
          this.vouchers = vouchers;
        },
        error => {
          console.error(error);
        }
      );
  }

  getAllDocumentTypes() {
    this.adminDocumentTypesService.getAll().subscribe(
      data => {
        console.log(this.natures);
        this.documentType = data;
        this.documentType.map(d => {
          const t = d;
          d.documentNatureName = this.natures[d.natureDocumentId].name;
        });
        console.log(this.documentType)
      },
      error => {
        console.log(error);
      });
  }

  getAllSubsidiaries() {
    this.campusService.getAll().subscribe(
      data => {
        console.log(data);
        this.campus = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  getAllNatures() {
     this.globalService.getDocumentNature().subscribe(
        data => {
          const tmp = data;
          for (const i of data) {
            this.natures[i.id] = i;
          }
          this.getAllDocumentTypes();
        },
        error => {
          console.log(error);
        });
  }

  edit() {
    console.log(this.createFormGroup);
    const obj = {
      typeAdministratorDocumentId  : this.createFormGroup.value.typeAdministratorDocumentId ,
      treasuryCode : this.createFormGroup.value.treasuryCode,
      utilityCenter : this.createFormGroup.value.utilityCenter,
      voucherId : this.createFormGroup.value.voucherId,
      chronologicalOrder : this.createFormGroup.value.chronologicalOrder === 1  || this.createFormGroup.value.chronologicalOrder === true ? 1 :  0,
      showDate : this.createFormGroup.value.showDate === 1 || this.createFormGroup.value.showDate === true ? 1 : 0
    };

    this.clientDocumentTypesService.edit(obj, this.incomingdata.id).subscribe(
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
     this.getAllNatures();
     this.getAllSubsidiaries();
     this.getAllVouchers();
     console.log(this.incomingdata)
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

const color = environmentvariables.colors.success;
