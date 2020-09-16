import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserPacientCreateComponent } from '../dialogs/create/create.component';
import { ProcedureCreateComponent } from '../dialogs/procedure/procedure.component';
import { DocumentCreateComponent } from '../dialogs/documents/documents.component';
import { AdminUsersService } from '@services';
import { trigger, style, animate, transition } from '@angular/animations';


// diagnosis 
import { MamaDiagnosisComponent } from '../dialogs/diagnosis/mama/mama.component';
import { EstomagoDiagnosisComponent } from '../dialogs/diagnosis/estomago/estomago.component';
import { ColonDiagnosisComponent } from '../dialogs/diagnosis/colon/colon.component';
import { PielDiagnosisComponent } from '../dialogs/diagnosis/piel/piel.component';
import { TiroidesDiagnosisComponent } from '../dialogs/diagnosis/tiroides/tiroides.component';
import { SarcomaDiagnosisComponent } from '../dialogs/diagnosis/sarcoma/sarcoma.component';
import { EsofagoDiagnosisComponent } from '../dialogs/diagnosis/esofago/esofago.component';
import { MelanomaDiagnosisComponent } from '../dialogs/diagnosis/melanoma/melanoma.component';
import { IDXCreateComponent } from '../dialogs/idx/idx.component';
import { OvarioDiagnosisComponent } from '../dialogs/diagnosis/ovario/main.component';
import { ProstataDiagnosisComponent } from '../dialogs/diagnosis/prostata/main.component';
import { PulmonDiagnosisComponent } from '../dialogs/diagnosis/pulmon/main.component';
import { CervixDiagnosisComponent } from '../dialogs/diagnosis/cervix/main.component';
import { UteroDiagnosisComponent } from '../dialogs/diagnosis/utero/main.component';

import { RoleGuard } from '../../../helpers/role.guard';
@Component({
  selector: 'app-pacients-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(350, style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate(350, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class PacientsMainComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private adminUsersService: AdminUsersService,
    private roleGuard: RoleGuard
  ) {
  }

  windowwith = window.innerWidth;
  colsnumber = 6;

  title = 'Pacientes';
  icon = 'face';
  color = '#113b8f';
  subtitle = 'Listados de pacientes inscritos en la plataforma.';

  titleProcedures = 'Historias clinicas pendientes';
  iconProcedures = 'supervised_user_circle';
  colorProcedures = '#ff3637';
  subtitleProcedures = 'Listados de historias clinicas pendientes de documento y de diagnostico';

  profiles;

  nodataheight = '100px';
  nodatamessage = 'No hay datos para mostrar';

  states = {
    0: 'Inactivo',
    1: 'Activo'
  };


  // tabla de pacientes
  dataSourcePacients = new MatTableDataSource<any>([]);
  @ViewChild('paginatorPacients') paginatorPacients: MatPaginator;
  @ViewChild('sortPacients') sortPacients: MatSort;
  @ViewChild('tablePacients') tablePacients: MatTable<any>;
  mainTablePaginationOptionsPacients: number[];
  displayedColumnsPacients: string[];
  noDataPacients = false;
  isLoadingPacients = true;


  //tabla de pendientes documento
  dataSourceDocuments = new MatTableDataSource<any>([]);
  @ViewChild('paginatorDocuments') paginatorDocuments: MatPaginator;
  @ViewChild('sortDocuments') sortDocuments: MatSort;
  @ViewChild('tableDocuments') tableDocuments: MatTable<any>;
  mainTablePaginationOptionsDocuments: number[];
  displayedColumnsDocuments: string[];
  noDataDocuments = false;
  isLoadingDocuments = true;


  //tabla de pendientes documento
  dataSourceDiagnosis = new MatTableDataSource<any>([]);
  @ViewChild('paginatorDiagnosis') paginatorDiagnosis: MatPaginator;
  @ViewChild('sortDiagnosis') sortDiagnosis: MatSort;
  @ViewChild('tableDiagnosis') tableDiagnosis: MatTable<any>;
  mainTablePaginationOptionsDiagnosis: number[];
  displayedColumnsDiagnosis: string[];
  noDataDiagnosis = false;
  isLoadingDiagnosis = true;

  @HostListener('window:resize', ['$event']) onResize(event) {
    this.windowwith = event.target.innerWidth;
  }

  applyFilter(filterValue: string) {
    this.dataSourcePacients.filter = filterValue.trim().toLowerCase();
  }

  redirect(id) {
    this.router.navigate([`pacientes/${id}/tratamientos`]);
  }

  redirectpayments(id) {
    this.router.navigate([`pacientes/${id}/pagos`]);
  }


  changeEntityState(index, state, entityId) {
    console.log(index)
    console.log(state)
    console.log(entityId)

  }

  create() {
    const dialogRef = this.dialog.open(UserPacientCreateComponent, { disableClose: true, data: this.activatedRoute.params["_value"] });

    dialogRef.afterClosed().subscribe(result => {
      if (result.state === 1) {
        this.getAll();
        this._snackBar.open(result.message, 'Aceptar', {
          duration: 3000,
          panelClass: 'snackbarSuccess'
        });
      }
      if (result.state === 0) {
        this._snackBar.open(result.message, 'Aceptar', {
          duration: 3000,
        });
      }
    });
  }

  createProcedure(user) {
    const dialogRef = this.dialog.open(ProcedureCreateComponent, { disableClose: true, data: user });

    dialogRef.afterClosed().subscribe(result => {
      if (result.state === 1) {
        this.getAll();
        this._snackBar.open(result.message, 'Aceptar', {
          duration: 3000,
          panelClass: 'snackbarSuccess'
        });
      }
      if (result.state === 0) {
        this._snackBar.open(result.message, 'Aceptar', {
          duration: 3000,
        });
      }
    });
  }

  documents(user) {
    const dialogRef = this.dialog.open(DocumentCreateComponent, { disableClose: true, data: user });

    dialogRef.afterClosed().subscribe(result => {
      this.getAll();
    });
  }

  idx(procedure) {

    const dialogRef = this.dialog.open(IDXCreateComponent, { disableClose: true, data: procedure });
    dialogRef.afterClosed().subscribe(result => {
      this.getAll();
    });

  }


  diagnosis(procedure) {
    console.log(procedure)

    if (procedure.organId === 1) {
      const dialogRef = this.dialog.open(MamaDiagnosisComponent, { disableClose: true, data: procedure });
      dialogRef.afterClosed().subscribe(result => {
        this.getAll();
      });
    }

    if (procedure.organId === 2) {
      const dialogRef = this.dialog.open(EstomagoDiagnosisComponent, { disableClose: true, data: procedure });
      dialogRef.afterClosed().subscribe(result => {
        this.getAll();
      });
    }

    if (procedure.organId === 3) {
      const dialogRef = this.dialog.open(ColonDiagnosisComponent, { disableClose: true, data: procedure });
      dialogRef.afterClosed().subscribe(result => {
        this.getAll();
      });
    }

    if (procedure.organId === 4) {
      const dialogRef = this.dialog.open(PielDiagnosisComponent, { disableClose: true, data: procedure });
      dialogRef.afterClosed().subscribe(result => {
        this.getAll();
      });
    }

    if (procedure.organId === 5) {
      const dialogRef = this.dialog.open(TiroidesDiagnosisComponent, { disableClose: true, data: procedure });
      dialogRef.afterClosed().subscribe(result => {
        this.getAll();
      });
    }

    if (procedure.organId === 6) {
      const dialogRef = this.dialog.open(SarcomaDiagnosisComponent, { disableClose: true, data: procedure });
      dialogRef.afterClosed().subscribe(result => {
        this.getAll();
      });
    }

    if (procedure.organId === 7) {
      const dialogRef = this.dialog.open(EsofagoDiagnosisComponent, { disableClose: true, data: procedure });
      dialogRef.afterClosed().subscribe(result => {
        this.getAll();
      });
    }

    if (procedure.organId === 8) {
      const dialogRef = this.dialog.open(MelanomaDiagnosisComponent, { disableClose: true, data: procedure });
      dialogRef.afterClosed().subscribe(result => {
        this.getAll();
      });
    }

    if (procedure.organId === 9) {
      const dialogRef = this.dialog.open(OvarioDiagnosisComponent, { disableClose: true, data: procedure });
      dialogRef.afterClosed().subscribe(result => {
        this.getAll();
      });
    }

    if (procedure.organId === 10) {
      const dialogRef = this.dialog.open(ProstataDiagnosisComponent, { disableClose: true, data: procedure });
      dialogRef.afterClosed().subscribe(result => {
        this.getAll();
      });
    }

    if (procedure.organId === 11) {
      const dialogRef = this.dialog.open(PulmonDiagnosisComponent, { disableClose: true, data: procedure });
      dialogRef.afterClosed().subscribe(result => {
        this.getAll();
      });
    }

    if (procedure.organId === 12) {
      const dialogRef = this.dialog.open(CervixDiagnosisComponent, { disableClose: true, data: procedure });
      dialogRef.afterClosed().subscribe(result => {
        this.getAll();
      });
    }

    if (procedure.organId === 13) {
      const dialogRef = this.dialog.open(UteroDiagnosisComponent, { disableClose: true, data: procedure });
      dialogRef.afterClosed().subscribe(result => {
        this.getAll();
      });
    }

  }

  getAll() {
    this.adminUsersService.getPacients().subscribe(
      data => {
        console.log(data);
        this.dataSourcePacients = new MatTableDataSource<any>(data);
        this.dataSourcePacients.paginator = this.paginatorPacients;
        this.dataSourcePacients.sort = this.sortPacients;
        this.isLoadingPacients = false;
        if (data.length === 0) {
          this.noDataPacients = true;
        } else {
          this.noDataPacients = false;
        }
      },
      error => {
      });


    this.adminUsersService.getPendingMedicalProcedures().subscribe(
      data => {

        console.log(data);
        // se filtran los tipos de archivo biopsia e imagenes: si existe por lo menos uno de cada uno, ya esta listo para diagnostico.
        let pendingFiles = data.filter(p => {
          return p.state === 1;
        })

        let pendingDiagnosis = data.filter(p => {
          return p.state === 2;
        })

        this.dataSourceDocuments = new MatTableDataSource<any>(pendingFiles);
        this.dataSourceDocuments.paginator = this.paginatorDocuments;
        this.dataSourceDocuments.sort = this.sortDocuments;
        this.isLoadingDocuments = false;
        if (data.length === 0) {
          this.noDataDocuments = true;
        } else {
          this.noDataDocuments = false;
        }


        this.dataSourceDiagnosis = new MatTableDataSource<any>(pendingDiagnosis);
        this.dataSourceDiagnosis.paginator = this.paginatorDiagnosis;
        this.dataSourceDiagnosis.sort = this.sortDiagnosis;
        this.isLoadingDiagnosis = false;
        if (data.length === 0) {
          this.noDataDiagnosis = true;
        } else {
          this.noDataDiagnosis = false;
        }


      },
      error => {
      });
  }

  reload() {
    this.getAll();
    this._snackBar.open('Listado actualizado', 'Aceptar', {
      duration: 3000,
    });
  }

  canview(permission) {
    return this.roleGuard.canview('pacientes', permission);
  }

  ngOnInit() {

    this.getAll();
    this.displayedColumnsPacients = ['name', 'surname', 'lastname', 'number', 'cellphone', 'actions'];
    this.mainTablePaginationOptionsPacients = [7, 15, 50];
    this.dataSourcePacients.paginator = this.paginatorPacients;
    this.dataSourcePacients.sort = this.sortPacients;

    this.displayedColumnsDocuments = ['name', 'number', 'organ', 'actions'];
    this.mainTablePaginationOptionsDocuments = [7, 15, 50];
    this.dataSourceDocuments.paginator = this.paginatorDocuments;
    this.dataSourceDocuments.sort = this.sortDocuments;

    this.displayedColumnsDiagnosis = ['name', 'number', 'organ', 'idx', 'actions'];
    this.mainTablePaginationOptionsDiagnosis = [7, 15, 50];
    this.dataSourceDiagnosis.paginator = this.paginatorDiagnosis;
    this.dataSourceDiagnosis.sort = this.sortDiagnosis;


  }

}
