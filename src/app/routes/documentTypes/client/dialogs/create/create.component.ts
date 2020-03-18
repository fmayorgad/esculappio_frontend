import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { environmentvariables } from '../../../../../../assets/data/environmentvariables';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { timeout } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminDocumentTypesService, CampusService, GlobalService, VoucherService, ClientDocumentTypesService } from '../../../../../services';

@Component({
  selector: 'createtype',
  templateUrl: 'create.html',
})

export class CreateClientDocumentTypeDialogComponent implements OnInit {

  constructor(
    private _snackBar: MatSnackBar,
    private globalService: GlobalService,
    private adminDocumentTypesService: AdminDocumentTypesService,
    private campusService: CampusService,
    public dialogRef: MatDialogRef<CreateClientDocumentTypeDialogComponent>,
    public voucherService: VoucherService,
    public clientDocumentTypesService: ClientDocumentTypesService
  ) {
  }

  title = 'Crear';
  icon = 'add';
  color = color;
  subtitle = 'Crear Tipo de Documento en la institución';

  createFormGroup = new FormGroup({
    typeAdministratorDocumentId  : new FormControl('', [Validators.required]),
    treasuryCode: new FormControl('', [Validators.minLength(4), Validators.required, Validators.maxLength(4)]),
    utilityCenter: new FormControl('', [Validators.required]),
    voucherId: new FormControl('', [Validators.required]),
    chronologicalOrder : new FormControl('', []),
    showDate : new FormControl('', [])
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

  create() {
    const obj = {
      typeAdministratorDocumentId  : this.createFormGroup.value.typeAdministratorDocumentId ,
      treasuryCode : this.createFormGroup.value.treasuryCode,
      utilityCenter : this.createFormGroup.value.utilityCenter,
      voucherId : this.createFormGroup.value.voucherId,
      chronologicalOrder : this.createFormGroup.value.chronologicalOrder === true ? 1 :  0,
      showDate : this.createFormGroup.value.showDate === true ? 1 : 0
    };

    this.clientDocumentTypesService.create(obj).subscribe(
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
     this.getAllNatures();
     this.getAllSubsidiaries();
     this.getAllVouchers();
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

const color = environmentvariables.colors.success;
