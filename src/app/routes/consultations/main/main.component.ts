import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminUsersService } from '@services';
import { trigger, style, animate, transition } from '@angular/animations';

// dialogs

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
export class ConsultationsMainComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private adminUsersService: AdminUsersService,
  ) {
  }

  windowwith = window.innerWidth;
  colsnumber = 6;

  title = 'Consultas ESCULAPPIO';
  icon = 'question_answer';
  color = '#118f5b';
  subtitle = 'Listados de consultas.';

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



  changeEntityState(index, state, entityId) {
    console.log(index)
    console.log(state)
    console.log(entityId)

  }

  create() {
    /* const dialogRef = this.dialog.open(UserPacientCreateComponent, { disableClose: true, data: this.activatedRoute.params["_value"] });

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
    }); */
  }

  createProcedure(user) {
 
  }

  documents(user) {
  
  }


  diagnosis(procedure) {
    console.log(procedure)

/*     if (procedure.organId === 1) {
      const dialogRef = this.dialog.open(MamaDiagnosisComponent, { disableClose: true, data: procedure });
      dialogRef.afterClosed().subscribe(result => {
        this.getAll();
      });
    }
 */
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

    this.displayedColumnsDiagnosis = ['name', 'number', 'organ', 'actions'];
    this.mainTablePaginationOptionsDiagnosis = [7, 15, 50];
    this.dataSourceDiagnosis.paginator = this.paginatorDiagnosis;
    this.dataSourceDiagnosis.sort = this.sortDiagnosis;


  }

}
