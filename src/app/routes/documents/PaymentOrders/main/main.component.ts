import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material';
import {  CreatePaymentOrderDialogComponent } from '../dialogs/create/create.component';
import { EditCDPDialogComponent } from '../dialogs/edit/edit.component';
import { CloseDialogsComponent } from '../dialogs/close/close.component';
import { PurchaseOrdersService, CertificatedReceibedService, PaymentOrdersService} from '../../../../services';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'cdp-budged',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class PaymentOrdersMainComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private purchaseOrdersService: PurchaseOrdersService,
    private paymentOrdersService: PaymentOrdersService,
    private certificatedReceibedService: CertificatedReceibedService
  ) {
  }

  title = 'Ordenes de Pago';
  icon = 'post_add';
  color = '#4035e5';
  subtitle = 'Listado de Ordenes de Pago creadas por la institución.';

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
  documentType;


  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;

  mainTablePaginationOptions: number[];

  displayedColumns: string[];

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAll() {
    this.paymentOrdersService.getAll()
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
    const dialogRef = this.dialog.open(CreatePaymentOrderDialogComponent, { disableClose: true });
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
    const dialogRef = this.dialog.open(EditCDPDialogComponent, { disableClose: true, data: element });
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

  cancel(element) {
    const dialogRef = this.dialog.open(CloseDialogsComponent, { disableClose: true, data: element });
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
    this.displayedColumns = ['date', 'budget' , 'third', 'observations', 'actions'];
    this.dataSource = new MatTableDataSource<any>(this.types);
    this.mainTablePaginationOptions = [5, 15, 50];
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAll();
  }

}
