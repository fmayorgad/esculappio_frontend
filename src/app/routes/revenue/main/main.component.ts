import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RevenueService } from '../../../services';
import { RevenueDialogsCreateComponent } from '../dialogs/create/create.component';
import {RevenueDialogsEditComponent} from '../dialogs/edit/edit.component';

@Component({
  selector: 'app-vouchers-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class RevenueMainComponent implements OnInit {
  title = 'Fuentes de financiación';
  icon = 'assessment';
  color = '#20b9e5';
  subtitle = 'Fuentes de financiación creadas en la plataforma';

  dataSource = new MatTableDataSource<Revenue>([]);
  states;
  noData = false;
  isLoading = true;
  nodataheight = '100px';
  nodatamessage = 'No hay datos para mostrar';
  classifications;

  constructor(
    public dialog: MatDialog,
    public revenueService: RevenueService,
    private _snackBar: MatSnackBar,
  ) {
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  mainTablePaginationOptions: number[];

  displayedColumns: string[];


  ngOnInit(): void {
    this.displayedColumns = ['description', 'clasification', 'code', 'state', 'actions'];
    this.mainTablePaginationOptions = [5, 15, 50];
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAll();
    this.states = {
      1: { id: 1, name: 'Activo' },
      0: { id: 0, name: 'Inactivo' }
    };

    this.classifications = {
      1: {
        id: 1,
        name: 'Detalle'
      },
      2:{
        id:2,
        name: 'Titulo'
      } 
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAll() {
    this.revenueService
      .getAllRevenues()
      .subscribe(
        data => {
          this.dataSource = new MatTableDataSource<Revenue>(data);
          this.mainTablePaginationOptions = [5, 15, 50];
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          this.isLoading = false;
          if (data.length == 0) { this.noData = true }
        },
        error => {
          console.error(error);
        }
      );
  }

  edit(element){
    console.log(element)
    const dialogRef = this.dialog.open(RevenueDialogsEditComponent, { data: element, disableClose: true });
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

  createRevenue() {
    const dialogRef = this.dialog.open(RevenueDialogsCreateComponent, { disableClose: true });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._snackBar.open('Registro creado satisfactoriamente.', 'Aceptar', {
          duration: 3000,
        });
        this.getAll();
      }
    });
  }

}

interface Revenue {
  id: number;
  description: string;
  classification: string;
  code: string;
  state: number
}


