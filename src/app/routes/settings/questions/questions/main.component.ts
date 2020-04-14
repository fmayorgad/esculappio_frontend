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
import { QuestionEditComponent } from './dialogs/edit/edit.component';

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

        this.organMessage = response.item.organs.advertising;
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

  icon2 = 'local_atm';
  colorq3 = '#5745e8';
  subtitleq3 = 'Publicidad a presentar al final de las preguntas.';
  titleq3 = 'Publicidad';

  profiles;

  nodataheight = '100px';
  nodatamessage = 'No hay datos para mostrar';

  organMessage;
  states = {
    0: 'Inactivo',
    1: 'Activo'
  };

  showp1 = true;
  showp2 = true;

  isLoading = true;
  noData = false;
  isLoading2 = true;
  noData2 = false;

  dataSource = new MatTableDataSource<any>([]);
  @ViewChild('matPaginator1') MatPaginator1: MatPaginator;
  @ViewChild('matSort1') MatSort1: MatSort;
  @ViewChild('matTable1') MatTable1: MatTable<any>;

  dataSource2 = new MatTableDataSource<any>([]);
  @ViewChild('matPaginator2') MatPaginator2: MatPaginator;
  @ViewChild('matSort2') MatSort2: MatSort;
  @ViewChild('matTable2') MatTable2: MatTable<any>;

  mainTablePaginationOptions: number[] = [5, 15, 50];
  displayedColumns: string[] = ['title', 'actions'];


  applyFilter(filterValue: string, table: number) {
    if (table === 1) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    } else {
      this.dataSource2.filter = filterValue.trim().toLowerCase();
    }
  }

  editState(id, state) {
    console.log(state)
    console.log(id)
    this.questionsService.editState({ state: !state }, id).subscribe(
      response => {
        this._snackBar.open('Estado editado satisfactoriamente', 'Aceptar', {
          duration: 3000,
          panelClass: 'snackbarSuccess'
        });
      },
      error => {
        this._snackBar.open('Error al editar el estado. Intentalo de nuevo más tarde', 'Aceptar', {
          duration: 3000,
          panelClass: 'snackbarError'
        });
      },
    );
  }

  editMessage() {
    console.log(this.activatedRoute.params["_value"])
    this.questionsService.editMessage({ advertising: this.organMessage }, this.activatedRoute.params["_value"].id).subscribe(
      response => {
        this._snackBar.open('Mensaje editado satisfactoriamente', 'Aceptar', {
          duration: 3000,
          panelClass: 'snackbarSuccess'
        });
      },
      error => {
        this._snackBar.open('Error al editar el mensaje. Intentalo de nuevo más tarde', 'Aceptar', {
          duration: 3000,
          panelClass: 'snackbarError'
        });
      },
    );
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

  editModal(element) {
    const dialogRef = this.dialog.open(QuestionEditComponent, { disableClose: true, data: element });

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

        console.log(data)
        const questions1 = data.questions.filter(q => q.stepTypeId === 1);
        const questions2 = data.questions.filter(q => q.stepTypeId === 2);

        this.showp1 = data.questions.length > 0 ? false : true;
        this.showp2 = data.questions.length > 0 ? false : true;

        console.log(this.showp1)

        this.dataSource = new MatTableDataSource<any>(questions1);
        this.dataSource.paginator = this.MatPaginator1;
        this.dataSource.sort = this.MatSort1;

        this.dataSource2 = new MatTableDataSource<any>(questions2);
        this.dataSource2.paginator = this.MatPaginator2;
        this.dataSource2.sort = this.MatSort2;

        this.isLoading = false;
        if (questions1.length === 0) {
          this.noData = true;
        } else {
          this.noData = false;
        }

        this.isLoading2 = false;
        if (questions2.length === 0) {
          this.noData2 = true;
        } else {
          this.noData2 = false;
        }
      },
      error => {
      });
  }

  ngOnInit() {

    if (this.p1.length > 0) {
      this.title = this.title + this.organ.name + ', Paso 1';
      this.titleq2 = this.titleq2 + this.organ.name + ' Paso 2';
    } else {
      this.title = this.title + this.organ.name;
    }
    this.showp1 = this.p1.length > 0 ? false : true;
    this.showp2 = this.p1.length > 0 ? false : true;

    this.dataSource.paginator = this.MatPaginator1;
    this.dataSource.sort = this.MatSort1;

    this.dataSource2.paginator = this.MatPaginator2;
    this.dataSource2.sort = this.MatSort2;

    this.getAll();
  }

}



