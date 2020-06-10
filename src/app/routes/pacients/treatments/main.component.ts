import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

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
import { AdminUsersService, AuthenticationService } from '@services';
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

// treatment
import { MamaTreatmentComponent } from '../treatments/dialogs/mama/mama.component';
import { EstomagoTreatmentComponent } from '../treatments/dialogs/estomago/estomago.component';
import { ColonTreatmentComponent } from '../treatments/dialogs/colon/colon.component';
import { PielTreatmentComponent } from '../treatments/dialogs/piel/piel.component';
import { TiroideTreatmentComponent } from '../treatments/dialogs/tiroides/tiroide.component';
import { SarcomaTreatmentComponent } from '../treatments/dialogs/sarcoma/sarcoma.component';
import { EsofagoTreatmentComponent } from '../treatments/dialogs/esofago/esofago.component';
import { MelanomaTreatmentComponent } from '../treatments/dialogs/melanoma/melanoma.component';

// paleativos

import { PaleativesTreatmentComponent } from '../treatments/dialogs/paleatives/paleative.component';

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
export class TreatmentsMainComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private adminUsersService: AdminUsersService,
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {
  }
  data;

  windowwith = window.innerWidth;
  colsnumber = 6;

  title = 'Paciente: ';
  icon = 'face';
  color = '#113b8f';
  subtitle = 'Listados de procedimientos de este paciente.';

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



  @HostListener('window:resize', ['$event']) onResize(event) {
    this.windowwith = event.target.innerWidth;
  }

  applyFilter(filterValue: string) {
    this.dataSourcePacients.filter = filterValue.trim().toLowerCase();
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

      });
    }

    if (procedure.organId === 2) {
      const dialogRef = this.dialog.open(EstomagoDiagnosisComponent, { disableClose: true, data: procedure });
      dialogRef.afterClosed().subscribe(result => {

      });
    }

    if (procedure.organId === 3) {
      const dialogRef = this.dialog.open(ColonDiagnosisComponent, { disableClose: true, data: procedure });
      dialogRef.afterClosed().subscribe(result => {

      });
    }

    if (procedure.organId === 4) {
      const dialogRef = this.dialog.open(PielDiagnosisComponent, { disableClose: true, data: procedure });
      dialogRef.afterClosed().subscribe(result => {

      });
    }

    if (procedure.organId === 5) {
      const dialogRef = this.dialog.open(TiroidesDiagnosisComponent, { disableClose: true, data: procedure });
      dialogRef.afterClosed().subscribe(result => {

      });
    }

    if (procedure.organId === 6) {
      const dialogRef = this.dialog.open(SarcomaDiagnosisComponent, { disableClose: true, data: procedure });
      dialogRef.afterClosed().subscribe(result => {

      });
    }

    if (procedure.organId === 7) {
      const dialogRef = this.dialog.open(EsofagoDiagnosisComponent, { disableClose: true, data: procedure });
      dialogRef.afterClosed().subscribe(result => {

      });
    }

    if (procedure.organId === 8) {
      const dialogRef = this.dialog.open(MelanomaDiagnosisComponent, { disableClose: true, data: procedure });
      dialogRef.afterClosed().subscribe(result => {

      });
    }

  }


  treatment(procedure) {

    if (procedure.organId === 1) {
      const dialogRef = this.dialog.open(MamaTreatmentComponent, { disableClose: true, data: procedure });
      dialogRef.afterClosed().subscribe(result => {

      });
    }

    if (procedure.organId === 2) {
      const dialogRef = this.dialog.open(EstomagoTreatmentComponent, { disableClose: true, data: procedure });
      dialogRef.afterClosed().subscribe(result => {

      });
    }

    if (procedure.organId === 3) {
      const dialogRef = this.dialog.open(ColonTreatmentComponent, { disableClose: true, data: procedure });
      dialogRef.afterClosed().subscribe(result => {

      });
    }

    if (procedure.organId === 4) {
      const dialogRef = this.dialog.open(PielTreatmentComponent, { disableClose: true, data: procedure });
      dialogRef.afterClosed().subscribe(result => {

      });
    }

    if (procedure.organId === 5) {
      const dialogRef = this.dialog.open(TiroideTreatmentComponent, { disableClose: true, data: procedure });
      dialogRef.afterClosed().subscribe(result => {

      });
    }

    if (procedure.organId === 6) {
      const dialogRef = this.dialog.open(SarcomaTreatmentComponent, { disableClose: true, data: procedure });
      dialogRef.afterClosed().subscribe(result => {

      });
    }

    if (procedure.organId === 7) {
      const dialogRef = this.dialog.open(EsofagoTreatmentComponent, { disableClose: true, data: procedure });
      dialogRef.afterClosed().subscribe(result => {

      });
    }

    if (procedure.organId === 8) {
      const dialogRef = this.dialog.open(MelanomaTreatmentComponent, { disableClose: true, data: procedure });
      dialogRef.afterClosed().subscribe(result => {
      });
    }

  }

  openPaleatives(e) {

    const dialogRef = this.dialog.open(PaleativesTreatmentComponent, { disableClose: true, data: e });
    dialogRef.afterClosed().subscribe(result => {


      this.http
        .get(`${environment.apiUrl}/${environment.apiBaseMain.main}/${environment.versions.v1}/users/getById/${this.activatedRoute.data['_value'].item.user.id}`)
        .toPromise().then(data => {
          console.log(data)
          if (data.hasOwnProperty('user')) {
            this.data = data['user'].medicalProcedures.filter(p => p.state === 3).map(p => {
              let tmp = p;
              tmp.patiente = this.activatedRoute.data['_value'].item.user;
              return tmp;
            });
            this.dataSourcePacients = new MatTableDataSource<any>(this.data);
            this.mainTablePaginationOptionsPacients = [7, 15, 50];
            this.dataSourcePacients.paginator = this.paginatorPacients;
            this.dataSourcePacients.sort = this.sortPacients;
          }
        });

    });
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

      },
      error => {
      });
  }

  ngOnInit() {

    // this.getAll();

    this.data = this.activatedRoute.data['_value'].item.user.medicalProcedures.filter(p => p.state === 3).map(p => {
      let tmp = p;
      tmp.patiente = this.activatedRoute.data['_value'].item.user;
      return tmp;
    });

    this.displayedColumnsPacients = ['organ', 'idx', 'symptoms', 'actions'];
    this.dataSourcePacients = new MatTableDataSource<any>(this.data);
    this.mainTablePaginationOptionsPacients = [7, 15, 50];
    this.dataSourcePacients.paginator = this.paginatorPacients;
    this.dataSourcePacients.sort = this.sortPacients;

    this.isLoadingPacients = false;
    if (this.data.length === 0) {
      this.noDataPacients = true;
    } else {
      this.noDataPacients = false;
    }

    console.log(this.data);

    this.title = this.title + ' ' + this.activatedRoute.data['_value'].item.user.name + ' ' + this.activatedRoute.data['_value'].item.user.surname + ' ' + this.activatedRoute.data['_value'].item.user.lastname

  }

}
