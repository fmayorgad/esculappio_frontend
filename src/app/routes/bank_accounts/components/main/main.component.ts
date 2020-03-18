import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { BankAccountsService, GlobalService } from '../../../../services';
import { CreateAccountBankDialogComponent } from '../dialogs/create/create.component';
import { EditSchoolDialogComponent } from '../dialogs/edit/edit.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
	selector: 'app-schools.module-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.css']
})
export class BankAccountsModuleMainComponent implements OnInit {
	constructor(
		public dialog: MatDialog,
		private bankAccountsService: BankAccountsService,
		private globalService: GlobalService,
		private _snackBar: MatSnackBar,
	) { 
		this.globalService.getBankAccountTypes().subscribe(
			data => {
				console.log(data)
				for (let i of data) {
					this.accountTypes[i.id] = i;
				}
				console.log(this.accountTypes);
			},
			error => {
				this._snackBar.open(error.message, 'Aceptar', {
					duration: 3000,
				});
			});
	 }
	// bodycardtitled variables
	title = 'Cuentas Bancarias';
	icon = 'ballot';
	color = '#e53935';
	subtitle = 'Listado de cuentas bancarias de la institución.';
	bankAccounts = [];
	type = {};
	mainTablePaginationOptions = [10, 15, 50];

	noData = false;
	isLoading = true;
	nodataheight = '100px';
	nodatamessage = 'No hay datos para mostrar';

	accountTypes = {};

	displayedColumns = ['code', 'number', 'description', 'typeName', 'acciones'];
	dataSource = new MatTableDataSource<any>(this.bankAccounts);

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	getAll() {
		this.bankAccountsService.getAll().subscribe(
			data => {
				console.log(data);
				//data.map(c => c.sectorName = this.sectors[c.sectorId]);
				this.dataSource = new MatTableDataSource<any>(data);
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
				this.isLoading = false;
				if (data.length === 0) {
					this.noData = true;
				} else {
					this.noData = false;
				}
			},
			error => {
				// this.alertService.error(error);
				console.log(error);
			});
	}

	create() {
		const dialogRef = this.dialog.open(CreateAccountBankDialogComponent, { disableClose: true });

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
		console.log(element)
		const dialogRef = this.dialog.open(EditSchoolDialogComponent, { disableClose: true, data: element });

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
		this.displayedColumns = ['code', 'number', 'description', 'typeName', 'acciones'];
		this.dataSource = new MatTableDataSource<any>(this.bankAccounts);
		this.mainTablePaginationOptions = [5, 15, 50];
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
		this.getAll();
	}
}
