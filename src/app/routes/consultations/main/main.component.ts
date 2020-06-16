import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminUsersService, } from '@services';
import { trigger, style, animate, transition } from '@angular/animations';

// dialogs
import { ResponseComponent } from '../dialogs/response/response.component';
import { ViewConsultationComponent } from '../dialogs/view/view.component';

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

  // tabla de pendientes documento
  dataSourcePendings = new MatTableDataSource<any>([]);
  @ViewChild('paginatorPendings') paginatorPendings: MatPaginator;
  @ViewChild('sortPendings') sortPendings: MatSort;
  @ViewChild('tablePendings') tablePendings: MatTable<any>;
  mainTablePaginationOptionsPendings: number[];
  displayedColumnsPendings: string[];
  noDataPendings = false;
  isLoadingPendings = true;


  // tabla de pendientes documento
  dataSourceClosed = new MatTableDataSource<any>([]);
  @ViewChild('paginatorClosed') paginatorClosed: MatPaginator;
  @ViewChild('sortClosed') sortClosed: MatSort;
  @ViewChild('tableClosed') tableClosed: MatTable<any>;
  mainTablePaginationOptionsClosed: number[];
  displayedColumnsClosed: string[];
  noDataClosed = false;
  isLoadingClosed = true;

  @HostListener('window:resize', ['$event']) onResize(event) {
    this.windowwith = event.target.innerWidth;
  }

  applyFilterPending(filterValue: string) {

    this.dataSourcePendings.filter = filterValue.trim().toLowerCase();
  }

  applyFilterHistoric(filterValue: string) {
    this.dataSourceClosed.filter = filterValue.trim().toLowerCase();
  }

  changeEntityState(index, state, entityId) {
    console.log(index)
    console.log(state)
    console.log(entityId)

  }

  reload(){
    this.getAll();
    this._snackBar.open('Listado de consultas actualizado', 'Aceptar', {
      duration: 3000,
    });
  }

  response(e) {
    console.log(e)
    const dialogRef = this.dialog.open(ResponseComponent, { disableClose: true, data: e });

    dialogRef.afterClosed().subscribe(result => {
      if (result.state === 1) {
        this.getAll();
        this._snackBar.open(result.message, 'Aceptar', {
          duration: 3000,
          panelClass: 'snackbarSuccess'
        });
      }
    });
  }

  view(e) {
    console.log(e)
    const dialogRef = this.dialog.open(ViewConsultationComponent, { disableClose: true, data: e });

    dialogRef.afterClosed().subscribe(result => {
      if (result.state === 1) {
        this.getAll();
        this._snackBar.open(result.message, 'Aceptar', {
          duration: 3000,
          panelClass: 'snackbarSuccess'
        });
      }
    });
  }

  createProcedure(user) {

  }

  Pendings(user) {

  }


  Closed(procedure) {
    console.log(procedure)

    /*     if (procedure.organId === 1) {
          const dialogRef = this.dialog.open(MamaClosedComponent, { disableClose: true, data: procedure });
          dialogRef.afterClosed().subscribe(result => {
            this.getAll();
          });
        }
     */
  }

  getAll() {
    this.adminUsersService.getConsultations().subscribe(
      data => {
        console.log(data);

        data = data.map(p => {
          const tmp = p;
          tmp.name = p.medicalProcedure.patiente.name + p.medicalProcedure.patiente.lastname + p.medicalProcedure.patiente.surname;
          tmp.ident = p.medicalProcedure.patiente.identificationValue;
          tmp.organname = p.medicalProcedure.organ.name;
          return tmp;
        })

        // se filtran los tipos de archivo biopsia e imagenes: si existe por lo menos uno de cada uno, ya esta listo para diagnostico.
        let pendingFiles = data.filter(p => {
          return p.stateId === 0;
        })

        let pendingClosed = data.filter(p => {
          return p.stateId === 1;
        })

        this.dataSourcePendings = new MatTableDataSource<any>(pendingFiles);
        this.dataSourcePendings.paginator = this.paginatorPendings;
        this.dataSourcePendings.sort = this.sortPendings;
        this.isLoadingPendings = false;
        if (data.length === 0) {
          this.noDataPendings = true;
        } else {
          this.noDataPendings = false;
        }


        this.dataSourceClosed = new MatTableDataSource<any>(pendingClosed);
        this.dataSourceClosed.paginator = this.paginatorClosed;
        this.dataSourceClosed.sort = this.sortClosed;
        this.isLoadingClosed = false;
        if (data.length === 0) {
          this.noDataClosed = true;
        } else {
          this.noDataClosed = false;
        }


      },
      error => {
      });
  }

  ngOnInit() {

    this.getAll();

    this.displayedColumnsPendings = ['name', 'number', 'organ', 'title', 'actions'];
    this.mainTablePaginationOptionsPendings = [7, 15, 50];
    this.dataSourcePendings.paginator = this.paginatorPendings;
    this.dataSourcePendings.sort = this.sortPendings;

    this.displayedColumnsClosed = ['name', 'number', 'organ', 'title', 'actions'];
    this.mainTablePaginationOptionsClosed = [7, 15, 50];
    this.dataSourceClosed.paginator = this.paginatorClosed;
    this.dataSourceClosed.sort = this.sortClosed;


  }

}
