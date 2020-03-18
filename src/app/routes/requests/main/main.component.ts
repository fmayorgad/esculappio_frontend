import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material';

import { SchoolService } from '../../../services';
import { AcceptDialogComponent } from '../dialogs/accept/accept.component';
import { RejectDialogComponent } from '../dialogs/reject/reject.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-requests-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class RequestsMainComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private schoolService: SchoolService,
    private _snackBar: MatSnackBar,
  ) {
  }

  title = 'Solicitudes de Modificación';
  icon = 'playlist_add_check';
  color = '#3f51b5';
  subtitle = 'Listado de Solicitudes de Modificación de las instituciones';

  noDataPending = false;
  isLoadingPending = true;
  nodataheightPending = '150px';
  nodatamessagePending = 'No hay datos para mostrar';

  noDataSolved = false;
  isLoadingSolved = true;
  nodataheightSolved = '150px';
  nodatamessageSolved = 'No hay datos para mostrar';

  states = {
    0: 'Inactivo',
    1: 'Activo'
  };

  mainTablePaginationOptions: number[] = [5, 10, 15, 50];
  displayedColumns = ['name', 'code', 'state', 'actions'];

  dataSourcePending = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator, { static: false }) paginatorPending: MatPaginator;
  @ViewChild(MatSort, { static: false }) sortPending: MatSort;
  @ViewChild(MatTable, { static: false }) tablePending: MatTable<any>;

  dataSourceSolved = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator, { static: false }) paginatorSolved: MatPaginator;
  @ViewChild(MatSort, { static: false }) sortSolved: MatSort;
  @ViewChild(MatTable, { static: false }) tableSolved: MatTable<any>;



  applyFilter(targetTable, filterValue: string) {
    this[targetTable].filter = filterValue.trim().toLowerCase();
  }


  getAll() {
    this.schoolService.getRequest()
      .subscribe(res => {
        console.log(res)
        let pending = [];
        let solved = [];
        pending = res.filter(r => r.requestStatusId === 3);
        solved = res.filter(r => r.requestStatusId === 1 || r.requestStatusId === 2);
        this.dataSourcePending = new MatTableDataSource<any>(pending);
        this.dataSourcePending.paginator = this.paginatorPending;
        this.dataSourcePending.sort = this.sortPending;
        this.tablePending.renderRows();
        this.isLoadingPending = false;
        if (pending.length === 0) {
          this.noDataPending = true;
        } else {
          this.noDataPending = false;
        }


        this.dataSourceSolved = new MatTableDataSource<any>(solved);
        this.dataSourceSolved.paginator = this.paginatorSolved;
        this.dataSourceSolved.sort = this.sortSolved;
        this.tableSolved.renderRows();
        this.isLoadingSolved = false;
        if (solved.length === 0) {
          this.noDataSolved = true;
        } else {
          this.noDataSolved = false;
        }


      });
  }

  accept(month) {
    const dialogRef = this.dialog.open(AcceptDialogComponent, { disableClose: true , data: month});
    dialogRef.afterClosed().subscribe(result => {
      if (result.state === 1) {
        this._snackBar.open(result.message, 'Aceptar', {
          duration: 3000,
        });
        this.getAll();
      }
      if (result.state === 0) {
        this._snackBar.open(result.message, 'Aceptar', {
          duration: 3000,
        });
      }
    });
  }

  reject(month) {
    const dialogRef = this.dialog.open(RejectDialogComponent, { disableClose: true , data: month});
    dialogRef.afterClosed().subscribe(result => {
      if (result.state === 1) {
        this._snackBar.open(result.message, 'Aceptar', {
          duration: 3000,
        });
        this.getAll();
      }
      if (result.state === 0) {
        this._snackBar.open(result.message, 'Aceptar', {
          duration: 3000,
        });
      }
    });
  }


  ngOnInit() {
    this.getAll();
    this.dataSourcePending.paginator = this.paginatorPending;
    this.dataSourcePending.sort = this.sortPending;

    this.dataSourceSolved.paginator = this.paginatorSolved;
    this.dataSourceSolved.sort = this.sortSolved;
  }
}


