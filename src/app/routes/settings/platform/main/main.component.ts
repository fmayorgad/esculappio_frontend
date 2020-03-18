import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material';

import { BankService, GlobalService } from '../../../../services';
import { BanksDialogsCreateComponent } from '../dialogs/create/create.component';
import { EditPermissionsDialogsEditComponent } from '../dialogs/editPermission/edit.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfigurationsService } from './../../../../services/configurations.service';


@Component({
  selector: 'app-banks-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class PlatformMainComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private bankService: BankService,
    private _snackBar: MatSnackBar,
    private globalService: GlobalService,
    private configService: ConfigurationsService
  ) {
  }

  windowwith = window.innerWidth;
  colsnumber = 6;

  cards = {
    profiles: {
      title: 'Asignación de Permisos',
      icon: 'person_add',
      color: '#ee4e1c',
      subtitle: 'Asignar permisos a los perfiles existentes',
    },
    aud: {
      title: 'Auditoría',
      icon: 'playlist_add_check',
      color: '#f7555c',
      subtitle: 'Activar/desactivar auditoria de módulos',
    },
  };

  profiles;

  nodataheight = '100px';
  nodatamessage = 'No hay datos para mostrar';

  states = {
    0: 'Inactivo',
    1: 'Activo'
  };


  // tabla permisos
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  mainTablePaginationOptions: number[];
  displayedColumns: string[];
  noData = false;
  isLoading = true;

  // tabla auditoría
  dataSourceAuditoria = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator, { static: false }) paginatorAuditoria: MatPaginator;
  @ViewChild(MatSort, { static: false }) sortAuditoria: MatSort;
  @ViewChild(MatTable, { static: false }) tableAuditoria: MatTable<any>;
  mainTablePaginationOptionsAuditoria: number[];
  displayedColumnsAuditoria: string[];
  noDataAuditoria = false;
  isLoadingAuditoria = true;

  @HostListener('window:resize', ['$event']) onResize(event) {
    this.windowwith = event.target.innerWidth;
  }

  getAllProfiles() {
    this.globalService.getProfiles().subscribe(
      data => {
        console.log(data);
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoadingAuditoria = false;
        if (data.length === 0) {
          this.noDataAuditoria = true;
        } else {
          this.noDataAuditoria = false;
        }
      },
      error => {
      });
  }

  getEntities() {
    this.configService.getEntities().subscribe(
      data => {
        console.log(data);
        this.dataSourceAuditoria = new MatTableDataSource<any>(data);
        this.dataSourceAuditoria.paginator = this.paginator;
        this.dataSourceAuditoria.sort = this.sort;
        this.isLoading = false;
        if (data.length === 0) {
          this.noData = true;
        } else {
          this.noData = false;
        }
      },
      error => {
      });
  }

  changeEntityState(index, state, entityId){
    console.log(index)
    console.log(state)
    console.log(entityId)
    console.log(this.dataSourceAuditoria)
    
    this.configService.setEntityState((state) ? 1 : 0, entityId).subscribe(
      data => {
        this._snackBar.open('Estado editado satisfactoriamente.', 'Aceptar', {
          duration: 3000,
        });
      },
      error => {

        this.dataSourceAuditoria.filteredData[index].state = !state;
        this._snackBar.open('No se pudo realizar la acción. Intentalo de nuevo más tarde.', 'Aceptar', {
          duration: 3000,
        });
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editPermissions(element) {

    console.log(element)
    const dialogRef = this.dialog.open(EditPermissionsDialogsEditComponent, { disableClose: true, data: element });

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
    this.getAllProfiles();
    this.getEntities();
    this.displayedColumns = ['name', 'actions'];
    this.mainTablePaginationOptions = [4, 15, 50];
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.displayedColumnsAuditoria = ['name', 'actions'];
    this.mainTablePaginationOptionsAuditoria = [4, 15, 50];
    this.dataSourceAuditoria.paginator = this.paginatorAuditoria;
    this.dataSourceAuditoria.sort = this.sortAuditoria;

  }

}
