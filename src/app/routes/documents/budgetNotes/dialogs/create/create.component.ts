import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { environmentvariables } from '../../../../../../assets/data/environmentvariables'
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { timeout } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminDocumentTypesService, BudgetNotesService, RevenueService, ThirdsService, BudgetAccountsService, ProjectsService, CampusService, GlobalService, VoucherService, ClientDocumentTypesService, PUCService } from '../../../../../services';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import * as moment from 'moment';

@Component({
  selector: 'create-budged-account',
  templateUrl: 'create.html',
})

export class CreateBudgedNoteDialogComponent implements OnInit {

  constructor(
    private _snackBar: MatSnackBar,
    private globalService: GlobalService,
    private adminDocumentTypesService: AdminDocumentTypesService,
    private campusService: CampusService,
    public dialogRef: MatDialogRef<CreateBudgedNoteDialogComponent>,
    public voucherService: VoucherService,
    public clientDocumentTypesService: ClientDocumentTypesService,
    private budgetAccountsService: BudgetAccountsService,
    private revenueService: RevenueService,
    private projectsService: ProjectsService,
    private thirdsService: ThirdsService,
    private budgetNotesService: BudgetNotesService,
    private pUCService: PUCService
  ) {
  }

  title = 'Crear';
  icon = 'add';
  color = color;
  subtitle = 'Crear Nota Presupuestal.';

  budgedAccounts;

  dinfilter = {};

  createFormGroup = new FormGroup({
    budget: new FormControl(null, [Validators.required]),
    conceptId: new FormControl('', [Validators.required]),
    subconceptId: new FormControl(null, []),
    noteDate: new FormControl('', [Validators.required]),
  });

  mainTablePaginationOptions = [5, 10, 15, 50];

  documentType;
  projects;
  campus;
  natures = {};
  revenues;
  revenuetypes;
  concepts;
  subconcepts;
  thirds;

  budgetAccountsPlan;
  budgedAccountsOriginal;

  evaluate = [];

  accounts = [
    { accountId: null, campusid: null, revenueid: null, projectid: null, amount: null, filterb: '', filterc: '', filterr: '', filterp: '' },
    { accountId: null, campusid: null, revenueid: null, projectid: null, amount: null, filterb: '', filterc: '', filterr: '', filterp: '' },
  ];

  totalAmount = 0;

  dataSource = new MatTableDataSource<any>(this.accounts);
  displayedColumns: string[] = ['accountid', 'campusid', 'revenueid', 'proyectid', 'amount', 'actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) tables: MatTable<any>;

  getAmount() {
    this.totalAmount = this.accounts.reduce((a, b) => +a + +b.amount, 0);
  }

  addAccount() {
    this.accounts.push({ accountId: 0, campusid: 0, revenueid: 0, projectid: 0, amount: 0, filterb: '', filterc: '', filterr: '', filterp: '' });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource = new MatTableDataSource<any>(this.accounts);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource = new MatTableDataSource<any>(this.accounts);
    this.evaluate = this.accounts.filter(a => {
      return a.accountId != 0 && a.revenueid != 0 && a.amount != 0;
    });
  }

  deletere(i) {
    this.accounts.splice(i, 1);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource = new MatTableDataSource<any>(this.accounts);
    this.getAmount();
  }

  getBudgets() {
    this.globalService.getBudgets().subscribe(data => {
      this.revenuetypes = data;
    });
  }

  getBudgetsAccounts() {
    this.budgetNotesService.getAll().subscribe(data => {
      this.budgetAccountsPlan = data;
    });

  }

  eval() {
    console.log(this.accounts)
    this.evaluate = this.accounts.filter(a => {
      return a.accountId != null && a.projectid != null && a.campusid != null && a.revenueid != 0 && a.amount != 0 && a.amount != null;
    });
  }

  getConcepts() {

    // filtro
    let tmp;
    if (this.createFormGroup.controls.budget.value === 1 || this.createFormGroup.controls.budget.value === 4) {
      tmp = 1;
    }
    else {
      tmp = 2;
    }

    this.budgedAccounts = this.budgedAccountsOriginal

    this.budgedAccounts = this.budgedAccounts.filter((m) => {

      return m.code.charAt(0) == tmp
    }
    );

    this.createFormGroup.controls.conceptId.setValue(undefined);
    this.globalService.getConcepts(this.createFormGroup.value.budget).subscribe(data => {
      this.concepts = data;
    });
  }

  getSubconcepts() {
    this.globalService.getSubconcepts(this.createFormGroup.value.conceptId).subscribe(data => {
      this.subconcepts = data;
    });
  }

  getThirds() {
    this.thirdsService.getAll().subscribe(
      data => {
        this.thirds = data;
      });
  }

  filterSelect(text, filter, type) {

    if (type === 1) {
      return filter.description.trim().toLowerCase().includes(text.trim().toLowerCase()) || filter.code.includes(text);
    }

    if (type === 2) {
      return filter.name.trim().toLowerCase().includes(text.trim().toLowerCase()) || filter.code.includes(text);
    }

    if (type === 3) {
      return filter.description.trim().toLowerCase().includes(text.trim().toLowerCase()) || filter.code.includes(text);
    }

    if (type === 4) {
      return filter.description.trim().toLowerCase().includes(text.trim().toLowerCase()) || filter.code.includes(text);
    }
  }



  getAccounts() {
    this.budgetAccountsService.getAll().subscribe(data => {
      console.log(data)
      this.budgedAccounts = data;
      this.budgedAccountsOriginal = data;
    });
  }

  getRevenues() {
    this.revenueService.getAllRevenues().subscribe(data => {
      this.revenues = data;
    });
  }

  getProyects() {
    this.projectsService.getAll().subscribe(data => {
      this.projects = data;
    });
  }

  getAllSubsidiaries() {
    this.campusService.getAll().subscribe(data => {
      this.campus = data;
    });
  }


  create() {
    let tmp = [];
    for (const i of this.accounts) {
      tmp.push({
        value: i.amount,
        budgetAccountId: i.accountId,
        campusId: i.campusid,
        revenueId: i.revenueid,
        projectId: i.projectid,
      });
    }

    const obj = {
      noteDate: moment(this.createFormGroup.value.noteDate).format('YYYY-MM-DD'),
      conceptId: this.createFormGroup.value.conceptId,
      subconceptId: this.createFormGroup.value.subconceptId,
      budgetNotesDetail: tmp
    };

    console.log(obj)

    this.budgetNotesService.create(obj).subscribe(
      data => {
        this.dialogRef.close({ state: 1, message: 'Tipo de documento creado satisfactoriamente.' });
      },
      error => {
        console.log(error);
        this.dialogRef.close({
          state: 0,
          message: 'Error al ejecutar la acción. Intentalo de neuvo más tarde.'
        });
      });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAllSubsidiaries();
    this.getAccounts();
    this.getRevenues();
    this.getProyects();
    this.getBudgets();
    this.getThirds();
    this.getBudgetsAccounts();
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

const color = environmentvariables.colors.success;
