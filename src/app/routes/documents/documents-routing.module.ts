import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BudgetNotesMainComponent } from './budgetNotes/main/main.component';
import { AvaliabilityCertificatesMainComponent } from './availabilityCertificates/main/main.component';
import { PurchaseOrdersMainComponent } from './purchaseOrders/main/main.component';
import { CertificatedReceibedMainComponent } from './certificatedReceived/main/main.component';
import { PaymentOrdersMainComponent } from './PaymentOrders/main/main.component';
import { AuthGuard } from 'app/helpers';

const routes: Routes = [
  {
    path: 'documentos_notas_presupuestales',
    component: BudgetNotesMainComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
  },
  {
    path: 'certificados_disponibilidad',
    component: AvaliabilityCertificatesMainComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
  },
  {
    path: 'documento_ordenes_compra',
    component: PurchaseOrdersMainComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
  },
  {
    path: 'documento_certificado_recibido',
    component: CertificatedReceibedMainComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
  },
  {
    path: 'documento_ordenes_pago',
    component: PaymentOrdersMainComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentsRoutingModule { }

