import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CampusService } from '../../../../services';
import { SubsidiariesDialogsCreateComponent } from '../dialogs/create/create.component';
import { SubsidiariesDialogsEditComponent } from '../dialogs/edit/edit.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-budgedaccounts.module-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class SubsidiariesMainComponent implements OnInit {
    constructor(
        public dialog: MatDialog,
        private campusService: CampusService,
        private changeDetectorRefs: ChangeDetectorRef,
        private _snackBar: MatSnackBar,
    ) { }
    // bodycardtitled variables
    title = 'Sedes';
    icon = 'emoji_symbols';
    color = '#ff3854';
    subtitle = 'Listado Sedes de la institución.';

    mainTablePaginationOptions = [5, 10, 15, 50];

    states = { 0: 'Inactivo', 1: 'Activo' };
    data = [];

    noData = false;
	isLoading = true;
	nodataheight = '100px';
	nodatamessage = 'No hay datos para mostrar';

    displayedColumns: string[] = ['code', 'name', 'acciones'];
    dataSource = new MatTableDataSource<any>([]);

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatTable, { static: false }) tables: MatTable<any>;

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    getAll() {
        this.campusService.getAll().subscribe(
            data => {
                console.log(data);
                this.data = data;
                this.dataSource = new MatTableDataSource<any>(this.data);
                this.changeDetectorRefs.detectChanges();
                this.tables.renderRows();
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
                this.isLoading = false;
                if (data.length === 0) {
                    this.noData = true;
                } else{
                    this.noData = false;
                }
            },
            error => {
                console.log(error);
            });
    }

    create() {
        const dialogRef = this.dialog.open(SubsidiariesDialogsCreateComponent, { disableClose: true });
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
        const dialogRef = this.dialog.open(SubsidiariesDialogsEditComponent, { data: element, disableClose: true });
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
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.getAll();
    }
}

