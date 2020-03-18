import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material';

import { SchoolService } from '../../../../services';
import { ChangeDialogsComponent } from '../dialogs/change/change.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateDialogComponent } from '../dialogs/create/create.component';


@Component({
  selector: 'app-requests-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class ActorsMainComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private schoolService: SchoolService,
    private _snackBar: MatSnackBar,
  ) {
  }

  title = 'Actores del sistema';
  icon = 'supervised_user_circle';
  color = '#f93853';
  subtitle = 'Revisores, Aprobadores y demás usuarios.';

  noData = false;
  isLoading = true;
  nodataheight = '100px';
  nodatamessage = 'No hay datos para mostrar';

  noData2 = false;
  isLoading2 = true;
  nodataheight2 = '100px';
  nodatamessage2 = 'No hay datos para mostrar';

  states = {
    0: 'Inactivo',
    1: 'Activo'
  };

  mainTablePaginationOptions: number[] = [5, 10, 15, 50];
  displayedColumns = ['name', 'charge', 'state', 'actions'];
  displayedColumns2 = ['name', 'charge', 'state', 'actions'];

  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;

  dataSource2 = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator, { static: false }) paginator2: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort2: MatSort;
  @ViewChild(MatTable, { static: false }) table2: MatTable<any>;

  applyFilter(targetTable, filterValue: string) {
    this[targetTable].filter = filterValue.trim().toLowerCase();
  }

  getAll() {
    this.schoolService.getAproversReviewers()
      .subscribe(ar => {

        this.dataSource = new MatTableDataSource<any>(ar.filter(a => a.actionId === 1));
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;

        this.dataSource2 = new MatTableDataSource<any>(ar.filter(a => a.actionId === 2));
        this.dataSource2.paginator = this.paginator2;
        this.dataSource2.sort = this.sort2;
        this.isLoading2 = false;

        if (ar.filter(a => a.actionId === 1).length === 0) {
          this.noData = true;
          this.noData2 = true;
        } else {
          this.noData = false;
          this.noData2 = false;
        }

        if (ar.filter(a => a.actionId === 2).length === 0) {
          this.noData2 = true;
        } else {
          this.noData2 = false;
        }


      });
  }

  change(month) {
    const dialogRef = this.dialog.open(ChangeDialogsComponent, { disableClose: true, data: month });
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

  create() {
    const dialogRef = this.dialog.open(CreateDialogComponent, { disableClose: true });
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
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}


