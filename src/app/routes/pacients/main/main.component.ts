import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserPacientCreateComponent } from '../dialogs/create/create.component';
import {ProcedureCreateComponent} from '../dialogs/procedure/procedure.component';
import { DocumentCreateComponent } from '../dialogs/documents/documents.component';
import { AdminUsersService } from '@services';
import { trigger, style, animate, transition } from '@angular/animations';

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
  // tabla de pacientes
  dataSourceDocuments = new MatTableDataSource<any>([]);
  @ViewChild('paginatorDocuments') paginatorDocuments: MatPaginator;
  @ViewChild('sortDocuments') sortDocuments: MatSort;
  @ViewChild('tableDocuments') tableDocuments: MatTable<any>;
  mainTablePaginationOptionsDocuments: number[];
  displayedColumnsDocuments: string[];
  noDataDocuments = false;
  isLoadingDocuments = true;


  @HostListener('window:resize', ['$event']) onResize(event) {
    this.windowwith = event.target.innerWidth;
  }

  applyFilter(filterValue: string) {
    this.dataSourcePacients.filter = filterValue.trim().toLowerCase();
  }


  // editState( id, state) {
  //   console.log(this.activatedRoute.params["_value"])
  //   this.questionsService.editOrgan({ state }, id).subscribe(
  //     response => {
  //       this._snackBar.open('Estado modificado satisfactoriamente', 'Aceptar', {
  //         duration: 3000,
  //         panelClass: 'snackbarSuccess'
  //       });
  //     },
  //     error => {
  //       this._snackBar.open('Error al editar el estado. Intentalo de nuevo más tarde', 'Aceptar', {
  //         duration: 3000,
  //         panelClass: 'snackbarError'
  //       });
  //     },
  //   );
  // }

  changeEntityState(index, state, entityId) {
    console.log(index)
    console.log(state)
    console.log(entityId)

    // this.configService.setEntityState((state) ? 1 : 0, entityId).subscribe(
    //   data => {
    //     this._snackBar.open('Estado editado satisfactoriamente.', 'Aceptar', {
    //       duration: 3000,
    //     });
    //   },
    //   error => {

    //     this.dataSourceAuditoria.filteredData[index].state = !state;
    //     this._snackBar.open('No se pudo realizar la acción. Intentalo de nuevo más tarde.', 'Aceptar', {
    //       duration: 3000,
    //     });
    //   });
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
        this.dataSourceDocuments = new MatTableDataSource<any>(data);
        this.dataSourceDocuments.paginator = this.paginatorDocuments;
        this.dataSourceDocuments.sort = this.sortDocuments;
        this.isLoadingDocuments = false;
        if (data.length === 0) {
          this.noDataDocuments = true;
        } else {
          this.noDataDocuments = false;
        }
      },
      error => {
      });
  }

  ngOnInit() {

    this.getAll();
    this.displayedColumnsPacients = ['name', 'surname' , 'lastname', 'number' , 'cellphone' ,'actions'];
    this.mainTablePaginationOptionsPacients = [7, 15, 50];
    this.dataSourcePacients.paginator = this.paginatorPacients;
    this.dataSourcePacients.sort = this.sortPacients;

    this.displayedColumnsDocuments = ['name', 'number' , 'organ' , 'actions'];
    this.mainTablePaginationOptionsDocuments = [7, 15, 50];
    this.dataSourceDocuments.paginator = this.paginatorDocuments;
    this.dataSourceDocuments.sort = this.sortDocuments;

  }

}
