import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VoucherService } from '../../../services';
import { VouchersDialogsCreateComponent } from '../dialogs/create/create.component';
import {VouchersDialogsEditComponent} from '../dialogs/edit/edit.component';
@Component({
  selector: 'app-vouchers-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class VouchersMainComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public voucherService: VoucherService,
    private _snackBar: MatSnackBar,
  ) {
  }

  title = 'Comprobantes';
  icon = 'receipt';
  color = '#20b9e5';
  subtitle = 'comprobantes creados en la plataforma';

  noData = false;
  isLoading = true;
  nodataheight = '100px';
  nodatamessage = 'No hay datos para mostrar';

  dataSource = new MatTableDataSource<Voucher>([]);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  mainTablePaginationOptions: number[];

  displayedColumns: string[];



  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Voucher>([]);
    this.displayedColumns = ['description', 'code', 'state', 'actions'];
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAll();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAll() {
    this.voucherService
      .getAllVouchers()
      .subscribe(
        vouchers => {
          this.dataSource = new MatTableDataSource<Voucher>(vouchers);

          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.isLoading = false

          if (vouchers.length == 0) { this.noData = true }
        },
        error => {
          console.error(error);
        }
      );
  }

  edit(element){
    console.log(element)
    const dialogRef = this.dialog.open(VouchersDialogsEditComponent, { data: element, disableClose: true });
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

  createVoucher() {
    const dialogRef = this.dialog.open(VouchersDialogsCreateComponent, { disableClose: true });
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

}

interface Voucher {
  id: number;
  description: string;
  classification: string;
  code: string;
  state: number
}


