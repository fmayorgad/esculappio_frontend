
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BudgetAccountsService } from '../../../../services';
import { MatDialog } from '@angular/material/dialog';
import { BudgetAccountsDialogsCreateComponent } from '../dialogs/create/create.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import {BudgetAccountsDialogsEditComponent} from '../dialogs/edit/edit.component';
@Component({
  selector: 'app-pucaccounts.module-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class BudgedAccountsModuleMainComponent implements OnInit {
  constructor(
    private budgetAccountsService: BudgetAccountsService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) { }
  // bodycardtitled variables
  title = 'Cuentas: Cuentas Presupuestales';
  icon = 'account_balance';
  color = '#d20e00';
  subtitle = 'Listado de Cuentas Presupuestales disponibles en la plataforma.';

  mainTablePaginationOptions = [10, 15, 50];

  noData = false;
  isLoading = true;
  nodataheight = '100px';
  nodatamessage = 'No hay datos para mostrar';

  displayedColumns: string[] = ['code', 'description', 'acciones'];
  dataSource = new MatTableDataSource<puc>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  create() {
    const dialogRef = this.dialog.open(BudgetAccountsDialogsCreateComponent, { disableClose: true });
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

  edit(element) {
    const dialogRef = this.dialog.open(BudgetAccountsDialogsEditComponent, { disableClose: true, data: element });
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

  getAll() {
    this.budgetAccountsService.getAll().subscribe(data => {
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
      if (data.length === 0) {
        this.noData = true;
      } else {
        this.noData = false;
      }
    });
  }

  ngOnInit() {
    this.getAll();
  }

}

export interface puc {
  number: string;
  name: string;
}
