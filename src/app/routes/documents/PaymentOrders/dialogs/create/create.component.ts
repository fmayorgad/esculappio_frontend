import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { environmentvariables } from '../../../../../../assets/data/environmentvariables'
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RevenueService, PaymentOrdersService , CertificatedReceibedService, ThirdsService, BudgetAccountsService, ProjectsService, CampusService, GlobalService, VoucherService, ClientDocumentTypesService, PUCService, AvaliabilityCertificatesService, PurchaseOrdersService } from '../../../../../services';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import * as moment from 'moment';

@Component({
  selector: 'create-payment-order',
  templateUrl: 'create.html',
})

export class CreatePaymentOrderDialogComponent implements OnInit {

  constructor(
    private globalService: GlobalService,
    private campusService: CampusService,
    public dialogRef: MatDialogRef<CreatePaymentOrderDialogComponent>,
    public voucherService: VoucherService,
    public clientDocumentTypesService: ClientDocumentTypesService,
    private budgetAccountsService: BudgetAccountsService,
    private revenueService: RevenueService,
    private projectsService: ProjectsService,
    private thirdsService: ThirdsService,
    private purchaseOrdersService: PurchaseOrdersService,
    private certificatedReceibedService: CertificatedReceibedService,
    private paymentOrdersService : PaymentOrdersService ,
    private avaliabilityCertificatesService: AvaliabilityCertificatesService) {
  }

  title = 'Crear ';
  icon = 'add';
  color = color;
  subtitle = 'Crear Órden de Pago.';

  budgedAccounts;

  dinfilter = {};

  minDate = new Date();

  createFormGroup = new FormGroup({
    budget: new FormControl(null, [Validators.required]),
    noteDate: new FormControl(new Date(), [Validators.required]),
    thirdPartyId: new FormControl(null, [Validators.required]),
    observations: new FormControl('', []),
  });

  mainTablePaginationOptions = [5, 10, 15, 50];

  documentType;
  campus;
  natures = {};
  revenues;
  revenuetypes;
  concepts;
  thirds;
  budgedAccountsOriginal;
  evaluate = [];
  projects;
  cdps = [];
  cdpsobject = {};

  accounts = [
    { availabilityCerticateId: null, budgetAccountId: null, totalAmount: 0, budgetAccounts: [], revenueid: null, amount: null, filter1: '', filter2: '', filter3: '' },
    { availabilityCerticateId: null, budgetAccountId: null, totalAmount: 0, budgetAccounts: [], revenueid: null, amount: null, filter1: '', filter2: '', filter3: '' },
  ];

  totalAmount = 0;

  dataSource = new MatTableDataSource<any>(this.accounts);
  displayedColumns: string[] = ['cdp', 'accountid', 'revenueid', 'amount', 'actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) tables: MatTable<any>;

  getAmount() {
    this.totalAmount = this.accounts.reduce((a, b) => +a + +b.amount, 0);
  }

  addAccount(element) {
    this.accounts.push({
      availabilityCerticateId: element ? element.availabilityCerticateId : 0,
      budgetAccountId: element ? element.budgetAccountId : 0,
      revenueid: element ? element.revenueId : 0,
      amount: element ? element.value : 0,
      budgetAccounts: [],
      totalAmount: 0,
      filter1: '', filter2: '', filter3: ''
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource = new MatTableDataSource<any>(this.accounts);
    this.evaluate = this.accounts.filter(a => {
      return a.availabilityCerticateId != 0 && a.revenueid != 0 && a.amount != 0;
    });
  }

  eval() {
    this.evaluate = this.accounts.filter(a => {
      return a.availabilityCerticateId != null && a.budgetAccountId != null && a.revenueid != 0 && a.amount != 0 && a.amount != null;
    }); console.log(this.evaluate)
  }

  getProyects() {
    this.projectsService.getAll().subscribe(data => {
      this.projects = data;
    });
  }

  deletere(i) {
    this.accounts.splice(i, 1);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource = new MatTableDataSource<any>(this.accounts);
    this.getAmount();
    this.eval();
  }

  getBudgets() {
    this.globalService.getBudgets().subscribe(data => {
      this.revenuetypes = data.filter(g => g.id === 2 || g.id === 6);
    });
  }

  getThirds() {
    this.thirdsService.getAll().subscribe(
      data => {
        this.thirds = data;
      });
  }

  currency(number) {
    return this.globalService.currency(number);
  }

  filterSelect(text, filter, type) {
    if (type === 1) {
      return filter.concept.trim().toLowerCase().includes(text.trim().toLowerCase()) | filter.budget.description.includes(text);
    }

    if (type === 2) {
      return filter.description.trim().toLowerCase().includes(text.trim().toLowerCase()) | filter.code.includes(text);
    }

    if (type === 3) {
      return filter.description.trim().toLowerCase().includes(text.trim().toLowerCase()) | filter.code.includes(text);
    }

  }


  getAccounts() {
    this.budgetAccountsService.getAll().subscribe(data => {
      this.budgedAccounts = data.filter(m => m.code.charAt(0) == 2)
    });
  }

  getRevenues() {
    this.revenueService.getAllRevenues().subscribe(data => {
      this.revenues = data;
    });
  }

  getAllSubsidiaries() {
    this.campusService.getAll().subscribe(data => {
      this.campus = data;
    });
  }

  getByThird() {
    let id = this.createFormGroup.value.thirdPartyId;
    this.certificatedReceibedService.getByThird(id).subscribe(data => {
      this.cdps = data;
      for (let c of this.cdps) {
        this.cdpsobject[c.id] = c;
      }
      console.log(this.cdpsobject)
    });
  }

  selectCDP(i, ind) {
    this.accounts[ind].budgetAccounts = i.certificatesReceivedDetail;
    this.accounts[ind].totalAmount = i.totalAmount;
    console.log(this.accounts)
    this.dataSource = new MatTableDataSource<any>(this.accounts);
  }

  create() {
    let tmp = [];
    for (const i of this.accounts) {
      tmp.push({
        value: i.amount,
        certificateReceivedId: i.availabilityCerticateId,
        revenueId: i.revenueid,
        budgetAccountId: i.budgetAccountId
      });
    }

    const obj = {
      dateElaboration: moment(this.createFormGroup.value.noteDate).format('YYYY-MM-DD'),
      concept: this.createFormGroup.value.concept,
      budgetId: this.createFormGroup.value.budget,
      detail: this.createFormGroup.value.detail,
      observations: this.createFormGroup.value.observations,
      thirdPartyId: this.createFormGroup.value.thirdPartyId,
      paymentOrderDetailDto: tmp,
    };

    this.paymentOrdersService.create(obj).subscribe(
      data => {
        this.dialogRef.close({ state: 1, message: 'Documento creado satisfactoriamente.' });
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
    this.getBudgets();
    this.getThirds();
    this.getProyects();
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

const color = environmentvariables.colors.success;
