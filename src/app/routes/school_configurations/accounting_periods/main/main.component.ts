import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material';

import { SchoolService } from '../../../../services';
import { CloseDialogsComponent } from '../dialogs/closeMonth/close.component';
import { RequestDialogComponent } from '../dialogs/request/request.component';
import { ShowRequestsDialogComponent } from '../dialogs/showrequest/showrequests.component'
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-requests-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class AccountingPeriodsMainComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private schoolService: SchoolService,
    private _snackBar: MatSnackBar,
  ) {
  }

  title = 'Periodos Contables';
  icon = 'date_range';
  color = '#3f51b5';
  subtitle = 'Periodos contables de la institución.';

  noData = false;
  isLoading = true;
  nodataheight = '100px';
  nodatamessage = 'No hay datos para mostrar';

  states = {
    0: 'Inactivo',
    1: 'Activo'
  };

  mainTablePaginationOptions: number[] = [5, 10, 15, 50];
  displayedColumns = ['init', 'end', 'closedBy', 'state', 'actions'];

  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;

  applyFilter(targetTable, filterValue: string) {
    this[targetTable].filter = filterValue.trim().toLowerCase();
  }

  getAll() {
    this.schoolService.getAccountingPeriods()
      .subscribe(months => {
        this.dataSource = new MatTableDataSource<any>(months);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;

        console.log(months)

        if (months.length === 0) {
          this.noData = true;
        } else {
          this.noData = false;
        }

      });
  }

  request(month) {
    const dialogRef = this.dialog.open(RequestDialogComponent, { disableClose: true, data: month });
    dialogRef.afterClosed().subscribe(result => {
      if (result.state === 1) {
        this._snackBar.open(result.message, 'Aceptar', {
          duration: 7000,
        });
        this.getAll();
      }
      if (result.state === 0) {
        this._snackBar.open(result.message, 'Aceptar', {
          duration: 7000,
        });
      }
    });
  }

  closeMonth(month) {
    const dialogRef = this.dialog.open(CloseDialogsComponent, { disableClose: true, data: month });
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

  requestHistory(month) {
    const dialogRef = this.dialog.open(ShowRequestsDialogComponent, { disableClose: true, data: month });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  ngOnInit() {
    this.getAll();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}


