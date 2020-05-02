import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminUsersService } from '@services';
import { UserAdminCreateComponent } from './dialogs/create/create.component';
import { UserAdminEditComponent } from './dialogs/edit/edit.component';

@Component({
  selector: 'app-useradmin-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class UsersAdminMainComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private adminUsersService: AdminUsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  windowwith = window.innerWidth;
  colsnumber = 6;

  title = 'Usuarios administrativos';
  icon = 'how_to_reg';
  color = '#ffab42';
  subtitle = 'Listado de usuarios administrativos.';


  profiles;

  nodataheight = '100px';
  nodatamessage = 'No hay datos para mostrar';

  states = {
    0: 'Inactivo',
    1: 'Activo'
  };


  // tabla permisos
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
  mainTablePaginationOptions: number[];
  displayedColumns: string[];
  noData = false;
  isLoading = true;


  @HostListener('window:resize', ['$event']) onResize(event) {
    this.windowwith = event.target.innerWidth;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  create() {
    const dialogRef = this.dialog.open(UserAdminCreateComponent, { disableClose: true, data: this.activatedRoute.params["_value"] });

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

  edit(element) {
    const dialogRef = this.dialog.open(UserAdminEditComponent, { disableClose: true, data: element });
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
    this.adminUsersService.getAll().subscribe(
      data => {
        console.log(data);
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
      });
  }

  editState(id, state) {
    this.adminUsersService.editState(id, state).subscribe(
      data => {
        this._snackBar.open('Estado editado satisfactoriamente.', 'Aceptar', {
          duration: 3000,
          panelClass: 'snackbarSuccess'
        });
      },
      error => {
        this._snackBar.open('No se pudo realizar la acción. Intentalo de nuevo más tarde.', 'Aceptar', {
          duration: 3000,
          panelClass: 'snackbarError'
        });
      });
  }



  ngOnInit() {
    //this.getAllProfiles();
    this.getAll();
    this.displayedColumns = ['name', 'email', 'profile', 'actions'];
    this.mainTablePaginationOptions = [7, 15, 50];
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

}
