import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuestionsService } from '../../../../services/configuration/questions/questionsService';

@Component({
  selector: 'app-organs-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class OrgansMainComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private questionsService: QuestionsService,
    private router: Router
  ) {
  }

  windowwith = window.innerWidth;
  colsnumber = 6;

  title = 'Organos';
  icon = 'accessibility';
  color = '#f7555c';
  subtitle = 'Listado de Organos disponibles en la app movil.';


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


  redirect(id){
    this.router.navigate([`configuracion/organos/${id}/preguntas`]);
  }

  getAll() {
    this.questionsService.getAll().subscribe(
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

  changeEntityState(index, state, entityId) {
    console.log(index)
    console.log(state)
    console.log(entityId)

    // this.configService.setEntityState((state) ? 1 : 0, entityId).subscribe(
    //   data => {
    //     this._snackBar.open('Estado editado satisfactoriamente.', 'Aceptar', {
    //       duration: 3000,
    //     });
    //   },
    //   error => {

    //     this.dataSourceAuditoria.filteredData[index].state = !state;
    //     this._snackBar.open('No se pudo realizar la acción. Intentalo de nuevo más tarde.', 'Aceptar', {
    //       duration: 3000,
    //     });
    //   });
  }




  ngOnInit() {
    //this.getAllProfiles();
    this.getAll();
    this.displayedColumns = ['name', 'actions'];
    this.mainTablePaginationOptions = [7, 15, 50];
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

}
