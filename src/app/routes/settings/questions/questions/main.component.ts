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
  @ViewChild(MatTable) table: MatTable<any>;
  mainTablePaginationOptions: number[];
  displayedColumns: string[];
  noData = false;
  isLoading = true;


  // tabla paso 2
  dataSourceq2 = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginatorq2: MatPaginator;
  @ViewChild(MatSort) sortq2: MatSort;
  @ViewChild(MatTable) tableq2: MatTable<any>;
  mainTablePaginationOptionsq2: number[];
  displayedColumnsq2: string[];
  noDataq2 = false;
  isLoadingq2 = true;


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
          return step.stepTypeId === 1
        }));
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;

        this.dataSourceq2 = new MatTableDataSource<any>(data.questions.filter(step => {
          return step.stepTypeId === 2
        }));
        this.dataSourceq2.paginator = this.paginator;
        this.dataSourceq2.sort = this.sort;

        this.noData = !(this.dataSource.data.length > 0);
        this.isLoading = false;

        this.noDataq2 = !(this.dataSourceq2.data.length > 0);
        this.isLoadingq2 = false;
      },
      error => {
      });
  }

  ngOnInit() {
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

