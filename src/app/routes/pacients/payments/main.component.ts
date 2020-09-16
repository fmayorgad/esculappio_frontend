import { HttpClient } from '@angular/common/http';

import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserPacientCreateComponent } from '../dialogs/create/create.component';
import { AdminUsersService, AuthenticationService } from '@services';
import { trigger, style, animate, transition } from '@angular/animations';

// diagnosis 
import {ListCreateComponent} from './dialogs/list/create.component';


@Component({
  selector: 'app-pacients-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(350, style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate(350, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class PaymentsMainComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private adminUsersService: AdminUsersService  ) {
  }
  data;

  windowwith = window.innerWidth;
  colsnumber = 6;

  title = 'Pagos: ';
  icon = 'face';
  color = 'green';
  subtitle = 'Listados de pagos.';

  titleProcedures = 'Historias clinicas pendientes';
  iconProcedures = 'supervised_user_circle';
  colorProcedures = '#ff3637';
  subtitleProcedures = 'Listados de historias clinicas pendientes de documento y de diagnostico';

  profiles;

  nodataheight = '100px';
  nodatamessage = 'No hay datos para mostrar';

  states = {
    0: 'Inactivo',
    1: 'Activo'
  };


  // tabla de pacientes
  dataSourcePacients = new MatTableDataSource<any>([]);
  @ViewChild('paginatorPacients') paginatorPacients: MatPaginator;
  @ViewChild('sortPacients') sortPacients: MatSort;
  @ViewChild('tablePacients') tablePacients: MatTable<any>;
  mainTablePaginationOptionsPacients: number[];
  displayedColumnsPacients: string[];
  noDataPacients = false;
  isLoadingPacients = true;



  @HostListener('window:resize', ['$event']) onResize(event) {
    this.windowwith = event.target.innerWidth;
  }

  applyFilter(filterValue: string) {
    this.dataSourcePacients.filter = filterValue.trim().toLowerCase();
  }

  create(e) {
    const dialogRef = this.dialog.open(ListCreateComponent, { disableClose: true, data: e });

    dialogRef.afterClosed().subscribe(result => {
      if (result.state === 1) {
        this.getAll();
        this._snackBar.open(result.message, 'Aceptar', {
          duration: 3000,
          panelClass: 'snackbarSuccess'
        });
      }
      if (result.state === 0) {
        this._snackBar.open(result.message, 'Aceptar', {
          duration: 3000,
        });
      }
    });
  }

  getAll() {
    let id = this.activatedRoute.params["_value"].id;
    this.adminUsersService.getUserPayments(id).subscribe(
      data => {
        console.log(data);
        this.dataSourcePacients = new MatTableDataSource<any>(data);
        this.dataSourcePacients.paginator = this.paginatorPacients;
        this.dataSourcePacients.sort = this.sortPacients;
        this.isLoadingPacients = false;
        if (data.length === 0) {
          this.noDataPacients = true;
        } else {
          this.noDataPacients = false;
        }
      },
      () => {
      });

  }

  ngOnInit() {

    this.getAll();

    this.displayedColumnsPacients = ['date', 'name', 'description' , 'actions'];
    this.dataSourcePacients = new MatTableDataSource<any>([]);
    this.mainTablePaginationOptionsPacients = [7, 15, 50];
    this.dataSourcePacients.paginator = this.paginatorPacients;
    this.dataSourcePacients.sort = this.sortPacients;

    this.isLoadingPacients = false;
    if (this.data.length === 0) {
      this.noDataPacients = true;
    } else {
      this.noDataPacients = false;
    }

    console.log(this.data);

    this.title = this.title + ' ' + this.activatedRoute.data['_value'].item.user.name + ' ' + this.activatedRoute.data['_value'].item.user.lastname + ' ' + this.activatedRoute.data['_value'].item.user.surname

  }

}
