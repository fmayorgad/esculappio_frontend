import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CreateThirdTypeDialogComponent } from '../dialogs/create/create.component';
import {EditThirdTypeDialogComponent} from '../dialogs/edit/edit.component';
import { ThirdPartyTypesService } from '../../../../services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-budgedaccounts.module-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class ThirdTypesMainComponent implements OnInit {
    constructor(
        public dialog: MatDialog,
        private thirdPartyTypesService: ThirdPartyTypesService,
        private changeDetectorRefs: ChangeDetectorRef,
        private _snackBar: MatSnackBar,
    ) { }
    // bodycardtitled variables
    title = 'Terceros: Tipos de Terceros';
    icon = 'group';
    color = '#ff7e40';
    subtitle = 'Listado de los Tipos de Terceros creados en la plataforma.';

    mainTablePaginationOptions = [5, 10, 15, 50];

    states = { 0: 'Inactivo', 1: 'Activo' };
    types = [];

    noData = false;
    isLoading = true;
    nodataheight = '100px';
    nodatamessage = 'No hay datos para mostrar';


    displayedColumns: string[] = ['id', 'name', 'state', 'acciones'];
    dataSource = new MatTableDataSource<types>([]);

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatTable, { static: false }) tables: MatTable<any>;

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    getAll() {
        this.thirdPartyTypesService.getAll().subscribe(
            data => {
                console.log(data);
                this.types = data;
                this.dataSource = new MatTableDataSource<types>(this.types);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.changeDetectorRefs.detectChanges();
                this.tables.renderRows();
                this.isLoading = false;

                if (data.length == 0) { this.noData = true }
            },
            error => {
                // this.alertService.error(error);
                console.log(error);
            });
    }

    create() {
        const dialogRef = this.dialog.open(CreateThirdTypeDialogComponent, { disableClose: true });
        dialogRef.afterClosed().subscribe(result => {
            this.getAll();
        });
    }

    edit(element) {
        console.log(element)
        const dialogRef = this.dialog.open(EditThirdTypeDialogComponent, { disableClose: true, data: element });

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

export interface types {
    id: number;
    description: string;
    state: number;
}

