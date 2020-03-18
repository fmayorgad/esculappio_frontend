import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material';
import { CreateAdminDocumentTypeDialogComponent } from '../dialogs/create/create.component';
import { EditAdminDocumentTypeDialogComponent } from '../dialogs/edit/edit.component';
import { AdminDocumentTypesService } from '../../../../services';
import { GlobalService } from '../../../../services';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'admin-document-types',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class AdminDocumentTypesMainComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private adminDocumentTypesService: AdminDocumentTypesService,
    private _snackBar: MatSnackBar,
    private globalService: GlobalService
    ) {
  }

  title = 'Tipos de Documento';
  icon = 'folder';
  color = '#b53f76';
  subtitle = 'Listado de los Tipos de Documento habilitados en la plataforma';

  noData = false;
  isLoading = true;
  nodataheight = '100px';
  nodatamessage = 'No hay datos para mostrar';

  natures = {};
  states = {
    0: 'Inactivo',
    1: 'Activo'
  };

  types = [];

  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;

  mainTablePaginationOptions: number[];

  displayedColumns: string[];

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  edit(element) {
    const dialogRef = this.dialog.open(EditAdminDocumentTypeDialogComponent, { disableClose: true, data: element });
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
    this.adminDocumentTypesService.getAll()
      .subscribe(data => {
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.table.renderRows();
        this.isLoading = false;
        if (data.length === 0) {
          this.noData = true;
        } else {
          this.noData = false;
        }
      });
  }

  create() {
    const dialogRef = this.dialog.open(CreateAdminDocumentTypeDialogComponent, { disableClose: true });
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

  getAllNatures() {
    this.globalService.getDocumentNature().subscribe(
      data => {
        for(const i of data){
          this.natures[i.id] = i;
        }
      },
      error => {
        console.log(error);
      });
  }

  ngOnInit() {
    this.displayedColumns = ['code', 'description', 'natureName', 'actions'];
    this.dataSource = new MatTableDataSource<any>(this.types);
    this.mainTablePaginationOptions = [5, 15, 50];
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAllNatures();
    this.getAll();
  }

}
