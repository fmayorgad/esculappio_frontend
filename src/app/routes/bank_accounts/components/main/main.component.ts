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
	
	 }
	// bodycardtitled variables
	title = 'Registro de usuarios';
	icon = 'how_to_reg';
	color = '#e53935';
	subtitle = 'Listado de administrativos: Secretarias y Especialistas.';
	bankAccounts = [];
	type = {};
	mainTablePaginationOptions = [10, 15, 50];

	noData = false;
	isLoading = false;
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



	create() {
		const dialogRef = this.dialog.open(CreateAccountBankDialogComponent, { disableClose: true });

		dialogRef.afterClosed().subscribe(result => {
			if (result.state === 1) {
				this._snackBar.open(result.message, 'Aceptar', {
					duration: 3000,
				});
		
			}
			if (result.state === 0) {
				this._snackBar.open(result.message, 'Aceptar', {
					duration: 3000,
				});
			}
		});
	}


	ngOnInit() {
		this.displayedColumns = ['nombre', 'tipo', 'acciones'];
		this.dataSource = new MatTableDataSource<any>([{nombre: "Claudia Marín", tipo: "Secretaria"},{nombre: "Andréa Villa", tipo: "Especialista Oncóloga"}]);
		this.mainTablePaginationOptions = [5, 15, 50];
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}
}
