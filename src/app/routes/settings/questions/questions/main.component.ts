import { Component, OnInit, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuestionsService } from '../../../../services/configuration/questions/questionsService';
import { QuestionCreateComponent } from './dialogs/create/create.component';

@Component({
  selector: 'app-questions-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class QuestionsMainComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private questionsService: QuestionsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    activatedRoute.data.subscribe(
      response => {
        this.firstdata = response.item.organs.questions;
        this.organ = response.item.organs;
        this.p1 = this.firstdata.filter(step => {
          return step.stepTypeId === 1
        })

        this.p2 = this.firstdata.filter(step => {
          return step.stepTypeId === 2
        })
      }
    );
  }

  windowwith = window.innerWidth;
  colsnumber = 6;
  id;
  p1;
  p2;
  firstdata;
  organ;
  title = 'Organo: ';
  titleq2 = 'Organo: ';
  icon = 'assignment';
  color = '#14a950';
  subtitle = 'Listado de preguntas para este organo.';
  colorq2 = 'tomato';
  subtitleq2 = 'Listado de preguntas para este organo.';

  profiles;

  nodataheight = '100px';
  nodatamessage = 'No hay datos para mostrar';

  states = {
    0: 'Inactivo',
    1: 'Activo'
  };

  


  // tabla paso 1
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  mainTablePaginationOptions: number[];
  displayedColumns: string[];
  noData = false;
  isLoading = true;


  // tabla paso 2
  dataSourceq2 = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator, { static: false }) paginatorq2: MatPaginator;
  @ViewChild(MatSort, { static: false }) sortq2: MatSort;
  @ViewChild(MatTable, { static: false }) tableq2: MatTable<any>;
  mainTablePaginationOptionsq2: number[];
  displayedColumnsq2: string[];
  noDataq2 = false;
  isLoadingq2 = true;

  displayedColumns1: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource1 = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator1: MatPaginator;




  @HostListener('window:resize', ['$event']) onResize(event) {
    this.windowwith = event.target.innerWidth;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  redirect() {
    console.log("from questions")
    this.router.navigate(['configuracion/organos/1/preguntas']);
  }

  create() {
    const dialogRef = this.dialog.open(QuestionCreateComponent, { disableClose: true, data: this.activatedRoute.params["_value"] });

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
    this.questionsService.getById(this.organ.id).subscribe(
      data => {
        console.log(data);
        this.dataSource = new MatTableDataSource<any>(data.questions.filter(step => {
          return step.stepTypeId === 1;
        }));
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;

        this.dataSourceq2 = new MatTableDataSource<any>(data.questions.filter(step => {
          return step.stepTypeId === 2;
        }));
        this.table.renderRows();


        this.dataSourceq2.paginator = this.paginatorq2;
        this.dataSourceq2.sort = this.sortq2;

        this.noData = !(this.dataSource.data.length > 0);
        this.isLoading = false;

        this.noDataq2 = !(this.dataSourceq2.data.length > 0);
        this.isLoadingq2 = false;
      },
      error => {
      });
  }

  ngOnInit() {

    this.dataSource1.paginator = this.paginator1;

    console.log(this.p1);
    if (this.p1.length > 0) {
      this.title = this.title + this.organ.name + ', Paso 1:';
      this.titleq2 = this.titleq2 + this.organ.name + ' Paso 2:';
    } else {
      this.title = this.title + this.organ.name;
    }

    this.dataSource = new MatTableDataSource<any>([]);
    this.displayedColumns = ['title', 'actions'];
    this.mainTablePaginationOptions = [7, 15, 50];
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.noData = false;
    this.isLoading = false;

    this.dataSourceq2 = new MatTableDataSource<any>([]);
    this.displayedColumnsq2 = ['title', 'actions'];
    this.mainTablePaginationOptionsq2 = [7, 15, 50];
    this.dataSourceq2.paginator = this.paginatorq2;
    this.dataSourceq2.sort = this.sortq2;
    this.noDataq2 = false;
    this.isLoadingq2 = false;

    this.getAll();
  }

}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];