import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { DocumentsRoutingModule } from './documents-routing.module';
import { BudgetNotesMainComponent } from './budgetNotes/main/main.component';
import { AvaliabilityCertificatesMainComponent } from './availabilityCertificates/main/main.component';
import { PurchaseOrdersMainComponent } from './purchaseOrders/main/main.component';
import { CertificatedReceibedMainComponent } from './certificatedReceived/main/main.component';
import { PaymentOrdersMainComponent } from './PaymentOrders/main/main.component';
// dynamics
import { CreateBudgedNoteDialogComponent } from './budgetNotes/dialogs/create/create.component';
import { CloseDialogsComponent } from './budgetNotes/dialogs/close/close.component';
import { EditBudgedNoteDialogComponent } from './budgetNotes/dialogs/edit/edit.component';
import { EditCDPDialogComponent } from './availabilityCertificates/dialogs/edit/edit.component';
import { CloseDialogsComponent as CloseCDPDialogsComponent } from './availabilityCertificates/dialogs/close/close.component';
import { CreateCDPDialogComponent } from './availabilityCertificates/dialogs/create/create.component';
import { CreatePurchaseOrderDialogComponent } from './purchaseOrders/dialogs/create/create.component';
import { CreateCerticatedReceibedDialogComponent } from './certificatedReceived/dialogs/create/create.component';
import { EditPurchaseOrderDialogComponent } from './purchaseOrders/dialogs/edit/edit.component';
import { CloseOCDialogsComponent } from './purchaseOrders/dialogs/close/close.component';
import { EditCerticatedReceibedDialogComponent } from './certificatedReceived/dialogs/edit/edit.component';
import { from } from 'rxjs';
import { CreatePaymentOrderDialogComponent } from './PaymentOrders/dialogs/create/create.component';

const COMPONENTS = [
  PaymentOrdersMainComponent,
  BudgetNotesMainComponent,
  AvaliabilityCertificatesMainComponent,
  PurchaseOrdersMainComponent,
  CertificatedReceibedMainComponent
];

const COMPONENTS_DYNAMIC = [
  CloseOCDialogsComponent,
  EditPurchaseOrderDialogComponent,
  CreateBudgedNoteDialogComponent,
  CreatePurchaseOrderDialogComponent,
  CloseDialogsComponent,
  EditBudgedNoteDialogComponent,
  CreateCDPDialogComponent,
  EditCDPDialogComponent,
  CloseCDPDialogsComponent,
  CreateCerticatedReceibedDialogComponent,
  CreatePaymentOrderDialogComponent,
  EditCerticatedReceibedDialogComponent
];

@NgModule({
  imports: [
    SharedModule,
    DocumentsRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class DocumentsModule { }

